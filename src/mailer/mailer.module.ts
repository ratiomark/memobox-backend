import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { AwsModule } from '@/aws/aws.module';

@Module({
  providers: [MailerService],
  exports: [MailerService],
  imports: [AwsModule],
})
export class MailerModule {}
