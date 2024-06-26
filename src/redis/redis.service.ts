import { Injectable, Logger } from '@nestjs/common';
import { RedisRepository } from './redis-repository.service';
import { UserId } from '@/common/types/prisma-entities';
import { CupboardObject } from '@/common/types/entities-types';
import { createKeyWithPrefix } from '@/utils/helpers/create-key-with-prefix';
import {
  REDIS_KEY_CUPBOARD,
  REDIS_KEY_SHELVES,
  REDIS_KEY_USER_NOTIFICATION_DATA,
} from './const/keys';
import { ShelfIncBoxes } from '@/aggregate/entities/types';
import {
  EVENT_BOX_DELETED,
  EVENT_BOX_RESTORED,
  EVENT_DB_RESTORED,
  EVENT_SHELF_BOXES_UPDATE,
  EVENT_SHELF_CREATED,
  EVENT_SHELF_DELETED,
  EVENT_SHELF_ORDER_CHANGED,
  EVENT_SHELF_RESTORED,
} from '@/common/const/events';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  constructor(private readonly redisRepository: RedisRepository) {}

  async lock(key: string, timeout = 5000): Promise<boolean> {
    this.logger.log(`Locking ${key}`);
    const value = 'locked';
    const result = await this.redisRepository.setWithExpiry(
      key,
      value,
      timeout,
    );
    return result === 'OK';
  }

  async unlock(key: string): Promise<void> {
    this.logger.log(`unlocking ${key}`);
    await this.redisRepository.del(key);
  }

  async waitForUnlock(key: string): Promise<void> {
    const isLocked = await this.redisRepository.get(key);
    if (isLocked) {
      this.logger.log(`В данный момент isLocked ${isLocked}`);
    }
    while (await this.redisRepository.get(key)) {
      this.logger.log(`Waiting for unlock ${key}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  async getCupboardObjectByUserId(
    userId: UserId,
  ): Promise<CupboardObject | null> {
    const key = createKeyWithPrefix(REDIS_KEY_CUPBOARD, userId);
    return await this.getWithLogger(
      key,
      `достаю cupboardData из redis ${REDIS_KEY_CUPBOARD}`,
    );
    // this.logger.log(`достаю cupboardData из redis `);
    // return await this.redisRepository.get(key);
  }
  async getUserNotificationData(
    userId: UserId,
  ): Promise<{ email: string; language: string }> {
    const key = createKeyWithPrefix(REDIS_KEY_USER_NOTIFICATION_DATA, userId);
    return await this.getWithLogger(
      key,
      `достаю user notification data из redis ${REDIS_KEY_USER_NOTIFICATION_DATA}`,
    );
    // this.logger.log(`достаю cupboardData из redis `);
    // return await this.redisRepository.get(key);
  }

  async saveUserNotificationData(
    userId: UserId,
    userNotificationData: { email: string; language: string },
  ): Promise<void> {
    const key = createKeyWithPrefix(REDIS_KEY_USER_NOTIFICATION_DATA, userId);
    return await this.saveWithLogger(
      key,
      userNotificationData,
      `сохраняю shelves в redis ${REDIS_KEY_USER_NOTIFICATION_DATA}`,
    );
    // this.logger.log(`сохраняю cupboardData из redis `);
    // return await this.redisRepository.set(key, cupboardObject);
  }
  async saveCupboardObjectByUserId(
    userId: UserId,
    cupboardObject: CupboardObject,
  ): Promise<void> {
    const key = createKeyWithPrefix(REDIS_KEY_CUPBOARD, userId);
    return await this.saveWithLogger(
      key,
      cupboardObject,
      `сохраняю shelves в redis ${REDIS_KEY_CUPBOARD}`,
    );
    // this.logger.log(`сохраняю cupboardData из redis `);
    // return await this.redisRepository.set(key, cupboardObject);
  }

  async getShelvesByUserId(userId: UserId): Promise<ShelfIncBoxes[] | null> {
    const key = createKeyWithPrefix(REDIS_KEY_SHELVES, userId);
    return await this.getWithLogger(
      key,
      `достаю shelves из redis ${REDIS_KEY_SHELVES}`,
    );
    // this.logger.log(`достаю shelves из redis `);
    // return await this.redisRepository.get(key);
  }

  async saveShelvesByUserId(
    userId: UserId,
    shelves: ShelfIncBoxes[],
  ): Promise<void> {
    const key = createKeyWithPrefix(REDIS_KEY_SHELVES, userId);
    return this.saveWithLogger(
      key,
      shelves,
      `сохраняю shelves в redis ${REDIS_KEY_SHELVES}`,
    );
    // return await this.redisRepository.set(key, shelves);
  }

  private async saveWithLogger(
    key: string,
    value: any,
    message?: string,
  ): Promise<void> {
    if (message) {
      this.logger.log(message);
    }
    return await this.redisRepository.set(key, value);
  }

  private async getWithLogger(key: string, message?: string): Promise<any> {
    if (message) {
      this.logger.log(message);
    }
    return await this.redisRepository.get(key);
  }

  @OnEvent(EVENT_SHELF_CREATED)
  @OnEvent(EVENT_SHELF_DELETED)
  @OnEvent(EVENT_SHELF_ORDER_CHANGED)
  @OnEvent(EVENT_SHELF_BOXES_UPDATE)
  @OnEvent(EVENT_BOX_DELETED)
  @OnEvent(EVENT_BOX_RESTORED)
  @OnEvent(EVENT_DB_RESTORED)
  @OnEvent(EVENT_SHELF_RESTORED)
  async updateRedisAfterDeletion(payload: { userId: UserId; event: string }) {
    this.logger.debug(`fire event - ${payload.event}`);
    const key = createKeyWithPrefix(REDIS_KEY_SHELVES, payload.userId);
    const key2 = createKeyWithPrefix(REDIS_KEY_CUPBOARD, payload.userId);
    await this.redisRepository.del(key);
    await this.redisRepository.del(key2);
  }
}
