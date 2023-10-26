import { Module } from '@nestjs/common';
import { ForgotService } from './forgot.service';

@Module({
  providers: [ForgotService],
  exports: [ForgotService],
})
export class ForgotModule {}
