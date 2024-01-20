import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { PrismaService } from 'nestjs-prisma';
import { Shelf, Prisma, User, BoxSpecialType, Box } from '@prisma/client';
import {
  emptyDataTemplate,
  emptyNewCardsTemplate,
} from '@/common/const/commonShelfTemplate';
import { uuid } from '@/utils/helpers/sql';
import { CardsService } from '@/cards/cards.service';
import { UserId, ShelfId, BoxId } from '@/common/types/prisma-entities';
import { EVENT_BOX_DELETED } from '@/common/const/events';
import { EventEmitter2 } from '@nestjs/event-emitter';

type GenerateBoxesFromTemplateArg = {
  shelfTemplate: Prisma.JsonArray;
  userId: UserId;
  shelfId: ShelfId;
};

@Injectable()
export class BoxesService {
  private readonly logger = new Logger(BoxesService.name);
  constructor(
    private readonly prisma: PrismaService,
    // @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  create(createBoxDto: CreateBoxDto) {
    return 'This action adds a new box';
  }
  createMany(createBoxDto: CreateBoxDto[]) {
    return this.prisma.box.createMany({ data: createBoxDto });
  }

  async createBoxesFromTemplate({
    shelfTemplate,
    userId,
    shelfId,
  }: GenerateBoxesFromTemplateArg) {
    const boxesData = this.generateBoxesFromTemplate({
      shelfTemplate,
      userId,
      shelfId,
    });
    await this.createMany(boxesData);
    boxesData[0].data = emptyNewCardsTemplate;
    boxesData.forEach((box) => (box.data = emptyDataTemplate));
    return boxesData;
  }

  generateBoxesFromTemplate({
    shelfTemplate,
    userId,
    shelfId,
  }: GenerateBoxesFromTemplateArg) {
    const boxesData: CreateBoxDto[] = shelfTemplate.map((timing, index) => {
      const boxId = uuid();
      const boxData = {
        id: boxId,
        shelfId,
        userId,
        index: index + 1,
        specialType: 'none' as BoxSpecialType,
        timing: timing as Prisma.InputJsonObject,
      };
      return boxData;
    });

    boxesData[shelfTemplate.length - 1].specialType = 'learnt';
    boxesData.unshift({
      id: uuid(),
      index: 0,
      shelfId,
      userId,
      specialType: 'new',
      timing: {},
    });
    return boxesData;
  }

  findAll() {
    return `This action returns all boxes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} box`;
  }

  async update(id: Box['id'], updateBoxDto: UpdateBoxDto): Promise<Box> {
    const boxUpdated = await this.prisma.box.update({
      where: { id },
      data: updateBoxDto,
    });
    return boxUpdated;
  }

  deleteSoftByShelfId(shelfId: Shelf['id']) {
    return this.prisma.box.updateMany({
      where: { shelfId },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // async deleteSoft(userId: UserId, shelfId: ShelfId, shelfIndex: number) {
  //   // console.log(userId, shelfId, shelfIndex);
  //   const [response] = await Promise.all([
  //     this.prisma.$queryRawUnsafe<Shelf[]>(
  //       `SELECT * FROM remove_shelf_and_update_indexes('${userId}', '${shelfId}', '${shelfIndex}') ;`,
  //     ),
  //     this.boxesService.deleteSoftByShelfId(shelfId),
  //     this.cardsService.deleteSoftByShelfId(shelfId),
  //   ]);
  //   // // console.log(userId, shelfId, shelfIndex);
  //   // const response = await this.prisma.$queryRawUnsafe<Shelf[]>(
  //   //   // `SELECT * FROM add_shelf_and_update_indexes($1, $2);`,
  //   //   // userId,
  //   //   // createShelfDto.title,
  //   //   `SELECT * FROM remove_shelf_and_update_indexes('${userId}', '${shelfId}', '${shelfIndex}') ;`,
  //   // );
  //   this.eventEmitter.emit(EVENT_SHELF_DELETED, {
  //     userId,
  //   });
  //   return response;
  // }

  // async deleteSoftByBoxId(id: BoxId) {
  async deleteSoftByBoxId(id: BoxId) {
    const [box, cards] = await Promise.all([
      this.prisma.box.update({
        where: { id },
        data: { isDeleted: true, deletedAt: new Date() },
      }),
      this.cardsService.deleteSoftByBoxId(id),
    ]);
    // const updateBoxesFromIndex = box.index
    // [0,1 ,2,3,4,5,6,7,]
    // 4
    // const boxes = await Promise.all()
    return { box, cards };
  }

  async deleteSoftByBoxIdAndUpdateIndexes(
    userId: UserId,
    boxId: BoxId,
    shelfId: ShelfId,
    boxIndex: number,
  ) {
    // возвращает массив обновленных коробок, без удаленной. Я ничего не делаю с поле isDeleted  у cards
    const boxesUpdated = await this.prisma.$queryRawUnsafe<Box[]>(
      `SELECT * FROM remove_box_and_update_indexes('${userId}', '${boxId}', '${shelfId}', '${boxIndex}');`,
    );
    this.eventEmitter.emit(EVENT_BOX_DELETED, {
      userId,
      event: EVENT_BOX_DELETED,
    });
    // this.logger.debug(boxesUpdated);
    return boxesUpdated;
  }

  async findAllDeletedBoxes(userId: User['id']) {
    return this.prisma.box.findMany({
      where: {
        userId,
        isDeleted: true,
        shelf: {
          isDeleted: false,
        },
      },
      include: {
        card: true,
        shelf: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            card: true,
          },
        },
      },
    });
  }

  async restoreBox(
    userId: UserId,
    boxId: BoxId,
    shelfIdTo: ShelfId,
    restoreToIndex: number,
  ) {
    const restoredBox = await this.prisma.$transaction(async (prisma) => {
      // Обновление данных восстанавливаемой коробки
      const restoredBox = await prisma.box.update({
        where: { id: boxId, userId },
        data: {
          isDeleted: false,
          deletedAt: null,
          shelfId: shelfIdTo,
          index: restoreToIndex,
        },
      });

      // Обновление индексов для остальных коробок на полке
      await prisma.box.updateMany({
        where: {
          userId: userId,
          shelfId: shelfIdTo,
          index: {
            gte: restoreToIndex,
          },
          id: {
            not: boxId,
          },
        },
        data: {
          index: {
            increment: 1,
          },
        },
      });

      return restoredBox;
    });

    this.logger.debug(restoredBox);
    return restoredBox;
  }

  async restoreBoxesDeletedByShelfId(shelfId: ShelfId) {
    const [box, cards] = await this.prisma.$transaction(async (prisma) => {
      // Обновление данных восстанавливаемой коробки
      const box = await prisma.box.updateMany({
        where: { shelfId, isDeleted: true },
        data: { isDeleted: false, deletedAt: null },
      });

      // Обновление индексов для остальных коробок на полке
      const cards = await prisma.card.updateMany({
        where: { shelfId },
        data: { isDeleted: false, deletedAt: null },
      });

      return [box, cards];
    });

    return { box, cards };
  }

  //   const [box, cards] = await Promise.all([
  //     this.prisma.box.updateMany({
  //       where: { shelfId, isDeleted: true },
  //       data: { isDeleted: false, deletedAt: null },
  //     }),
  //     this.cardsService.restoreByShelfId(shelfId),
  //   ]);
  //   return { box, cards };
  // }
  // restoreByBoxId;
}
