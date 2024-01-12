import { ShelfWithBoxCards } from '@/aggregate';
import {
  ShelfIncBoxesIncCards,
  ShelfIncBoxes,
} from '@/aggregate/entities/types';
import { BoxesService } from '@/boxes/boxes.service';
import { CardsService } from '@/cards/cards.service';
import { SettingsService } from '@/settings/settings.service';
import { Injectable } from '@nestjs/common';
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
  EVENT_SHELF_CREATED,
  EVENT_SHELF_DELETED,
  EVENT_SHELF_ORDER_CHANGED,
} from '@/common/const/events';

@Injectable()
export class ShelvesService {
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

  findAll(params: Prisma.ShelfFindManyArgs): Promise<Shelf[]> {
    return this.prisma.shelf.findMany(params);
  }

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

  async deleteSoft(userId: UserId, shelfId: ShelfId, shelfIndex: number) {
    // console.log(userId, shelfId, shelfIndex);
    const [response] = await Promise.all([
      this.prisma.$queryRawUnsafe<Shelf[]>(
        `SELECT * FROM remove_shelf_and_update_indexes('${userId}', '${shelfId}', '${shelfIndex}') ;`,
      ),
      this.boxesService.deleteSoftByShelfId(shelfId),
      this.cardsService.deleteSoftByShelfId(shelfId),
    ]);
    // // console.log(userId, shelfId, shelfIndex);
    // const response = await this.prisma.$queryRawUnsafe<Shelf[]>(
    //   // `SELECT * FROM add_shelf_and_update_indexes($1, $2);`,
    //   // userId,
    //   // createShelfDto.title,
    //   `SELECT * FROM remove_shelf_and_update_indexes('${userId}', '${shelfId}', '${shelfIndex}') ;`,
    // );
    this.eventEmitter.emit(EVENT_SHELF_DELETED, {
      userId,
      event: EVENT_SHELF_DELETED,
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

  async findAllDeletedShelves(
    userId: UserId,
  ): Promise<ShelfIncBoxesIncCards[]> {
    const shelves = await this.prisma.shelf.findMany({
      where: { userId, isDeleted: true },
      include: {
        box: true,
        card: true,
      },
    });

    return shelves.map((shelf) => ({
      ...shelf,
      boxesCount: shelf.box.length,
      cardsCount: shelf.card.length,
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
