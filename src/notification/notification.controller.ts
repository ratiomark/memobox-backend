import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GetCurrentUser } from '@/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '@/common/types/prisma-entities';

@ApiTags('Notification')
@Controller({
  path: 'notification',
  version: '1',
})
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post()
  create(@GetCurrentUser('id') userId: UserId, @Body() data: any) {
    return this.notificationService.scheduleNotification(userId, data);
  }
}
