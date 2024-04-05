import { ShelfWithBoxCards } from '@/aggregate';
import { ShelfIncBoxes } from '@/aggregate/entities/types';
import { BoxesService } from '@/boxes/boxes.service';
import { CardsService } from '@/cards/cards.service';
import { SettingsService } from '@/settings/settings.service';
import { Injectable, Logger } from '@nestjs/common';
import { Shelf, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { ShelfOrderRequest } from './entities/types';
import { ShelvesProcessorService } from './services/shelves-data-processor.service';
import { ShelfId, UserId } from '@/common/types/prisma-entities';
import { cacheOrFetchData } from '@/utils/helpers/cache-or-fetch';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  EVENT_SHELF_BOXES_UPDATE,
  EVENT_SHELF_CREATED,
  EVENT_SHELF_DELETED,
  EVENT_SHELF_ORDER_CHANGED,
  EVENT_SHELF_RESTORED,
} from '@/common/const/events';
import { ShelvesTrashResponse } from '@/user-data-storage/types/fronted-responses';
import { ShelfUpdateBoxesListDto } from './dto/update-boxes-list.dto';
import { updateObjectIfAllZeros } from '@/utils/common/checkTimingBlockZeros';

@Injectable()
export class ShelvesService {
  private readonly logger = new Logger(ShelvesService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly settingsService: SettingsService,
    private readonly boxesService: BoxesService,
    private readonly cardsService: CardsService,
    private readonly shelvesProcessor: ShelvesProcessorService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(userId: UserId, createShelfDto: CreateShelfDto) {
    const [shelfFromDb, shelfTemplate] = await Promise.all([
      // return array with created shelf, so response[0] === createdShelf
      this.prisma.$queryRawUnsafe<Shelf[]>(
        `SELECT * FROM add_shelf_and_update_indexes('${userId}', '${createShelfDto.title}') ;`,
      ),
      this.settingsService.getShelfTemplate(userId),
    ]);

    const newShelfFromDb = shelfFromDb[0];

    const shelfCreated =
      await this.shelvesProcessor.createShelfResponseFromNewShelf(
        userId,
        newShelfFromDb,
        shelfTemplate,
      );
    this.eventEmitter.emit(EVENT_SHELF_CREATED, {
      userId,
      event: EVENT_SHELF_CREATED,
    });
    return shelfCreated;
  }

  async orderShelves(userId: UserId, shelfOrder: ShelfOrderRequest) {
    await this.prisma.$executeRawUnsafe(
      `SELECT update_shelf_order('${userId}', '${JSON.stringify(shelfOrder)}')`,
    );
    this.eventEmitter.emit(EVENT_SHELF_ORDER_CHANGED, {
      userId,
      event: EVENT_SHELF_ORDER_CHANGED,
    });
  }

  async updateBoxesList(
    userId: UserId,
    updateShelfBody: ShelfUpdateBoxesListDto,
  ) {
    const { shelfId, boxesList } = updateShelfBody;
    const boxesListChecked = boxesList.map((box, index) => ({
      ...box,
      index: index + 1,
      timing: updateObjectIfAllZeros(box.timing),
    }));
    const existingBoxes = boxesListChecked.filter(
      (box) => !box.id.startsWith('newBox'),
    );
    const actualBoxesIds = existingBoxes.map((box) => box.id);
    // console.log('existingBoxes   ', existingBoxes);
    const newBoxes = boxesListChecked.filter((box) =>
      box.id.startsWith('newBox'),
    );
    // console.log('newBoxes   ', newBoxes);
    const shelfUpdated = await this.prisma.$transaction(async (prisma) => {
      const currentBoxes = (
        await prisma.box.findMany({
          where: {
            userId,
            shelfId,
            specialType: { not: { in: ['learnt', 'new'] } },
          },
        })
      ).map((box) => box.id);
      const boxesToDelete = currentBoxes.filter(
        (boxId) => !actualBoxesIds.includes(boxId),
      );
      // удалить все коробки, которые не пришли в запросе
      await prisma.box.updateMany({
        where: { id: { in: boxesToDelete } },
        data: { isDeleted: true },
      });

      existingBoxes.forEach(async (box) => {
        console.log(box);
        await prisma.box.update({
          where: { id: box.id, shelfId, userId },
          data: {
            index: box.index,
            timing: box.timing as unknown as Prisma.InputJsonValue,
          },
        });
      });

      newBoxes.forEach(async (box) => {
        await prisma.box.create({
          data: {
            index: box.index,
            timing: box.timing as unknown as Prisma.InputJsonValue,
            user: { connect: { id: userId } },
            shelf: { connect: { id: shelfId } },
          },
        });
      });

      return await prisma.shelf.findFirst({ where: { id: shelfId } });
    });
    this.eventEmitter.emit(EVENT_SHELF_BOXES_UPDATE, {
      userId,
      event: EVENT_SHELF_BOXES_UPDATE,
    });
    return shelfUpdated;
  }

  // findAll(params: Prisma.ShelfFindManyArgs): Promise<Shelf[]> {}

  async findAllWithBoxCard(userId: UserId): Promise<ShelfWithBoxCards[]> {
    return await this.prisma.shelf.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      include: {
        box: {
          where: {
            isDeleted: false, // Фильтрация коробок
          },
          include: {
            card: {
              where: {
                isDeleted: false, // Фильтрация карточек
              },
            },
          },
          orderBy: { index: 'asc' },
        },
      },
      orderBy: { index: 'asc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} shelf`;
  }

  async update(id: ShelfId, updateShelfDto: UpdateShelfDto): Promise<Shelf> {
    const shelfUpdated = await this.prisma.shelf.update({
      where: { id },
      data: updateShelfDto,
    });
    return shelfUpdated;
  }

  async deletePermanently(userId: UserId, shelfId: ShelfId) {
    return await this.prisma.shelf.delete({
      where: { id: shelfId, userId },
    });
  }

  async deleteSoft(userId: UserId, shelfId: ShelfId, shelfIndex: number) {
    const [shelves] = await this.prisma.$transaction(async (prisma) => {
      const now = new Date();
      const shelves = await this.prisma.$queryRawUnsafe<Shelf[]>(
        `SELECT * FROM remove_shelf_and_update_indexes('${userId}', '${shelfId}', '${shelfIndex}') ;`,
      );

      const boxes = await this.prisma.box.findMany({
        where: { userId, shelfId },
      });
      // [ '{ boxId: 'c78455b1-25c8-4f72-a60a-e00ff29c6e53', index: 0 }', '...', ...]
      const boxSortedIds = boxes
        .sort((a, b) => {
          if (a.specialType === 'new' && b.specialType !== 'new') return -1;
          if (a.specialType !== 'new' && b.specialType === 'new') return 1;
          if (a.specialType === 'learnt' && b.specialType !== 'learnt')
            return 1;
          if (a.specialType !== 'learnt' && b.specialType === 'learnt')
            return -1;
          return a.index - b.index;
        })
        .map((box, index) => JSON.stringify({ boxId: box.id, index }));

      const query = `SELECT delete_update_box_indexes($1::UUID, $2::UUID, $3::jsonb[], $4::TIMESTAMP)`;
      await this.prisma.$executeRawUnsafe(
        query,
        userId,
        shelfId,
        boxSortedIds,
        now,
      );

      await prisma.card.updateMany({
        where: { shelfId, userId },
        data: { isDeleted: true, deletedAt: now },
      });
      return shelves;
    });

    this.eventEmitter.emit(EVENT_SHELF_DELETED, {
      userId,
      event: EVENT_SHELF_DELETED,
    });
    return shelves;
  }

  async restore(userId: UserId, shelfId: ShelfId) {
    const response = await this.prisma.$transaction(async (prisma) => {
      const boxes = await this.prisma.box.findMany({
        where: { userId, shelfId },
      });
      // [ '{ boxId: 'c78455b1-25c8-4f72-a60a-e00ff29c6e53', index: 0 }', '...', ...]
      const boxSortedIds = boxes
        .sort((a, b) => {
          if (a.specialType === 'new' && b.specialType !== 'new') return -1;
          if (a.specialType !== 'new' && b.specialType === 'new') return 1;
          if (a.specialType === 'learnt' && b.specialType !== 'learnt')
            return 1;
          if (a.specialType !== 'learnt' && b.specialType === 'learnt')
            return -1;
          return a.index - b.index;
        })
        .map((box, index) => JSON.stringify({ boxId: box.id, index }));

      const query = `SELECT restore_update_box_indexes($1::UUID, $2::UUID, $3::jsonb[])`;
      await this.prisma.$executeRawUnsafe(query, userId, shelfId, boxSortedIds);

      await prisma.card.updateMany({
        where: { shelfId, userId },
        data: {
          isDeleted: false,
          deletedAt: null,
        },
      });
      await prisma.shelf.updateMany({
        where: {
          userId: userId,
        },
        data: {
          index: {
            increment: 1,
          },
        },
      });
      return await prisma.shelf.update({
        where: { id: shelfId, userId },
        data: {
          index: 0,
          isDeleted: false,
          deletedAt: null,
        },
      });
    });
    this.eventEmitter.emit(EVENT_SHELF_RESTORED, {
      userId,
      event: EVENT_SHELF_RESTORED,
    });
    return response;
  }

  // shelvesAndBoxesData for /view page
  async getShelvesAndBoxesData(userId: UserId) {
    return await cacheOrFetchData<ShelfIncBoxes[]>(
      userId,
      this.shelvesProcessor.getShelvesAndBoxesData.bind(this.shelvesProcessor),
      this.getShelvesAndBoxesDataFromDb.bind(this),
      this.shelvesProcessor.saveShelvesAndBoxesData.bind(this.shelvesProcessor),
    );
    // let shelves = await this.shelvesProcessor.getShelvesAndBoxesData(userId);
    // if (!shelves) {
    //   shelves = await this.getShelvesAndBoxesDataFromDb(userId);
    //   await this.shelvesProcessor.saveShelvesAndBoxesData(userId, shelves);
    // }
    // return shelves;
  }

  async getShelvesAndBoxesDataFromDb(userId: UserId): Promise<ShelfIncBoxes[]> {
    const shelves = await this.prisma.shelf.findMany({
      where: { userId, isDeleted: false },
      include: {
        box: {
          orderBy: {
            index: 'asc',
          },
          where: { isDeleted: false },
        },
      },
      orderBy: {
        index: 'asc',
      },
    });
    return shelves;
  }

  // private transformShelvesData(userShelves: any[]): Record<string, ShelfData> {
  //   const shelvesData: Record<string, ShelfData> = {};

  //   userShelves.forEach((shelf) => {
  //     const boxData: Record<string, BoxData> = {};
  //     const sortedBoxes = shelf.box.sort((a, b) => a.index - b.index);

  //     sortedBoxes.forEach((box, index) => {
  //       boxData[box.id] = {
  //         nextBoxIdKey:
  //           index < sortedBoxes.length - 1 ? sortedBoxes[index + 1].id : null,
  //         previousBoxIdKey: index > 0 ? sortedBoxes[index - 1].id : null,
  //         index: box.index,
  //         timing: box.timing,
  //       };
  //     });

  //     shelvesData[shelf.id] = boxData;
  //   });

  //   return shelvesData;
  // }

  async findAllDeletedShelves(userId: UserId): Promise<ShelvesTrashResponse[]> {
    const shelves = await this.prisma.shelf.findMany({
      where: { userId, isDeleted: true },
      include: {
        box: {
          select: {
            _count: {
              select: { card: true },
            },
            card: true,
            specialType: true,
            index: true,
            deletedAt: true,
            timing: true,
          },
          orderBy: {
            index: 'asc',
          },
        },
        _count: {
          select: { card: true, box: true },
        },
      },
      orderBy: {
        deletedAt: 'desc',
      },
    });

    return shelves.map((shelf) => ({
      ...shelf,
      boxesCount: shelf._count.box,
      cardsCount: shelf._count.card,
    }));
  }

  async getCupboardObject(userId: UserId) {
    const shelves = await this.getShelvesAndBoxesData(userId);
    return this.shelvesProcessor.transformShelvesIncBoxToCupboardObject(
      shelves,
    );
  }

  createShelvesAndBoxesDataFromShelvesIncBox(shelves: ShelfIncBoxes[]) {
    return this.shelvesProcessor.createShelvesAndBoxesDataFromShelvesIncBox(
      shelves,
    );
  }

  transformShelvesIncBoxToCupboardObject(shelves: ShelfIncBoxes[]) {
    return this.shelvesProcessor.transformShelvesIncBoxToCupboardObject(
      shelves,
    );
  }
}

// async orderShelves(userId: UserId, shelfOrder: ShelfOrderRequest) {
//   // let update: string[] = [];
//   // let updateString = '';
//   // for (const item of shelfOrder) {
//   //   // for (const { id, index } of shelfOrder) {
//   //   // update.push(`{ "id": "${id}", "index": ${index} }`);
//   //   updateString += `${JSON.stringify(item)} ,`;
//   //   // updateString += `{ "id": "${id}", "index": ${index} } ,`;
//   // }
//   // console.log(update);
//   // console.log(update.join(', '));
//   // { "id": "c78455b1-25c8-4f72-a60a-e00ff29c6e53", "index": 0 },
//   await this.prisma.$executeRawUnsafe(
//     `SELECT update_shelf_order('${JSON.stringify(shelfOrder)}')`,
//   );
//   // await this.prisma.$executeRawUnsafe(
//   //   `SELECT update_shelf_order('[${updateString.slice(
//   //     0,
//   //     updateString.length - 2,
//   //   )}]')`,
//   // );
// }
