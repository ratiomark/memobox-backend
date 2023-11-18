import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
// import { AggregateService } from './aggregate.service';
// import { CreateAggregateDto } from './dto/create-aggregate.dto';
// import { UpdateAggregateDto } from './dto/update-aggregate.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetCurrentUser } from 'src/common/decorators';
import { UserDataStorageService } from 'src/user-data-storage/user-data-storage.service';

@ApiTags('Aggregate')
@Controller({
  path: 'aggregate',
  version: '1',
})
export class AggregateController {
  constructor(
    private readonly userDataStorageService: UserDataStorageService,
  ) {}

  @Get('view')
  getViewPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getViewPageData(userId);
  }

  @Get('cupboard')
  getCupboardPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getCupboardPageData(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.aggregateService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAggregateDto: UpdateAggregateDto,
  // ) {
  //   return this.aggregateService.update(+id, updateAggregateDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.aggregateService.remove(+id);
  // }
}
