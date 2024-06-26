import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
// import { MailerModule } from '@/mailer/mailer.module';
// import { AwsModule } from '@/aws/aws.module';
import { ServerLessModule } from '@/server-less/server-less.module';
import { MailerModule } from '@/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    // AwsModule,
    MailerModule,
    ServerLessModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
