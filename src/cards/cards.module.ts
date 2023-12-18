import { Module, forwardRef } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { NotificationModule } from '@/notification/notification.module';
import { CardsService } from './cards.service';
import { CardsTestService } from './services/cards-test.service';
import { CardProcessorService } from './services/cards-data-processor.service';
import { ShelvesModule } from '@/shelves/shelves.module';
import { UserDataStorageModule } from '@/user-data-storage/user-data-storage.module';
// import { UserDataStorageProxyService } from '@/user-data-storage/user-data-storage.service';

@Module({
  controllers: [CardsController],
  providers: [CardProcessorService, CardsService, CardsTestService],
  exports: [CardsService, CardProcessorService],
  imports: [
    forwardRef(() => ShelvesModule),
    forwardRef(() => UserDataStorageModule),
    // UserDataStorageModule,
    // UserDataStorageProxyService,
    NotificationModule,
  ],
})
export class CardsModule {}

// imports: [ShelvesModule, NotificationModule],
