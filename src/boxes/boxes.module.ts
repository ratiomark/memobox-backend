import { Module, forwardRef } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { BoxesController } from './boxes.controller';
import { CardsModule } from '@/cards/cards.module';

@Module({
  controllers: [BoxesController],
  providers: [BoxesService],
  exports: [BoxesService],
  imports: [CardsModule],
})
export class BoxesModule {}
