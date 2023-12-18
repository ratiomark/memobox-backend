import { Module } from '@nestjs/common';
// import { AggregateService } from './aggregate.service';
import { AggregateController } from './aggregate.controller';
import { ShelvesModule } from '@/shelves/shelves.module';
import { UserDataStorageModule } from '@/user-data-storage/user-data-storage.module';
import { CardsModule } from '@/cards/cards.module';

@Module({
  controllers: [AggregateController],
  // providers: [AggregateService],
  // providers: [RedisService],
  imports: [ShelvesModule, CardsModule, UserDataStorageModule],
})
export class AggregateModule {}
