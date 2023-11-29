import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetCurrentUser } from '@/common/decorators';
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
  async getViewPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getViewPageData(userId);
  }

  @Get('cupboard')
  async getCupboardPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getCupboardPageData(userId);
  }

  @Get('trash')
  getTrashPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getTrashPageData(userId);
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
