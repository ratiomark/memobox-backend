import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetCurrentUser } from '@/common/decorators';
import { UserDataStorageService } from '@/user-data-storage/user-data-storage.service';
import { WaitForUnlock } from '@/common/decorators/wait-for-unlock.decorator';
import { LOCK_KEYS } from '@/common/const/lock-keys-patterns';
import { AggregateService } from './aggregate.service';

@ApiTags('Aggregate')
@Controller({
  path: 'aggregate',
  version: '1',
})
export class AggregateController {
  constructor(
    private readonly userDataStorageService: UserDataStorageService,
    private readonly aggregateService: AggregateService,
  ) {}

  @Get('view')
  @WaitForUnlock(LOCK_KEYS.creatingNewShelf)
  @WaitForUnlock(LOCK_KEYS.removingShelfToTrash)
  @WaitForUnlock(LOCK_KEYS.removingBoxFromShelfToTrash)
  @WaitForUnlock(LOCK_KEYS.restoringEntityFromTrash)
  async getViewPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getViewPageData(userId);
  }

  @Get('cupboard')
  @WaitForUnlock(LOCK_KEYS.updateCardsAfterTraining)
  @WaitForUnlock(LOCK_KEYS.removingShelfToTrash)
  @WaitForUnlock(LOCK_KEYS.removingBoxFromShelfToTrash)
  @WaitForUnlock(LOCK_KEYS.restoringEntityFromTrash)
  async getCupboardPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getCupboardPageData(userId);
  }

  // @Get('cupboard-object')
  // getCupboardObject(@GetCurrentUser('id') userId: User['id']) {
  //   return this.userDataStorageService.getCupboardObject(userId);
  // }

  @Get('trash')
  @WaitForUnlock(LOCK_KEYS.removingShelfToTrash)
  @WaitForUnlock(LOCK_KEYS.removingBoxFromShelfToTrash)
  getTrashPageData(@GetCurrentUser('id') userId: User['id']) {
    return this.userDataStorageService.getTrashPageData(userId);
  }

  @Get('server-time')
  getServerTime() {
    return new Date();
  }

  @Get('db-time')
  getDbTimeAndTimezone() {
    return this.aggregateService.getDbTimeAndTimezone();
  }

  @Post('save-db')
  async backupDatabase(): Promise<string> {
    return await this.userDataStorageService.saveDb();
  }

  @Post('restore-db')
  async restoreDatabase(): Promise<string> {
    return await this.userDataStorageService.restoreDb();
  }
}
