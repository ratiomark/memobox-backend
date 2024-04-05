import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServerLessService } from './server-less.service';
import { CreateServerLessDto } from './dto/create-server-less.dto';
import { UpdateServerLessDto } from './dto/update-server-less.dto';

@Controller('server-less')
export class ServerLessController {
  constructor(private readonly serverLessService: ServerLessService) {}

  // @Post()
  // create(@Body() createServerLessDto: CreateServerLessDto) {
  //   return this.serverLessService.create(createServerLessDto);
  // }

  // @Get()
  // findAll() {
  //   return this.serverLessService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.serverLessService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateServerLessDto: UpdateServerLessDto,
  // ) {
  //   return this.serverLessService.update(+id, updateServerLessDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.serverLessService.remove(+id);
  // }
}
