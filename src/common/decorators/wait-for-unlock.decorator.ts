import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { META_KEY_LOCK_PATTERN } from '../const/metadata';
import { WaitForUnlockInterceptor } from '../interceptors/wait-for-unlock.interceptor';
import { LockKeys } from '../const/lock-keys-patterns';

export function WaitForUnlock(lockKeyPattern: LockKeys) {
  return applyDecorators(
    SetMetadata(META_KEY_LOCK_PATTERN, lockKeyPattern),
    UseInterceptors(WaitForUnlockInterceptor),
  );
}
