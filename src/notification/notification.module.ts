import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
// import { EventEmitterModule } from '@nestjs/event-emitter';
import { SettingsModule } from '@/settings/settings.module';
import { AwsModule } from '@/aws/aws.module';
import { PushService } from './push.service';
import { ServerLessModule } from '@/server-less/server-less.module';
import { NotificationDataProcessorService } from './notification-data-processor.service';

@Module({
  imports: [
    SettingsModule,
    // AwsModule,
    ServerLessModule,
  ],
  controllers: [NotificationController],
  providers: [
    NotificationDataProcessorService,
    NotificationService,
    PushService,
  ],
  exports: [NotificationService, PushService],
})
export class NotificationModule {}
