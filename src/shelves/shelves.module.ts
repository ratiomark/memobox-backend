import { Module } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { ShelvesController } from './shelves.controller';
import { SettingsModule } from '@/settings/settings.module';
import { BoxesModule } from '@/boxes/boxes.module';
import { CardsModule } from '@/cards/cards.module';

@Module({
  controllers: [ShelvesController],
  providers: [ShelvesService],
  exports: [ShelvesService],
  imports: [SettingsModule, BoxesModule, CardsModule],
})
export class ShelvesModule {}
