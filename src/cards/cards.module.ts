import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { NotificationModule } from '@/notification/notification.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
  imports: [NotificationModule],
})
export class CardsModule {}
