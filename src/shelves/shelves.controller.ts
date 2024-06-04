import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpCode,
  HttpStatus,
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
import { ShelfUpdateBoxesListDto } from './dto/update-boxes-list.dto';
import { SwaggerCreateNewShelf } from './swagger';

@ApiTags('Shelves')
@Controller({
  path: 'shelves',
  version: '1',
})
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Post()
  @Lock(LOCK_KEYS.creatingNewShelf)
  @SwaggerCreateNewShelf()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetCurrentUser('id') userId: User['id'],
    @Body() createShelfDto: CreateShelfDto,
  ): Promise<ShelfFrontedResponse> {
    return this.shelvesService.create(userId, createShelfDto);
  }

  @Patch('update-order')
  async updateOrder(
    @GetCurrentUser('id') userId: User['id'],
    @Body() shelfOrder: ShelfOrderRequest,
  ) {
    // console.log(shelfOrder);
    return await this.shelvesService.orderShelves(userId, shelfOrder);
  }

  @Lock(LOCK_KEYS.updateShelfBoxesList)
  @Patch('update-boxes-list')
  async updateBoxesList(
    @GetCurrentUser('id') userId: User['id'],
    @Body() updateShelfBody: ShelfUpdateBoxesListDto,
  ) {
    console.log(updateShelfBody);
    // return { data: 'return' };
    return await this.shelvesService.updateBoxesList(userId, updateShelfBody);
  }

  // @Patch('shelf-template')
  // updateShelfTemplate(
  //   @GetCurrentUser('id') userId: User['id'],
  //   @Body() shelfTemplate: UpdateSettingShelfTemplateDto,
  // ) {
  //   console.log('missedTrainingValue', shelfTemplate);
  //   return this.settingsService.updateShelfTemplate(
  //     userId,
  //     shelfTemplate.shelfTemplate as unknown as Prisma.InputJsonArray,
  //   );
  // }
  // notificationEnabled;

  @Patch('toggleNotification/:id')
  @Lock(LOCK_KEYS.restoringEntityFromTrash)
  async toggleNotification(
    @GetCurrentUser('id') userId: User['id'],
    @Param('id') shelfId: Shelf['id'],
    @Body() notificationEnabledBody: { notificationEnabled: boolean },
  ) {
    return await this.shelvesService.toggleShelfNotification(
      userId,
      shelfId,
      notificationEnabledBody.notificationEnabled,
    );
  }

  @Patch('restore/:id')
  @Lock(LOCK_KEYS.restoringEntityFromTrash)
  restoreShelf(
    @GetCurrentUser('id') userId: User['id'],
    @Param('id') shelfId: Shelf['id'],
  ) {
    return this.shelvesService.restore(userId, shelfId);
  }

  @Patch(':id')
  async update(
    @Param('id') shelfId: Shelf['id'],
    @Body() updateShelfDto: UpdateShelfDto,
  ) {
    return await this.shelvesService.update(shelfId, updateShelfDto);
  }

  @Delete('final/:id')
  deletePermanently(
    @GetCurrentUser('id') userId: User['id'],
    @Param('id') shelfId: Shelf['id'],
  ) {
    return this.shelvesService.deletePermanently(userId, shelfId);
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
