import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetCurrentUser } from 'src/common/decorators';
import { ShelfOrderRequest } from './entities/types';

@ApiTags('Shelves')
@Controller({
  path: 'shelves',
  version: '1',
})
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Post()
  create(
    @GetCurrentUser('id') userId: User['id'],
    @Body() createShelfDto: CreateShelfDto,
  ) {
    console.log(createShelfDto);
    console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
    return this.shelvesService.create(userId, createShelfDto);
  }

  @Patch('update-order')
  async updateOrder(
    @GetCurrentUser('id') userId: User['id'],
    @Body() shelfOrder: ShelfOrderRequest,
  ) {
    console.log(shelfOrder);
    return await this.shelvesService.orderShelves(shelfOrder);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shelvesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelfDto: UpdateShelfDto) {
    return this.shelvesService.update(+id, updateShelfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shelvesService.remove(+id);
  }
}
