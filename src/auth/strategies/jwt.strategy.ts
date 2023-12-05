import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { OrNeverType } from '../../utils/types/or-never.type';
import { AllConfigType } from '@/config/config.type';
import { JwtPayloadType } from './types/jwt-payload.type';
import { jwtStrategyName } from './strategy-names';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, jwtStrategyName) {
  constructor(private configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret', { infer: true }),
      ignoreExpiration: true,
    });
  }

  public validate(payload: JwtPayloadType): OrNeverType<JwtPayloadType> {
    // console.log('JwtStrategy validate start');
    // console.log('*** Inside JwtStrategy validate method ***');
    // console.log('Payload:', payload);

    if (!payload.id) {
      // console.log('No ID in payload, throwing UnauthorizedException.');
      throw new UnauthorizedException();
    }
    // console.log(payload.exp);
    // console.log(new Date().getTime());
    // console.log(new Date(payload.exp));
    // console.log(payload.exp < new Date().getTime());

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      // console.log(
      // 'JwtStrategy - Token expired, throwing UnauthorizedException.',
      // );
      // if (payload.exp - payload.iat < new Date().getTime()) {
      throw new UnauthorizedException('expired');
    }

    // console.log('JwtStrategy validation successful, returning payload.');
    return payload;
  }
}
