import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GetCurrentUser, IsPublic } from '@/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '@/common/types/prisma-entities';
import { ResponseDTO } from './dto/notifications-from-aws.dto';
import { PushSubscription } from 'web-push';
import { PushService } from './push.service';
import { SubscriptionBaseDTO, SubscriptionDTO } from './dto/subscription-dto';
// import { ClientResponse } from '@sendgrid/mail';

@ApiTags('Notification')
@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationController {
  private logger = new Logger(NotificationController.name);
  constructor(
    private readonly notificationService: NotificationService,
    private readonly pushService: PushService,
  ) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('recalculateNotifications')
  recalculateNotifications(@Body() data: ResponseDTO[]) {
    this.logger.debug(JSON.stringify(data, null, 3));
    void this.notificationService.recalculateNotificationsAfterAws(data);
    return { success: true };
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('recalculateAll')
  async recalculateAll() {
    await this.notificationService.recalculateAll();
    return { success: true };
  }
  // @IsPublic()
  // @HttpCode(HttpStatus.OK)
  // @Post('recalculateAll')
  // async recalculateAll() {
  //   await this.notificationService.recalculateAll();
  //   return { success: true };
  // }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('push/subscribe')
  async addSubscription(
    @Body() subscriptionDto: SubscriptionBaseDTO,
    @GetCurrentUser() userId: UserId,
  ) {
    const { subscription, browserName, osName } = subscriptionDto;
    // this.logger.debug(JSON.stringify(subscriptionDto, null, 3));
    // this.logger.debug(JSON.stringify(subscription.endpoint));

    const res = await this.pushService.subscribePushNotification(
      subscription,
      userId,
      browserName,
      osName,
    );
    this.logger.debug(res);
    return res;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('push/unsubscribe')
  async removeSubscription(
    @Body() subscriptionObject: { subscription: PushSubscription },
    @GetCurrentUser() userId: UserId,
  ) {
    return await this.pushService.unsubscribePushNotification(
      subscriptionObject.subscription,
      userId,
    );
  }

  @IsPublic()
  @Post('sendTest')
  async sendTest(@GetCurrentUser() userId: UserId) {
    const res = await this.pushService.sendNotificationToUsers(['test'], {
      data: { message: 'test' },
      title: 'testtitle',
      icon: 'testicon',
    });
    this.logger.debug(res);
    return res;
  }

  // @IsPublic()
  // @Get('getAllEmails')
  // async getAllEmails() {
  //   const res = await this.notificationService.getAllEmails();
  //   this.logger.debug(res);
  //   return res;
  // }
  // @IsPublic()
  // @HttpCode(HttpStatus.OK)
  // @Post('recalculateNotifications')
  // recalculateNotifications(@Body() data: ResponseDTO[]) {
  //   data.forEach((item) => {
  //     if (item.success && item.response) {
  //       const check = item;
  //     }
  //   });
  //   this.logger.log('recalculateNotifications - started');
  //   this.logger.debug(data);
  //   this.logger.log('recalculateNotifications - ended');
  //   return { success: true };
  // }
}
