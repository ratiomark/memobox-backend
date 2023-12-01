import { Injectable } from '@nestjs/common';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { PrismaService } from 'nestjs-prisma';
import { uuid } from '@/utils/helpers/sql';
import { Prisma, Shelf, User } from '@prisma/client';
import { ShelfOrderRequest } from './entities/types';
import { ShelfWithBoxCards, ShelvesDataViewPage } from '@/aggregate';
import { emptyDataTemplate } from '@/common/const/commonShelfTemplate';
import { CreateBoxDto } from '@/boxes/dto/create-box.dto';
import { SettingsService } from '@/settings/settings.service';
import { BoxesService } from '@/boxes/boxes.service';
import { CardsService } from '@/cards/cards.service';
import {
  ShelfIncBoxes,
  ShelfIncBoxesIncCards,
  ShelfWithBoxesData,
} from '@/aggregate/entities/types';

@Injectable()
export class ShelvesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settingsService: SettingsService,
    private readonly boxesService: BoxesService,
    private readonly cardsService: CardsService,
  ) {}

  async create(userId: User['id'], createShelfDto: CreateShelfDto) {
    const [shelfFromDb, shelfTemplate] = await Promise.all([
      // return array with created shelf, so response[0] === createdShelf
      this.prisma.$queryRawUnsafe<Shelf[]>(
        `SELECT * FROM add_shelf_and_update_indexes('${userId}', '${createShelfDto.title}') ;`,
      ),
      this.settingsService.getShelfTemplate(userId),
    ]);
    // const response = await this.prisma.$queryRawUnsafe<Shelf[]>(
    //   // `SELECT * FROM add_shelf_and_update_indexes($1, $2);`,
    //   // userId,
    //   // createShelfDto.title,
    //   `SELECT * FROM add_shelf_and_update_indexes('${userId}', '${createShelfDto.title}') ;`,
    // );
    // console.log(shelfTemplateSettings);
    // let templateToUse: ShelfTemplate['template'];
    // if (shelfTemplateSettings.length == 2) {
    //   templateToUse = shelfTemplateSettings[1].userId
    //     ? (shelfTemplateSettings[1].template as Prisma.JsonArray)
    //     : (shelfTemplateSettings[0].template as Prisma.JsonArray);
    // } else {
    //   templateToUse = shelfTemplateSettings[0].template as Prisma.JsonArray;
    // }

    const shelf = shelfFromDb[0];
    const shelfResponse = {
      boxesData: [] as CreateBoxDto[],
      // boxesData: [] as BoxSchema[],
      data: emptyDataTemplate,
      ...shelf,
      isCollapsed: true,
    };
    const shelfId = shelf.id;
    const boxesData = await this.boxesService.createBoxesFromTemplate({
      shelfId,
      userId,
      shelfTemplate,
    });
    // console.log(boxesData);
    shelfResponse.boxesData = boxesData;
    return shelfResponse;
  }

  async orderShelves(shelfOrder: ShelfOrderRequest) {
    await this.prisma.$executeRawUnsafe(
      `SELECT update_shelf_order('${JSON.stringify(shelfOrder)}')`,
    );
  }

  findAll(params: Prisma.ShelfFindManyArgs): Promise<Shelf[]> {
    return this.prisma.shelf.findMany(params);
  }

  async findAllWithBoxCard(userId: User['id']): Promise<ShelfWithBoxCards[]> {
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
        },
      },
      orderBy: { index: 'asc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} shelf`;
  }

  async update(
    id: Shelf['id'],
    updateShelfDto: UpdateShelfDto,
  ): Promise<Shelf> {
    const shelfUpdated = await this.prisma.shelf.update({
      where: { id },
      data: updateShelfDto,
    });
    return shelfUpdated;
  }

  async deleteSoft(
    userId: User['id'],
    shelfId: Shelf['id'],
    shelfIndex: number,
  ) {
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
    return response;
  }

  // shelvesAndBoxesData for /view page
  async getShelvesAndBoxesData(userId: User['id']) {
    const shelves = await this.prisma.shelf.findMany({
      where: { userId, isDeleted: false },
      include: {
        box: {
          orderBy: {
            index: 'asc',
          },
        },
      },
      orderBy: {
        index: 'asc',
      },
    });
    return this.createShelvesAndBoxesDataFromShelvesIncBox(shelves);
  }

  createShelvesAndBoxesDataFromShelvesIncBox(
    shelves: ShelfIncBoxes[],
  ): ShelvesDataViewPage {
    return shelves.reduce((acc, shelf) => {
      const boxesItems = shelf.box.map((box) => ({
        id: box.id,
        index: box.index,
      }));

      // Добавляем данные о полке
      acc[shelf.id] = {
        maxIndexBox: shelf.box.length - 1,
        boxesItems,
        shelfTitle: shelf.title,
        shelfIndex: shelf.index,
      };

      return acc;
    }, {});
  }

  async findAllDeletedShelves(
    userId: User['id'],
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
}

// async orderShelves(userId: User['id'], shelfOrder: ShelfOrderRequest) {
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

//  const boxesData: BoxSchema[] = templateToUse
//    .slice(1, templateToUse.length - 2)
//    .map((timing, index) => {
//      const boxId = uuid();
//      const boxData = {
//        id: boxId,
//        index,
//        specialType: 'none',
//        timing: timing as unknown as TimingBlock,
//        data: emptyDataTemplate,
//      };
//      return boxData;
//    });
