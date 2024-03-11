import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { ApiTags } from '@nestjs/swagger';
import { BoxId, ShelfId, UserId } from '@/common/types/prisma-entities';
import { GetCurrentUser } from '@/common/decorators';
import { LOCK_KEYS } from '@/common/const/lock-keys-patterns';
import { Lock } from '@/common/decorators/lock.decorator';

@ApiTags('Boxes')
@Controller({
  path: 'boxes',
  version: '1',
})
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Post()
  create(@Body() createBoxDto: CreateBoxDto) {
    return this.boxesService.create(createBoxDto);
  }

  @Post('restore-boxes-deleted-by-shelf-id/:shelfId')
  restoreBoxesDeleted(@Param('shelfId') shelfId: ShelfId) {
    return this.boxesService.restoreBoxesDeletedByShelfId(shelfId);
  }

  @Patch('restore/:boxId')
  restoreBox(
    @GetCurrentUser('id') userId: UserId,
    @Param('boxId') boxId: BoxId,
    @Body() body: { shelfId: ShelfId; index: number },
  ) {
    return this.boxesService.restoreBox(
      userId,
      boxId,
      body.shelfId,
      body.index,
    );
  }

  // использую для восстановления карточек новой и изученной коробки
  @Patch('move-all-cards-and-restore')
  moveAllCardsFromBoxToBoxAndRestore(
    @GetCurrentUser('id') userId: UserId,
    @Body() body: { fromBoxId: BoxId; toBoxId: BoxId; toShelfId: ShelfId },
  ) {
    return this.boxesService.moveAllCardsFromBoxToBoxAndRestore(
      userId,
      body.toShelfId,
      body.fromBoxId,
      body.toBoxId,
    );
  }

  @Delete('final/:id')
  deletePermanently(
    @GetCurrentUser('id') userId: UserId,
    @Param('id') boxId: BoxId,
  ) {
    return this.boxesService.deletePermanently(userId, boxId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boxesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: BoxId, @Body() updateBoxDto: UpdateBoxDto) {
    return this.boxesService.update(id, updateBoxDto);
  }

  @Delete(':id')
  @Lock(LOCK_KEYS.removingBoxFromShelfToTrash)
  @HttpCode(HttpStatus.OK)
  deleteSoftById(
    @GetCurrentUser('id') userId: UserId,
    @Param('id') boxId: BoxId,
    @Body() body: { index: number; shelfId: ShelfId },
  ) {
    return this.boxesService.deleteSoftByBoxIdAndUpdateIndexes(
      userId,
      boxId,
      body.shelfId,
      body.index,
    );
  }
}
