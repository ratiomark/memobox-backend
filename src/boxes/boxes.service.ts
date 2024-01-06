import { Inject, Injectable, forwardRef } from '@nestjs/common';
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
import { UserId, ShelfId } from '@/common/types/prisma-entities';

type GenerateBoxesFromTemplateArg = {
  shelfTemplate: Prisma.JsonArray;
  userId: UserId;
  shelfId: ShelfId;
};

@Injectable()
export class BoxesService {
  constructor(
    private readonly prisma: PrismaService,
    // @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
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

  async deleteSoftByBoxId(id: Box['id']) {
    const [box, cards] = await Promise.all([
      this.prisma.box.update({
        where: { id },
        data: { isDeleted: true, deletedAt: new Date() },
      }),
      this.cardsService.deleteSoftByBoxId(id),
    ]);
    return { box, cards };
  }

  async findAllDeletedBoxes(userId: User['id']) {
    return this.prisma.box.findMany({
      where: { userId, isDeleted: true, shelf: { isDeleted: false } },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} box`;
  }

  restoreBoxesDeletedByShelfId(shelfId: ShelfId) {
    return this.prisma.box.updateMany({
      where: { shelfId },
      data: { isDeleted: false, deletedAt: null },
    });
  }
}
