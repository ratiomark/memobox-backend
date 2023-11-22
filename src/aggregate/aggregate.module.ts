import { Module } from '@nestjs/common';
// import { AggregateService } from './aggregate.service';
import { AggregateController } from './aggregate.controller';
import { ShelvesModule } from '@/shelves/shelves.module';
import { CardsModule } from '@/cards/cards.module';
import { UserDataStorageModule } from '@/user-data-storage/user-data-storage.module';

@Module({
  controllers: [AggregateController],
  // providers: [AggregateService],
  imports: [ShelvesModule, CardsModule, UserDataStorageModule],
})
export class AggregateModule {}
