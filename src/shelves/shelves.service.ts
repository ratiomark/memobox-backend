import { Injectable } from '@nestjs/common';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { PrismaService } from 'nestjs-prisma';
import { uuid } from 'src/utils/helpers/sql';
import { User } from '@prisma/client';
import { ShelfOrderRequest } from './entities/types';

@Injectable()
export class ShelvesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: User['id'], createShelfDto: CreateShelfDto) {
    await this.prisma.$executeRawUnsafe(
      `SELECT	add_shelf_and_update_indexes('${userId}', '${createShelfDto.title}') `,
    );
    return 'This action adds a new shelf';
  }

  async orderShelves( shelfOrder: ShelfOrderRequest) {
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

  remove(id: number) {
    return `This action removes a #${id} shelf`;
  }
}
