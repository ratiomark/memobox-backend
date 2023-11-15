import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { ApiTags } from '@nestjs/swagger';
import { Shelf, User } from '@prisma/client';
import { GetCurrentUser } from 'src/common/decorators';
import { ShelfOrderRequest } from './entities/types';
import { ShelfExtended } from './entities/shelf.entity';
import { RemoveShelfDto } from './dto/remove-shelf.dto';

@ApiTags('Shelves')
@Controller({
  path: 'shelves',
  version: '1',
})
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Post()
  async create(
    @GetCurrentUser('id') userId: User['id'],
    @Body() createShelfDto: CreateShelfDto,
  ): Promise<ShelfExtended> {
    // console.log(createShelfDto);
    // console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
    return this.shelvesService.create(userId, createShelfDto);
  }

  @Patch('update-order')
  async updateOrder(@Body() shelfOrder: ShelfOrderRequest) {
    console.log(shelfOrder);
    return await this.shelvesService.orderShelves(shelfOrder);
  }

  @Patch('collapse')
  async updateCollapse(@Body() shelfOrder: ShelfOrderRequest) {
    console.log(shelfOrder);
    return await this.shelvesService.orderShelves(shelfOrder);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shelvesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: Shelf['id'], @Body() updateShelfDto: UpdateShelfDto) {
    return this.shelvesService.update(+id, updateShelfDto);
  }

  @Delete(':id')
  remove(
    @GetCurrentUser('id') userId: User['id'],
    @Param('id') shelfId: Shelf['id'],
    @Body() removeShelfDto: RemoveShelfDto,
  ) {
    return this.shelvesService.remove(userId, shelfId, removeShelfDto.index);
  }

  // @Delete(':id')
  // remove(
  //   // @Body() index: number,
  //   // @GetCurrentUser('id') userId: User['id'],
  //   @Param('id') shelfId: Shelf['id'],
  //   @Request() request,
  //   @Body() removeShelfDto: RemoveShelfDto,
  // ) {
  //   console.log(removeShelfDto);
  //   console.log(request.body);
  //   return this.shelvesService.remove('userId', shelfId, removeShelfDto.index);
  // }
}
