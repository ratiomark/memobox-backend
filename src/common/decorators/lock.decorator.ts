import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { LockInterceptor } from '../interceptors/lock.interceptor';
import { META_KEY_LOCK_PATTERN } from '../const/metadata';
import { LockKeys } from '../const/lock-keys-patterns';

export function Lock(lockKeyPattern: LockKeys) {
  return applyDecorators(
    SetMetadata(META_KEY_LOCK_PATTERN, lockKeyPattern),
    UseInterceptors(LockInterceptor),
  );
}
