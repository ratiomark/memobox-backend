import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from '@/users/users.module';
import { ForgotModule } from '@/forgot/forgot.module';
import { MailModule } from '@/mail/mail.module';
import { IsExist } from '@/utils/validators/is-exists.validator';
import { IsNotExist } from '@/utils/validators/is-not-exists.validator';
import { SessionModule } from '@/session/session.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AwsModule } from '@/aws/aws.module';

@Module({
  imports: [
    UsersModule,
    ForgotModule,
    SessionModule,
    PassportModule,
    MailModule,
    JwtModule.register({}),
    AwsModule,
  ],
  controllers: [AuthController],
  providers: [
    IsExist,
    IsNotExist,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    AnonymousStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
