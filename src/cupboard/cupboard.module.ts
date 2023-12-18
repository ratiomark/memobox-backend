import { Module, forwardRef } from '@nestjs/common';
import { CupboardService } from './cupboard.service';
import { CupboardController } from './cupboard.controller';
import { UserDataStorageModule } from '@/user-data-storage/user-data-storage.module';
import { CupboardFactory } from './cupboard.factory';
import { ShelvesModule } from '@/shelves/shelves.module';

@Module({
  controllers: [CupboardController],
  providers: [CupboardService, CupboardFactory],
  // exports: [CupboardFactory],
  // imports: [forwardRef(() => UserDataStorageModule)],
  imports: [
    forwardRef(() => UserDataStorageModule),
    forwardRef(() => ShelvesModule),
  ],
})
export class CupboardModule {}
