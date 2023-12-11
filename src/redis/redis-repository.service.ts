import { PROVIDER_REDIS } from '@/common/const/provider-names';
import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisRepository {
  constructor(@Inject(PROVIDER_REDIS) private readonly redisClient: Redis) {}

  async set(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const result = await this.redisClient.get(key);
    return result ? JSON.parse(result) : null;
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async setWithExpiry(
    key: string,
    value: string,
    expiry: number,
  ): Promise<'OK'> {
    return await this.redisClient.set(key, JSON.stringify(value), 'EX', expiry);
  }

  // Другие CRUD операции...
}
