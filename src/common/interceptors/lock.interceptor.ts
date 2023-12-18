// lock.interceptor.ts
import { RedisService } from '@/redis/redis.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, finalize } from 'rxjs';
import { META_KEY_LOCK_PATTERN } from '../const/metadata';
import { Reflector } from '@nestjs/core';
import { LockKeys } from '../const/lock-keys-patterns';
import { createKeyWithPrefix } from '@/utils/helpers/create-key-with-prefix';

@Injectable()
export class LockInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LockInterceptor.name);
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // console.log('блокировать ');
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const lockKeyPattern = this.reflector.get<LockKeys>(
      META_KEY_LOCK_PATTERN,
      context.getHandler(),
    );
    const lockKey = createKeyWithPrefix(lockKeyPattern, userId);

    this.logger.log(`LOCK: Блокирую по ключу: ${lockKey}`);

    // console.log('lockKey', lockKey);
    await this.redisService.lock(lockKey);
    // console.log('заблокирован ');
    return next.handle().pipe(
      finalize(async () => {
        await this.redisService.unlock(lockKey);
        this.logger.log(`LOCK: Разблокировка по ключу: ${lockKey}`);
      }),
    );
  }
}
