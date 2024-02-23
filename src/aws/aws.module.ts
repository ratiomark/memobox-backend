import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { DynamoDbService } from './dynamo-db.service';
import { LambdaService } from './lambda.service';

@Module({
  controllers: [AwsController],
  providers: [AwsService, DynamoDbService, LambdaService],
  exports: [LambdaService],
})
export class AwsModule {}
