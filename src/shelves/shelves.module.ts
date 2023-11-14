import { Module } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { ShelvesController } from './shelves.controller';

@Module({
  controllers: [ShelvesController],
  providers: [ShelvesService],
})
export class ShelvesModule {}
