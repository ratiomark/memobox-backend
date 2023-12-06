import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { NotificationModule } from '@/notification/notification.module';
import { CardsService } from './cards.service';
import { CardsTestService } from './services/cards-test.service';
import { CardDataProcessorService } from './services/cards-data-processor.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsTestService, CardDataProcessorService],
  exports: [CardsService],
  imports: [NotificationModule],
})
export class CardsModule {}
