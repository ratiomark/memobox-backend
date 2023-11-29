import { Module } from '@nestjs/common';
import { UserDataStorageService } from './user-data-storage.service';
import { CardsModule } from '@/cards/cards.module';
import { ShelvesModule } from '@/shelves/shelves.module';
import { BoxesModule } from '@/boxes/boxes.module';

@Module({
  providers: [UserDataStorageService],
  exports: [UserDataStorageService],
  imports: [CardsModule, ShelvesModule, BoxesModule],
})
export class UserDataStorageModule {}
