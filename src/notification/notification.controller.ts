import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GetCurrentUser } from '@/common/decorators';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notification')
@Controller({
  path: 'notification',
  version: '1',
})
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post()
  create(@GetCurrentUser('id') userId: User['id'], @Body() data: any) {
    return this.notificationService.scheduleNotification(userId, data);
  }
}
