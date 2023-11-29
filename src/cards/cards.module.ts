import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
// import { ShelvesModule } from '@/shelves/shelves.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
  // imports: [ShelvesModule],
})
export class CardsModule {}
