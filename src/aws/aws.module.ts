import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { DynamoDbService } from './dynamo-db.service';
import { LambdaService } from './lambda.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AwsController],
  imports: [
    HttpModule.register({
      baseURL:
        'https://memobox-vercel-edge-functions-l9x9mmwmc-ratiomarks-projects.vercel.app',
    }),
  ],
  providers: [AwsService, DynamoDbService, LambdaService],
  exports: [LambdaService, DynamoDbService],
})
export class AwsModule {}
// import { Module } from '@nestjs/common';
// import { AwsService } from './aws.service';
// import { AwsController } from './aws.controller';
// import { DynamoDbService } from './dynamo-db.service';
// import { LambdaService } from './lambda.service';

// @Module({
//   controllers: [AwsController],
//   providers: [AwsService, DynamoDbService, LambdaService],
//   exports: [LambdaService, DynamoDbService],
// })
// export class AwsModule {}
