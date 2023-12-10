import { Module, forwardRef } from '@nestjs/common';
import {
  // UserDataStorageProxyService,
  UserDataStorageService,
} from './user-data-storage.service';
import { CardsModule } from '@/cards/cards.module';
import { ShelvesModule } from '@/shelves/shelves.module';
import { BoxesModule } from '@/boxes/boxes.module';

@Module({
  providers: [UserDataStorageService],
  // providers: [UserDataStorageService, UserDataStorageProxyService],
  exports: [UserDataStorageService],
  // exports: [UserDataStorageService, UserDataStorageProxyService],
  imports: [
    forwardRef(() => CardsModule),
    forwardRef(() => ShelvesModule),
    forwardRef(() => BoxesModule),
  ],
})
export class UserDataStorageModule {}
