import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DevResponseService {
  constructor(private configService: ConfigService) {}

  sendResponseIfDev<T>(object: T): T | void {
    if (
      this.configService.getOrThrow('app.nodeEnv', {
        infer: true,
      }) === 'development'
    ) {
      return object;
    }
  }
}
