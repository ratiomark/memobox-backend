import { Module } from '@nestjs/common';
import { ServerLessService } from './server-less.service';
import { ServerLessController } from './server-less.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.getOrThrow<string>('SERVERLESS_BASE_URL', {
          infer: true,
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ServerLessController],
  providers: [ServerLessService],
  exports: [ServerLessService],
})
export class ServerLessModule {}
