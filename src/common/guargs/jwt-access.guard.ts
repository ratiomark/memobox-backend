import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtStrategyName } from 'src/auth/strategies/strategy-names';

@Injectable()
export class JwtGuard extends AuthGuard(jwtStrategyName) {}
