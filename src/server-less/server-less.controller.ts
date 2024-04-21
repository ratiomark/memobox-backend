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
import { IsPublic } from '@/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Serverless')
@Controller({
  path: 'serverless',
  version: '1',
})
export class ServerLessController {
  constructor(private readonly serverLessService: ServerLessService) {}

  @IsPublic()
  @Post('createIndexesPushNotificationsTable')
  async createPushTable() {
    return await this.serverLessService.createIndexPushNotification();
  }

  @IsPublic()
  @Post('createIndexesEmailNotificationsTable')
  async createIndexesEmailNotifications() {
    return await this.serverLessService.createIndexEmailNotifications();
  }

  // @IsPublic()
  // @Post('sendAll')
  // async createIndexesEmailNotifications() {
  //   return await this.serverLessService.createIndexesEmailNotifications();
  // }

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
