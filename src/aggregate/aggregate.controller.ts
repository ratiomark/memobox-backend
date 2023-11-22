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
import { I18n, I18nContext } from 'nestjs-i18n';
import { GetCurrentUser, Lang } from '@/common/decorators';
import { UserDataStorageService } from '@/user-data-storage/user-data-storage.service';

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
  async getViewPageData(
    @GetCurrentUser('id') userId: User['id'],
    @Lang() lang: string,
  ) {
    // console.log(lang);
    const viewPageData = await this.userDataStorageService.getViewPageData(
      userId,
      lang,
    );
    // console.log(answer);
    return viewPageData;
    // return this.userDataStorageService.getViewPageData(userId, lang);
  }

  @Get('cupboard')
  getCupboardPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getCupboardPageData(userId);
  }

  // @Get('test')
  // async getTest(@I18n() i18n: I18nContext) {
  //   return await i18n.translate('common.test');
  // }

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
