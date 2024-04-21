import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GetCurrentUser, IsPublic } from '@/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '@/common/types/prisma-entities';
import {
  PushDataFromServerless,
  ResponseDTO,
} from './dto/notifications-from-aws.dto';
import { PushSubscription } from 'web-push';
import { PushService } from './push.service';
import { SubscriptionBaseDTO, SubscriptionDTO } from './dto/subscription-dto';
import { sleep } from '@/utils/common/sleep';
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
  recalculateNotifications(
    @Headers('x-api-key') apiKey: string,
    @Body() data: ResponseDTO[],
  ) {
    // this.logger.debug(JSON.stringify(data, null, 3));
    void this.notificationService.recalculateEmailNotificationsAfterServerless(
      data,
      apiKey,
    );
    return { success: true };
  }

  // принимает {lang: PushTrainingNotification[]}
  // отправляет пуши всем пользователям по языку
  // высчитывает новое время пуша
  // обновляет время пуша в базе на беке
  // отправляет новое время на serverless
  @IsPublic()
  @Post('sendAllTrainingPushes')
  async sendPushes(
    @Headers('x-api-key') apiKey: string,
    @Body() body: PushDataFromServerless,
  ) {
    this.logger.log('sendAllTrainingPushes - started');
    this.logger.log(apiKey);
    this.logger.log(body);
    this.logger.log('sendAllTrainingPushes - ended');
    await this.pushService.processPushesByLang(body, apiKey);
    // await this.pushService.sendPushNotificationsToUsersProd(['test'], {});
    // await this.pushService.sendPushNotificationsToUsersProd(['test'], {});
    // const res = await this.pushService.sendPushNotificationsToUsers(['test'], {
    //   data: { message: 'test' },
    //   title: 'testtitle',
    //   icon: 'testicon',
    // });
    // this.logger.debug(res);
    // return res;
  }

  // не нужен, поскольку пуши отправляются и сразу же пересчитываются
  // @IsPublic()
  // @HttpCode(HttpStatus.OK)
  // @Post('recalculatePushNotifications')
  // async recalculatePushes(@GetCurrentUser() userId: UserId) {
  //   // const res = await this.pushService.sendPushNotificationsToUsers(['test'], {
  //   //   data: { message: 'test' },
  //   //   title: 'testtitle',
  //   //   icon: 'testicon',
  //   // });
  //   // this.logger.debug(res);
  //   // return res;
  // }

  @IsPublic()
  @Post('test/sendPushes')
  async sendTestPushes() {
    await sleep(1);
    // await this.pushService.sendPushNotificationsToUsersProd(['test'], {});
    // const res = await this.pushService.sendPushNotificationsToUsers(['test'], {
    //   data: { message: 'test' },
    //   title: 'testtitle',
    //   icon: 'testicon',
    // });
    // this.logger.debug(res);
    // return res;
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('test/recalculateAll')
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

  // @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('push/subscribe')
  async addSubscription(
    @Body() subscriptionDto: SubscriptionBaseDTO,
    @GetCurrentUser('id') userId: UserId,
  ) {
    const { subscription, browserName, osName } = subscriptionDto;

    this.logger.debug(JSON.stringify(subscriptionDto, null, 3));
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

  // @IsPublic()
  // @Post('sendTest')
  // async sendTest(@GetCurrentUser() userId: UserId) {
  //   const res = await this.pushService.sendPushNotificationsToUsers(['test'], {
  //     data: { message: 'test' },
  //     title: 'testtitle',
  //     icon: 'testicon',
  //   });
  //   this.logger.debug(res);
  //   return res;
  // }

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
