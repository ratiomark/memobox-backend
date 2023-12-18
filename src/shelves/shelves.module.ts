import { Module, forwardRef } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { ShelvesController } from './shelves.controller';
import { SettingsModule } from '@/settings/settings.module';
import { BoxesModule } from '@/boxes/boxes.module';
import { CardsModule } from '@/cards/cards.module';
import { ShelvesProcessorService } from './services/shelves-data-processor.service';

@Module({
  controllers: [ShelvesController],
  providers: [ShelvesService, ShelvesProcessorService],
  exports: [ShelvesService, ShelvesProcessorService],
  imports: [
    SettingsModule,
    BoxesModule,
    // forwardRef(() => BoxesModule),
    forwardRef(() => CardsModule),
  ],
})
export class ShelvesModule {}

// imports: [SettingsModule, BoxesModule, forwardRef(() => CardsModule)],
