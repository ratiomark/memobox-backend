import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
// import { EventEmitterModule } from '@nestjs/event-emitter';
import { SettingsModule } from '@/settings/settings.module';
import { AwsModule } from '@/aws/aws.module';
import { PushService } from './push.service';
import { ServerLessModule } from '@/server-less/server-less.module';

@Module({
  imports: [SettingsModule, AwsModule, ServerLessModule],
  controllers: [NotificationController],
  providers: [NotificationService, PushService],
  exports: [NotificationService],
})
export class NotificationModule {}
