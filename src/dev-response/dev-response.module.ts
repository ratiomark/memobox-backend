import { Module, Global } from '@nestjs/common';
import { DevResponseService } from './dev-response.service';

@Global()
@Module({
  providers: [DevResponseService],
  exports: [DevResponseService],
})
export class DevResponseModule {}
