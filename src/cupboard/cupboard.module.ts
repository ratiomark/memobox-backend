import { Module } from '@nestjs/common';
import { CupboardService } from './cupboard.service';
import { CupboardController } from './cupboard.controller';

@Module({
  controllers: [CupboardController],
  providers: [CupboardService],
})
export class CupboardModule {}
