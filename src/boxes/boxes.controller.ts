import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { ApiTags } from '@nestjs/swagger';
import { Box } from '@prisma/client';

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

  @Get()
  findAll() {
    return this.boxesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boxesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: Box['id'], @Body() updateBoxDto: UpdateBoxDto) {
    return this.boxesService.update(id, updateBoxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boxesService.remove(+id);
  }
}
