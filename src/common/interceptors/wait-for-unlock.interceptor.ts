import { RedisService } from '@/redis/redis.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_KEY_LOCK_PATTERN } from '../const/metadata';
import { Reflector } from '@nestjs/core';
import { LockKeys } from '../const/lock-keys-patterns';
import { createKeyWithPrefix } from '@/utils/helpers/create-key-with-prefix';

@Injectable()
export class WaitForUnlockInterceptor implements NestInterceptor {
  private readonly logger = new Logger(WaitForUnlockInterceptor.name);
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const lockKeyPattern = this.reflector.get<LockKeys>(
      META_KEY_LOCK_PATTERN,
      context.getHandler(),
    );

    const lockKey = createKeyWithPrefix(lockKeyPattern, userId);
    this.logger.log(`WAIT: ожидаю по ключу: ${lockKey}`);
    await this.redisService.waitForUnlock(lockKey);
    this.logger.log(`WAIT: закончил  по ключу: ${lockKey}`);

    return next.handle();
  }
}
