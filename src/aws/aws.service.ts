import { AllConfigType } from '@/config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { DynamoDbService } from './dynamo-db.service';
import { TrainingNotificationItem } from './types/db-tables';
import { LambdaService } from './lambda.service';

@Injectable()
export class AwsService {
  private nodeEnv: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly dynamoDbService: DynamoDbService,
    private readonly lambda: LambdaService,
  ) {
    // const accessKeyId = this.configService.getOrThrow<string>(
    //   'AWS_ACCESS_KEY_ID',
    //   {
    //     infer: true,
    //   },
    // );
    // const secretAccessKey = this.configService.getOrThrow<string>(
    //   'AWS_SECRET_ACCESS_KEY',
    //   {
    //     infer: true,
    //   },
    // );
    // const region = this.configService.getOrThrow<string>('AWS_REGION', {
    //   infer: true,
    // });
    // this.nodeEnv = this.configService.getOrThrow<string>('NODE_ENV', {
    //   infer: true,
    // });
    this.initVariables();

    AWS.config.update({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
    });
  }

  async addOrUpdateTrainingNotification(
    notificationItem: TrainingNotificationItem,
  ) {
    const dbResponse =
      await this.dynamoDbService.addOrUpdateTrainingNotification(
        notificationItem,
      );
  }

  initVariables() {
    this.accessKeyId = this.configService.getOrThrow<string>(
      'AWS_ACCESS_KEY_ID',
      {
        infer: true,
      },
    );
    this.secretAccessKey = this.configService.getOrThrow<string>(
      'AWS_SECRET_ACCESS_KEY',
      {
        infer: true,
      },
    );
    this.region = this.configService.getOrThrow<string>('AWS_REGION', {
      infer: true,
    });
    this.nodeEnv = this.configService.getOrThrow<string>('NODE_ENV', {
      infer: true,
    });
  }
  // initVariables() {
  //   const accessKeyId = this.configService.getOrThrow<string>(
  //     'AWS_ACCESS_KEY_ID',
  //     {
  //       infer: true,
  //     },
  //   );
  //   const secretAccessKey = this.configService.getOrThrow<string>(
  //     'AWS_SECRET_ACCESS_KEY',
  //     {
  //       infer: true,
  //     },
  //   );
  //   const region = this.configService.getOrThrow<string>('AWS_REGION', {
  //     infer: true,
  //   });
  //   this.nodeEnv = this.configService.getOrThrow<string>('NODE_ENV', {
  //     infer: true,
  //   });
  // }
}
