import { Module } from '@nestjs/common';
import { UserDataStorageService } from './user-data-storage.service';
import { CardsModule } from 'src/cards/cards.module';
import { ShelvesModule } from 'src/shelves/shelves.module';

@Module({
  providers: [UserDataStorageService],
  exports: [UserDataStorageService],
  imports: [CardsModule, ShelvesModule],
})
export class UserDataStorageModule {}
