import { Injectable } from '@nestjs/common';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { PrismaService } from 'nestjs-prisma';
import { uuid } from 'src/utils/helpers/sql';
import { Shelf, User } from '@prisma/client';
import { ShelfOrderRequest } from './entities/types';
import { DataBlock, ShelfExtended } from './entities/shelf.entity';
import { BoxSchema } from 'src/boxes/entities/box.entity';

@Injectable()
export class ShelvesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: User['id'], createShelfDto: CreateShelfDto) {
    const response = await this.prisma.$queryRawUnsafe<Shelf[]>(
      // `SELECT * FROM add_shelf_and_update_indexes($1, $2);`,
      // userId,
      // createShelfDto.title,
      `SELECT * FROM add_shelf_and_update_indexes('${userId}', '${createShelfDto.title}') ;`,
    );
    const shelf = response[0];
    const shelfResponse = {
      boxesData: [] as BoxSchema[],
      data: {} as DataBlock,
      ...shelf,
      isCollapsed: true,
    };
    shelfResponse.boxesData = [
      {
        id: 'abd154a6-5bd1-48d2-a649-46b2fd1dab85',
        index: 0,
        specialType: 'new',
        data: {
          all: 0,
        },
      },
      {
        id: '313940d3-dbde-4bbe-af0c-cc59779fd5a3',
        index: 1,
        specialType: 'none',
        timing: {
          days: 0,
          hours: 0,
          weeks: 0,
          months: 0,
          minutes: 5,
        },
        data: {
          all: 0,
          train: 0,
          wait: 0,
        },
      },
      {
        id: '3468d9e0-b9cb-426a-a362-f7fb4a4b0d5a',
        index: 2,
        specialType: 'learnt',
        timing: {
          days: 0,
          hours: 0,
          weeks: 0,
          months: 0,
          minutes: 5,
        },
        data: {
          all: 0,
          train: 0,
          wait: 0,
        },
      },
    ];
    shelfResponse.data = {
      all: 0,
      train: 0,
      wait: 0,
    };
    console.log(shelfResponse);
    return shelfResponse;
  }

  async orderShelves(shelfOrder: ShelfOrderRequest) {
    await this.prisma.$executeRawUnsafe(
      `SELECT update_shelf_order('${JSON.stringify(shelfOrder)}')`,
    );
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

  findAll() {
    return `This action returns all shelves`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shelf`;
  }

  update(id: number, updateShelfDto: UpdateShelfDto) {
    return `This action updates a #${id} shelf`;
  }

  async remove(userId: User['id'], shelfId: Shelf['id'], shelfIndex: number) {
    // console.log(userId, shelfId, shelfIndex);
    const response = await this.prisma.$queryRawUnsafe<Shelf[]>(
      // `SELECT * FROM add_shelf_and_update_indexes($1, $2);`,
      // userId,
      // createShelfDto.title,
      `SELECT * FROM remove_shelf_and_update_indexes('${userId}', '${shelfId}', '${shelfIndex}') ;`,
    );

    return response;
  }
}
