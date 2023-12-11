import { Module, Global, Provider } from '@nestjs/common';
import { RedisService } from './redis.service';

import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { PROVIDER_REDIS } from '@/common/const/provider-names';
import { RedisRepository } from './redis-repository.service';

const RedisProvider: Provider = {
  provide: PROVIDER_REDIS,
  useFactory: (configService: ConfigService) => {
    const host = configService.getOrThrow('redis.host', { infer: true });
    const port = configService.getOrThrow('redis.port', { infer: true });

    return new Redis(port, host);
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [RedisProvider, RedisService, RedisRepository],
  exports: [RedisService, RedisRepository],
})
export class RedisModule {}
