import { Controller, Get } from '@nestjs/common';
import { CupboardService } from './cupboard.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '@/common/decorators';
import { User } from '@prisma/client';

@ApiTags('Cupboard')
@Controller({
  path: 'cupboard',
  version: '1',
})
export class CupboardController {
  constructor(private readonly cupboardService: CupboardService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get cupboard data: shelves, boxes, current state of system',
  })
  @Get()
  async getCupboard(@GetCurrentUser('id') userId: User['id']) {
    return this.cupboardService.getCupboard(userId);
  }
}
