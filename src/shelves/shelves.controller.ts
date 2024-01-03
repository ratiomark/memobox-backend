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
import { GetCurrentUser } from '@/common/decorators';
import { ShelfOrderRequest } from './entities/types';
import { ShelfFrontedResponse } from './entities/shelf.entity';
import { RemoveShelfDto } from './dto/remove-shelf.dto';
import { LOCK_KEYS } from '@/common/const/lock-keys-patterns';
import { Lock } from '@/common/decorators/lock.decorator';

@ApiTags('Shelves')
@Controller({
  path: 'shelves',
  version: '1',
})
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Post()
  @Lock(LOCK_KEYS.creatingNewShelf)
  async create(
    @GetCurrentUser('id') userId: User['id'],
    @Body() createShelfDto: CreateShelfDto,
  ): Promise<ShelfFrontedResponse> {
    // console.log(createShelfDto);
    // console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
    return this.shelvesService.create(userId, createShelfDto);
  }

  @Patch('update-order')
  async updateOrder(@Body() shelfOrder: ShelfOrderRequest) {
    console.log(shelfOrder);
    return await this.shelvesService.orderShelves(shelfOrder);
  }

  // @Patch('collapse')
  // async updateCollapse(@Body() shelfOrder: ShelfOrderRequest) {
  //   console.log(shelfOrder);
  //   return await this.shelvesService.orderShelves(shelfOrder);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.shelvesService.findOne(+id);
  // }

  @Patch(':id')
  async update(
    @Param('id') shelfId: Shelf['id'],
    @Body() updateShelfDto: UpdateShelfDto,
  ) {
    console.log(updateShelfDto);
    return await this.shelvesService.update(shelfId, updateShelfDto);
  }

  @Delete(':id')
  @Lock(LOCK_KEYS.removingShelfToTrash)
  deleteSoft(
    @GetCurrentUser('id') userId: User['id'],
    @Param('id') shelfId: Shelf['id'],
    @Body() removeShelfDto: RemoveShelfDto,
  ) {
    return this.shelvesService.deleteSoft(
      userId,
      shelfId,
      removeShelfDto.index,
    );
  }
}
