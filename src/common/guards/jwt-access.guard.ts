import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { jwtStrategyName } from '@/auth/strategies/strategy-names';
import { META_KEY_IS_PUBLIC } from '../const/metadata';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard
  extends AuthGuard(jwtStrategyName)
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      META_KEY_IS_PUBLIC,
      context.getHandler(),
    );
    if (isPublic) {
      // Если метод помечен как публичный, пропускаем аутентификацию
      return true;
    }
    // Иначе, продолжаем с аутентификацией
    return super.canActivate(context);
  }
}
