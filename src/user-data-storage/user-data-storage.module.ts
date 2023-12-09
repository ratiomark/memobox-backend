import { Module, forwardRef } from '@nestjs/common';
import { UserDataStorageService } from './user-data-storage.service';
import { CardsModule } from '@/cards/cards.module';
import { ShelvesModule } from '@/shelves/shelves.module';
import { BoxesModule } from '@/boxes/boxes.module';

@Module({
  providers: [UserDataStorageService],
  exports: [UserDataStorageService],
  // imports: [CardsModule, forwardRef(() => ShelvesModule), BoxesModule],
  imports: [
    forwardRef(() => CardsModule),
    forwardRef(() => ShelvesModule),
    forwardRef(() => BoxesModule),
  ],
})
export class UserDataStorageModule {}
