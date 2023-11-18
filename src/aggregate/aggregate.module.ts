import { Module } from '@nestjs/common';
// import { AggregateService } from './aggregate.service';
import { AggregateController } from './aggregate.controller';
import { ShelvesModule } from 'src/shelves/shelves.module';
import { CardsModule } from 'src/cards/cards.module';
import { UserDataStorageModule } from 'src/user-data-storage/user-data-storage.module';

@Module({
  controllers: [AggregateController],
  // providers: [AggregateService],
  imports: [ShelvesModule, CardsModule, UserDataStorageModule],
})
export class AggregateModule {}
