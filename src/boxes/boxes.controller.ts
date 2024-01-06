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
import { Box } from '@prisma/client';
import { BoxId, ShelfId, UserId } from '@/common/types/prisma-entities';
import { GetCurrentUser } from '@/common/decorators';

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

  @Get()
  findAll() {
    return this.boxesService.findAll();
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
  @HttpCode(HttpStatus.OK)
  deleteSoftById(
    @GetCurrentUser('id') userId: UserId,
    @Param('id') boxId: BoxId,
    @Body() boxIndex: number,
  ) {
    return this.boxesService.deleteSoftByBoxIdAndUpdateIndexes(
      userId,
      boxId,
      boxIndex,
    );
  }
}
