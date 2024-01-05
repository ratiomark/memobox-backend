import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetCurrentUser } from '@/common/decorators';
import { UserDataStorageService } from '@/user-data-storage/user-data-storage.service';
import { WaitForUnlock } from '@/common/decorators/wait-for-unlock.decorator';
import { LOCK_KEYS } from '@/common/const/lock-keys-patterns';

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
  @WaitForUnlock(LOCK_KEYS.creatingNewShelf)
  @WaitForUnlock(LOCK_KEYS.removingShelfToTrash)
  async getViewPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getViewPageData(userId);
  }

  @Get('timezone')
  async getDbTimeZone() {
    const tz = await this.userDataStorageService.getDbTimeZone();
    console.log(tz);
    return tz;
  }

  @Get('cupboard')
  @WaitForUnlock(LOCK_KEYS.updateCardsAfterTraining)
  async getCupboardPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getCupboardPageData(userId);
  }

  @Get('trash')
  getTrashPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getTrashPageData(userId);
  }
  @Get('server-time')
  getServerTime() {
    return new Date();
  }
}
