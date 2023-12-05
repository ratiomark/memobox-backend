import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
// import { EventEmitterModule } from '@nestjs/event-emitter';
import { SettingsModule } from '@/settings/settings.module';

@Module({
  imports: [SettingsModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
