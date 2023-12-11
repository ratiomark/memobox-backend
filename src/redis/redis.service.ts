import { Injectable, Logger } from '@nestjs/common';
import { RedisRepository } from './redis-repository.service';

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
}
