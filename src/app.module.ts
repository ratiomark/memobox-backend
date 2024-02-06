import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
  loggingMiddleware,
} from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import EmailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import facebookConfig from './config/facebook.config';
import googleConfig from './config/google.config';
import twitterConfig from './config/twitter.config';
import appleConfig from './config/apple.config';
import redisConfig from './config/redis.config';
import path from 'path';
import { AuthAppleModule } from './auth-apple/auth-apple.module';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthTwitterModule } from './auth-twitter/auth-twitter.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { ForgotModule } from './forgot/forgot.module';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';
import { DevResponseModule } from './dev-response/dev-response.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards';
import { CupboardModule } from './cupboard/cupboard.module';
import { ShelvesModule } from './shelves/shelves.module';
import { BoxesModule } from './boxes/boxes.module';
import { CardsModule } from './cards/cards.module';
import { AggregateModule } from './aggregate/aggregate.module';
import { UserDataStorageModule } from './user-data-storage/user-data-storage.module';
import { SettingsModule } from './settings/settings.module';
import { NotificationModule } from './notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    // должен быть первым
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        EmailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        twitterConfig,
        redisConfig,
        appleConfig,
      ],
      envFilePath: [
        process.env.NODE_ENV === 'production'
          ? '.env'
          : `.env.${process.env.NODE_ENV}`,
      ],
    }),
    /**
     * PrismaModule is imported globally and configured.
     * @see {@link https://nestjs-prisma.dev/docs/configuration}
     */
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        // middlewares: [loggingMiddleware()],
      },
    }),
    DevtoolsModule.register({
      // http: process.env.NODE_ENV !== 'production',
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        supportedLanguages: ['en', 'ru'],
        loaderOptions: {
          path: path.join(__dirname, 'i18n'),
          watch: true,
        },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    // CacheModule.register(),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    RedisModule,
    UsersModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthTwitterModule,
    AuthAppleModule,
    ForgotModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    DevResponseModule,
    ShelvesModule,
    BoxesModule,
    CardsModule,
    AggregateModule,
    CupboardModule,
    UserDataStorageModule,
    SettingsModule,
    NotificationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    /**
     * PrismaClientExceptionFilter for handling Prisma DB exceptions.
     * @see {@link https://nestjs-prisma.dev/docs/exception-filter}
     */
    providePrismaClientExceptionFilter(),
  ],
})
export class AppModule {}
