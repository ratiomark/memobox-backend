import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtRefreshStrategyName } from 'src/auth/strategies/strategy-names';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(jwtRefreshStrategyName) {}
