import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SettingsService } from '@/settings/settings.service';
import { EVENT_NOTIFY_EMAIL, EVENT_USER_CREATED } from '@/common/const/events';
import { UserId } from '@/common/types/prisma-entities';
import {
  TimeSleepSettings,
  // TimeSleepDataObject,
  DaysOfWeek,
  SleepPeriod,
  // TimeSleepAtomicDataObject,
} from '@/aggregate/entities/settings-types';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import {
  addDays,
  addHours,
  addMinutes,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isWithinInterval,
  subDays,
  subMinutes,
} from 'date-fns';
import {
  getCurrentDayOfWeek,
  getIsNotificationWithinSleepInterval,
  getNextDayOfWeek,
  getPreviousDayOfWeek,
} from './helpers';
import { DynamoDbService } from '@/aws/dynamo-db.service';
import { RedisService } from '@/redis/redis.service';
import { cacheOrFetchData } from '@/utils/helpers/cache-or-fetch';
import { PrismaService } from 'nestjs-prisma';
import { UserNotificationData } from './types/types';
import { TrainingNotificationItem } from '@/aws/types/db-tables';
import {
  PushDataFromServerless,
  ResponseDTO,
} from './dto/notifications-from-aws.dto';
import { appendTimeToFile } from '@/utils/helpers/append-data-to-file';
import { isObject } from 'class-validator';
import * as webPush from 'web-push';
import { PushSubscription, SendResult } from 'web-push';
import { sleep } from '@/utils/common/sleep';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { ServerLessService } from '@/server-less/server-less.service';
import { NotificationDataProcessorService } from './notification-data-processor.service';
import { filter } from 'rxjs';
// interface PushSubscription {
//   endpoint: string;
//   expirationTime?: number | null;
//   keys: {
//     p256dh: string;
//     auth: string;
//   };
// }
// type NotificationPromise = Promise<TrainingNotificationItem | null | undefined>;
@Injectable()
export class PushService implements OnModuleInit {
  private VAPID_PUBLIC_KEY: string;
  private VAPID_PRIVATE_KEY: string;
  private logger = new Logger(PushService.name);
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly prisma: PrismaService,
    private readonly serverless: ServerLessService,
    private readonly notificationProcessor: NotificationDataProcessorService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}
  onModuleInit() {
    this.initVariables();
    webPush.setVapidDetails(
      'https://memobox.tech/',
      this.VAPID_PUBLIC_KEY,
      this.VAPID_PRIVATE_KEY,
    );
  }

  async recalculatePushNotificationsAfterServerless(
    data: PushDataFromServerless,
    apiKey: string,
  ) {
    // принимает {lang: PushTrainingNotification[]}
    // отправляет пуши всем пользователям по языку
    // высчитывает новое время пуша
    // обновляет время пуша в базе на беке
    // отправляет новое время на serverless
    // await this.notificationProcessor.recalculatePushNotificationsAfterServerless(
    //   data,
    //   apiKey,
    // );
  }

  async sendPushNotificationsToUsersProd(userIds: string[], payload: any) {
    const subscriptions = await this.prisma.pushSubscription.findMany({
      // where: {
      //   userId: {
      //     in: userIds,
      //   },
      // },
    });
    payload = {
      data: { message: 'test' },
      title: 'testtitle',
      icon: 'testicon',
    };
    // this.logger.debug(JSON.stringify(subscriptions, null, 2));
    const sendPushPromises = subscriptions.map((subscription) => {
      return webPush.sendNotification(
        JSON.parse(subscription.subscription as unknown as string),
        JSON.stringify(payload),
      );
    });
    const responses = await Promise.allSettled<SendResult>(sendPushPromises);

    const rejectedEndpoints = responses
      .map((response) => {
        if (
          response.status === 'rejected' &&
          response.reason &&
          response.reason.endpoint
        ) {
          return response.reason.endpoint;
        } else {
          return null;
        }
      })
      .filter(Boolean);

    await this.prisma.pushSubscription.deleteMany({
      where: {
        endpoint: { in: rejectedEndpoints },
      },
    });
    this.logger.debug(JSON.stringify(rejectedEndpoints, null, 2));
    this.logger.debug(JSON.stringify(responses, null, 2));
    // let responses: any;
    // try {
    //   responses = await Promise.allSettled(sentPushPromises);
    // } catch (error) {
    //   this.logger.log(error);
    // }
    // this.logger.debug(JSON.stringify(responses, null, 2));
    // [
    //   {
    //     statusCode: 201,
    //     body: '',
    //     headers: {
    //       location:
    //         'https://fcm.googleapis.com/0:1712799666977195%e609af1cf9fd7ecd',
    //       'x-content-type-options': 'nosniff',
    //       'x-frame-options': 'SAMEORIGIN',
    //       'x-xss-protection': '0',
    //       date: 'Thu, 11 Apr 2024 01:41:06 GMT',
    //       'content-length': '0',
    //       'content-type': 'text/html; charset=UTF-8',
    //       'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
    //     },
    //   },
    // ];
    // return responses;
    // очистить записи в базе данных, если подписка не действительна или не существует
  }

  async sendPushNotificationsToUsers(userIds: string[], payload: any) {
    // await sleep(5);
    const user = await this.prisma.user.findUnique({
      where: { email: 'yanagae@gmail.com' },
    });
    const testUserIds = [user!.id!];
    const subscriptions = await this.prisma.pushSubscription.findMany({
      where: {
        userId: {
          in: testUserIds,
          // in: userIds,
        },
        // user: {
        //   language: {
        //     in: ['en'],
        //   },
        // },
      },
    });
    this.logger.debug(JSON.stringify(subscriptions, null, 2));
    const sentPushPromises = subscriptions.map((subscription) => {
      return webPush.sendNotification(
        JSON.parse(subscription.subscription as unknown as string),
        JSON.stringify(payload),
      );
    });
    const responses = await Promise.all(sentPushPromises);
    console.log(JSON.stringify(responses, null, 2));
    return responses;
    // очистить записи в базе данных, если подписка не действительна или не существует
  }

  // 	{
  //   "en": [
  //     {
  //       "_id": "66172cf2524915e78cc2480a",
  //       "notificationId": "97441b96-6f92-4f8b-8715-2ee2ece3f37c",
  //       "name": "John",
  //       "notificationTime": "2024-04-11T03:27:04.776Z",
  //       "user_language": "en"
  //     }
  //   ],
  //   "ru": []
  // }
  async reschedulePushNotification(userId: UserId, notificationTime: Date) {}

  async subscribePushNotification(
    subscription: PushSubscription,
    userId: UserId,
    browser: string,
    osName: string,
  ) {
    const endpoint = subscription.endpoint;
    const alreadySubscribed = await this.prisma.pushSubscription.findUnique({
      where: { endpoint },
    });
    if (alreadySubscribed) {
      return { message: 'Subscribed' };
    }

    await this.prisma.pushSubscription.create({
      data: {
        subscription: JSON.stringify(subscription),
        userId,
        endpoint,
        browser,
        osName,
      },
    });
    return { message: 'Subscribed' };
  }

  async unsubscribePushNotification(
    subscription: PushSubscription,
    userId: UserId,
  ) {
    const endpoint = subscription.endpoint;
    const alreadySubscribed = await this.prisma.pushSubscription.findUnique({
      where: { endpoint },
    });
    if (alreadySubscribed) {
      await this.prisma.pushSubscription.delete({
        where: { endpoint },
      });
      return { message: 'Unsubscribed' };
    }
    return { message: 'User not subscribed' };
  }

  initVariables() {
    this.VAPID_PUBLIC_KEY = this.configService.getOrThrow<string>(
      'VAPID_PUBLIC_KEY',
      {
        infer: true,
      },
    );
    this.VAPID_PRIVATE_KEY = this.configService.getOrThrow<string>(
      'VAPID_PRIVATE_KEY',
      {
        infer: true,
      },
    );
    // this.baseUrl = this.configService.getOrThrow<string>(
    //   'SERVERLESS_BASE_URL',
    //   {
    //     infer: true,
    //   },
    // );
    // this.baseHeader = {
    //   'x-api-key': this.xApiKey,
    // };
  }

  // async subscribePushNotification(
  //   subscription: PushSubscription,
  //   userId: UserId,
  //   browser: string,
  //   osName: string,
  // ) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { email: 'yanagae@gmail.com' },
  //   });
  //   const endpoint = subscription.endpoint;
  //   const alreadySubscribed = await this.prisma.pushSubscription.findUnique({
  //     where: { endpoint },
  //   });
  //   if (alreadySubscribed) {
  //     return { message: 'Subscribed' };
  //   }

  //   await this.prisma.pushSubscription.create({
  //     data: {
  //       subscription: JSON.stringify(subscription),
  //       userId: user!.id!,
  //       endpoint,
  //       browser,
  //       osName,
  //     },
  //   });
  //   return { message: 'Subscribed' };
  // }

  // @OnEvent(EVENT_USER_CREATED)
  // async setNotificationInitialEmail(payload: {
  //   email: string;
  //   userId: UserId;
  // }) {
  //   this.logger.log('user.register event started ');
  //   const { email, userId } = payload;
  //   const notificationEmails: NotificationEmails[] = [
  //     { email, verified: false },
  //   ];
  //   const notifications = notificationsMock;
  //   notifications.notificationEmails = notificationEmails;
  //   await this.prisma.notification.upsert({
  //     where: { userId },
  //     update: { settings: notifications as unknown as Prisma.InputJsonObject },
  //     create: {
  //       userId,
  //       settings: notifications as unknown as Prisma.InputJsonObject,
  //     },
  //   });
  //   this.logger.log('user.register event ended');
  // }
}

// private generateVapidKeys(): void {
//   const vapidKeys = webPush.generateVAPIDKeys();
//   this.logger.warn(vapidKeys);
// }
// {
//   "endpoint": "https://fcm.googleapis.com/fcm/send/ffzs9tXettg:APA91bGC6ioP1vOrTMuHrhmq5ney1gWwuqGB4K8-rWVKsB1Xb3PQDW2fNMIHpn7boTeMD2bl16aF1nAB_OeEH42osNRGBCPVYw_YeQwPJTf_K1tmly8eLBMlifNuchcw6pBSBbvnP8Ke",
//   "expirationTime": null,
//   "keys": {
//     "p256dh": "BImuh_M2xksrNbRMIa4qY4jSXF5QaBGtCBe5UwpIETgpVZM4LNW5F4ilrz7BMhP_UEetszXeSRvnxRLCXq5b85M",
//     "auth": "LDJcgkbQjG9auOVgMm2NEw"
//   }
// }
// {
//   "endpoint": "https://fcm.googleapis.com/fcm/send/eM3t_TECAu4:APA91bExyOQFUbvIadRZEk9ip9BbrwxsbSxmdrqKKBk42C4v7hukUhO-3Qu4MdKDfzYVsKrB3E1bvJ4SfK0m-g09wDWox_uxJFYSjUdPSprFC6UmDoC_UIDSvNk38RyUALD8huGj4v1v",
//   "expirationTime": null,
//   "keys": {
//     "p256dh": "BAvk_mapFuBDIhpac_KsUYCvUI0bLRRIRPS4NQ4KmHuh1NtHKA0kvilOQ2-G2dihfUC3FWe3YtmeVm6tVUoZwFQ",
//     "auth": "6G9VMdwbQVVSbCZg2hT08g"
//   }
// }
// if(isSleepStartEndSameDay) {
//   const notificationWithinSleepInterval = isWithinInterval(
//     notificationTimeLocal,
//     {
//       start: adjustedSleepStartTime,
//       end: adjustedSleepEndTime,
//     },
//   );
//   const notificationBeforeSleepInterval = isBefore(
//     notificationTimeLocal,
//     adjustedSleepStartTime,
//   );
//   if (notificationWithinSleepInterval) {
//     return adjustedSleepEndTime;
//   }
//   if (notificationBeforeSleepInterval) {
//     if (isSameDay(notificationTimeLocal, adjustedSleepStartTime)) {
//       return notificationTimeLocal;
//     } else {
//       return adjustedSleepStartTime;
//     }
//   }
//   return notificationTimeLocal;
// }
// if (isAfter(sleepStartTime, sleepEndTime)) {
//   // Если период сна переходит через полночь
//   if (isBefore(notificationTimeLocal, sleepEndTime)) {
//     // Если время уведомления до конца периода сна
//     sleepEndTime = addMinutes(sleepEndTime, afterSleepMinutes);
//     return sleepEndTime;
//   } else if (isAfter(notificationTimeLocal, sleepStartTime)) {
//     // Если время уведомления после начала периода сна
//     sleepEndTime = addMinutes(sleepEndTime, afterSleepMinutes);
//     return sleepEndTime;
//   }
// } else {
//   // Нормальный период сна, не переходящий через полночь
//   const adjustedSleepStartTime = subMinutes(
//     sleepStartTime,
//     beforeSleepMinutes,
//   );
//   const adjustedSleepEndTime = addMinutes(
//     sleepEndTime,
//     afterSleepMinutes,
//   );

//   if (isBefore(notificationTimeLocal, adjustedSleepStartTime)) {
//     // Время уведомления до начала периода сна
//     return notificationTimeLocal;
//   } else if (isAfter(notificationTimeLocal, adjustedSleepEndTime)) {
//     // Время уведомления после окончания периода сна
//     return notificationTimeLocal;
//   } else {
//     // Время уведомления во время периода сна
//     return adjustedSleepEndTime;
//   }
// }

// В случае, если ни одно из условий не сработало (хотя это маловероятно), возвращаем исходное время уведомления
// getNotificationTimeAdjusted(
//   notificationTimeLocal: Date,
//   timeSleepSettings: TimeSleepSettings,
//   beforeSleepMinutes = 0,
//   afterSleepMinutes = 0,
// ): Date {
//   const currentDayOfWeek = this.getCurrentDayOfWeek(notificationTimeLocal);
//   const nextDayOfWeek = this.getNextDayOfWeek(notificationTimeLocal);

//   const {
//     currentDayWakeUpTime,
//     currentDayFallAsleepTime,
//     nextDayWakeUpTime,
//   } = this.getSleepTimes(
//     notificationTimeLocal,
//     timeSleepSettings,
//     currentDayOfWeek,
//     nextDayOfWeek,
//   );

//   const currentDayWakeUpTimeWithOffset = addMinutes(
//     currentDayWakeUpTime,
//     afterSleepMinutes,
//   );
//   const currentDayFallAsleepTimeWithOffset = subMinutes(
//     currentDayFallAsleepTime,
//     beforeSleepMinutes,
//   );
//   const nextDayWakeUpTimeWithOffset = addMinutes(
//     nextDayWakeUpTime,
//     afterSleepMinutes,
//   );
//   // Условие isBefore(notificationTimeLocal, currentDayWakeUpTimeWithOffset) проверяет, находится ли время уведомления строго до времени пробуждения. Если время уведомления равно времени пробуждения, мы хотим, чтобы уведомление было отправлено в это время, а не откладывалось до следующего дня.
//   if (isBefore(notificationTimeLocal, currentDayWakeUpTimeWithOffset)) {
//     return currentDayWakeUpTimeWithOffset;
//   }

//   // С другой стороны, условие isAfter(notificationTimeLocal, currentDayFallAsleepTimeWithOffset) || isEqual(notificationTimeLocal, currentDayFallAsleepTimeWithOffset) проверяет, находится ли время уведомления после или равно времени засыпания. Если время уведомления равно времени засыпания, мы хотим отложить уведомление до следующего дня, чтобы не беспокоить пользователя во время сна.
//   if (
//     isAfter(notificationTimeLocal, currentDayFallAsleepTimeWithOffset) ||
//     isEqual(notificationTimeLocal, currentDayFallAsleepTimeWithOffset)
//   ) {
//     return nextDayWakeUpTimeWithOffset;
//   }

//   return notificationTimeLocal;
// }

// private getSleepTimes(
//   notificationTimeLocal: Date,
//   timeSleepSettings: TimeSleepSettings,
//   currentDayOfWeek: DaysOfWeek,
//   nextDayOfWeek: DaysOfWeek,
// ): {
//   currentDayWakeUpTime: Date;
//   currentDayFallAsleepTime: Date;
//   nextDayWakeUpTime: Date;
// } {
//   const {
//     currentDayWakeUpObject,
//     currentDayFallAsleepObject,
//     nextDayWakeUpObject,
//   } = this.getSleepObjects(
//     timeSleepSettings,
//     currentDayOfWeek,
//     nextDayOfWeek,
//   );

//   const currentDayWakeUpTime = this.setTimeOnDate(
//     notificationTimeLocal,
//     currentDayWakeUpObject,
//   );
//   const currentDayFallAsleepTime = this.setTimeOnDate(
//     notificationTimeLocal,
//     currentDayFallAsleepObject,
//   );
//   const nextDayWakeUpTime = this.setTimeOnDate(
//     this.getNextDay(notificationTimeLocal),
//     nextDayWakeUpObject,
//   );

//   return {
//     currentDayWakeUpTime,
//     currentDayFallAsleepTime,
//     nextDayWakeUpTime,
//   };
// }

// private getSleepObjects(
//   timeSleepSettings: TimeSleepSettings,
//   currentDayOfWeek: DaysOfWeek,
//   nextDayOfWeek: DaysOfWeek,
// ): {
//   currentDayWakeUpObject: TimeSleepAtomicDataObject;
//   currentDayFallAsleepObject: TimeSleepAtomicDataObject;
//   nextDayWakeUpObject: TimeSleepAtomicDataObject;
// } {
//   if (
//     timeSleepSettings.isDayByDayOptionEnabled &&
//     timeSleepSettings.dayByDayTimeSleepData
//   ) {
//     return {
//       currentDayWakeUpObject:
//         timeSleepSettings.dayByDayTimeSleepData[currentDayOfWeek].up,
//       currentDayFallAsleepObject:
//         timeSleepSettings.dayByDayTimeSleepData[currentDayOfWeek].down,
//       nextDayWakeUpObject:
//         timeSleepSettings.dayByDayTimeSleepData[nextDayOfWeek].up,
//     };
//   }

//   return {
//     currentDayWakeUpObject: timeSleepSettings.generalTimeSleepData.up,
//     currentDayFallAsleepObject: timeSleepSettings.generalTimeSleepData.down,
//     nextDayWakeUpObject: timeSleepSettings.generalTimeSleepData.up,
//   };
// }

// private setTimeOnDate(
//   date: Date,
//   timeObject: TimeSleepAtomicDataObject,
// ): Date {
//   const newDate = new Date(date);
//   newDate.setHours(timeObject.hours, timeObject.minutes);
//   return newDate;
// }

// private getNextDay(date: Date): Date {
//   const newDate = new Date(date);
//   newDate.setDate(newDate.getDate() + 1);
//   return newDate;
// }

// private isNotificationBeforeWakeUpTime(
//   notificationTimeLocal: Date,
//   currentDayWakeUpTime: Date,
// ): boolean {
//   return notificationTimeLocal < currentDayWakeUpTime;
// }

// private isNotificationAfterFallAsleepTime(
//   notificationTimeLocal: Date,
//   currentDayFallAsleepTime: Date,
// ): boolean {
//   return notificationTimeLocal >= currentDayFallAsleepTime;
// }

// correctNotificationTimeForSleep(
//   notificationTimeUTC: Date,
//   timeSleepSettings: TimeSleepSettings,
//   timeZone: string,
//   beforeSleepMinutes = 30,
//   afterSleepMinutes = 30,
// ): Date {
//   if (!timeSleepSettings.isTimeSleepEnabled) {
//     return notificationTimeUTC;
//   }

//   const notificationTimeLocal = utcToZonedTime(notificationTimeUTC, timeZone);
//   const adjustedNotificationTimeLocal = this.getNotificationTimeAdjusted(
//     notificationTimeLocal,
//     timeSleepSettings,
//     beforeSleepMinutes,
//     afterSleepMinutes,
//   );
//   const adjustedNotificationTimeUTC = zonedTimeToUtc(
//     adjustedNotificationTimeLocal,
//     timeZone,
//   );

//   return adjustedNotificationTimeUTC;
// }

//
//
//
//
//
//
//
// isNotificationTimeWithinSleepInterval(
//   notificationTimeLocal: Date,
//   sleepInterval: { start: Date; end: Date },
// ): boolean {
//   return isWithinInterval(notificationTimeLocal, {
//     start: sleepInterval.start,
//     end: sleepInterval.end,
//   });
// }

// correctNotificationTimeForSleep(
//   notificationTimeUTC: Date,
//   timeSleepSettings: TimeSleepSettings,
//   timeZone: string,
//   beforeSleepMinutes = 30,
//   afterSleepMinutes = 30,
// ): Date {
//   // ...

//   const sleepInterval = this.getSleepInterval(
//     notificationTimeLocal,
//     timeSleepSettings,
//   );
//   const adjustedSleepInterval = this.adjustSleepIntervalForNotificationTime(
//     notificationTimeLocal,
//     sleepInterval,
//   );
//   const finalSleepInterval = this.adjustSleepInterval(
//     adjustedSleepInterval,
//     beforeSleepMinutes,
//     afterSleepMinutes,
//   );

//   if (
//     this.isNotificationTimeWithinSleepInterval(
//     )
//   ) {
//     return zonedTimeToUtc(finalSleepInterval.end, timeZone);
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { Card } from '@prisma/client';
// import { PrismaService } from 'nestjs-prisma';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { CardIncUser } from '@/cards/entities/card.entity';

// @Injectable()
// export class NotificationService {
//   constructor(private readonly prisma: PrismaService) {}

//   @Cron('*/10 * * * * *')
//   async handleCronTest() {
//     const cards = await this.prisma.card.findMany({
//       where: { isDeleted: false, nextTraining: { not: null } },
//       include: { user: true },
//       orderBy: { nextTraining: 'asc' },
//     });
//     console.log(cards.map((card) => card.nextTraining));
//   }
//   // когда пользователь присылает ответ после тренировки, то я обновляю карточку и ставлю nextTraining, далее я беру первые N карточек orderBy: { nextTraining: 'asc' }, у которых nextTraining != null и ставлю задачу на отправку уведомления через столько времени, сколько между сейчас и nextTraining последей карточки.

//   // @Cron('* * * * *')
//   @Cron('*/15 * * * *')
//   async handleCron() {
//     const pageLimit = 1000;
//     let currentPage = 0;
//     let hasMore = true;
//     const userCardsMap = new Map<string, CardIncUser[]>();

//     while (hasMore) {
//       const cards = await this.prisma.card.findMany({
//         where: { nextTraining: { lt: new Date() }, isDeleted: false },
//         include: { user: true },
//         skip: currentPage * pageLimit,
//         take: pageLimit,
//       });

//       cards.forEach((card) => {
//         const userCards = userCardsMap.get(card.userId) || [];
//         userCards.push(card);
//         userCardsMap.set(card.userId, userCards);
//       });

//       hasMore = cards.length === pageLimit;
//       currentPage++;
//     }

//     for (const [userId, userCards] of userCardsMap) {
//       if (userCards.length >= 10) {
//         const user = userCards[0].user;
//         if (user && user.email) {
//           const ts = Date.now();
//           const date_ob = new Date(ts);
//           const hours = date_ob.getHours();
//           const minutes = date_ob.getMinutes();
//           const seconds = date_ob.getSeconds();
//           console.log(
//             `${hours}:${minutes}:${seconds}  `,
//             user.email,
//             userCards.length,
//           );
//           await this.sendNotification(user.email, userCards.length);
//         }
//       }
//     }
//   }

//   private async sendNotification(email: string, cardsCount: number) {
//     // Логика отправки уведомления
//   }
// }

// import { Injectable, Logger } from '@nestjs/common';
// import { PrismaService } from 'nestjs-prisma';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { CardIncUser } from '@/cards/entities/card.entity';
// // const dateTime = new Date();
// // dateTime.setSeconds(dateTime.getSeconds() + data.seconds ?? 0);
// import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
// import { SettingsService } from '@/settings/settings.service';
// import { EVENT_NOTIFY_EMAIL } from '@/common/const/events';
// import { UserId } from '@/common/types/prisma-entities';
// // scheduleNotification(
// //   userId: UserId,
// //   data: { text: string; seconds: number },
// // ) {
// // Текущее время и время, когда должен выполниться колбек
// // console.log(`${this.formatTime(dateTime)} - date time`);
// // console.log(`${this.formatTime(now)} - сейчас`);
// //   // когда пользователь присылает ответ после тренировки, то я обновляю карточку и ставлю nextTraining, далее я беру первые N карточек orderBy: { nextTraining: 'asc' }, у которых nextTraining != null и ставлю задачу на отправку уведомления через столько времени, сколько между сейчас и nextTraining последей карточки.
// @Injectable()
// export class NotificationService {
//   private logger = new Logger(NotificationService.name);
//   private timers = new Map<string, NodeJS.Timeout>();

//   constructor(
//     private eventEmitter: EventEmitter2,
//     private readonly settingsService: SettingsService,
//   ) {}

//   scheduleNotification(userId: UserId, dateTime: Date) {
//     this.logger.log(`schedule Notification - started.`);
//     const now = new Date();
//     const delay = dateTime.getTime() - now.getTime();
//     this.logger.log(`delay - ${delay}`);
//     // Планирование колбека
//     const timerId = setTimeout(() => {
//       // Время фактического выполнения колбека
//       const callbackTime = new Date();
//       this.logger.log(`${dateTime} - должен отработать`);
//       this.logger.log(`${callbackTime} - отрабатывает сейчас`);
//       this.logger.log(`${this.formatTime(dateTime)} - должен отработать`);
//       this.logger.log(`${this.formatTime(callbackTime)} - отрабатывает сейчас`);

//       this.eventEmitter.emit(EVENT_NOTIFY_EMAIL, userId);
//     }, delay);

//     // Сохранение идентификатора таймера для возможной отмены
//     this.timers.set(userId, timerId);
//     this.logger.log(`schedule Notification - ended.`);
//   }

//   cancelNotification(userId: UserId) {
//     const timerId = this.timers.get(userId);
//     if (timerId) {
//       clearTimeout(timerId);
//       this.timers.delete(userId);
//       this.logger.log(`Notification for user ${userId} has been cancelled.`);
//     }
//   }

//   rescheduleNotification(userId: UserId, newDateTime: Date) {
//     this.logger.log(`reschedule Notification for user ${userId} - started.`);
//     this.cancelNotification(userId);
//     this.scheduleNotification(userId, newDateTime);
//     this.logger.log(`reschedule Notification for user ${userId} - ended.`);
//   }

//   @OnEvent(EVENT_NOTIFY_EMAIL)
//   handleNotifyEvent(userId: UserId) {
//     this.sendNotification(userId);
//     this.timers.delete(userId); // Удалить таймер после отправки уведомления
//   }

//   sendNotification(userId: UserId) {
//     // Логика отправки уведомления
//     this.logger.log(`Sending notification to user ${userId}`);
//   }

//   getNotificationSettings(userId: UserId) {
//     return this.settingsService.getNotificationSettings(userId);
//   }

//   // Вспомогательная функция для форматирования времени
//   formatTime(date: Date) {
//     const hours = this.padTime(date.getHours());
//     const minutes = this.padTime(date.getMinutes());
//     const seconds = this.padTime(date.getSeconds());
//     return `${hours}:${minutes}:${seconds}`;
//   }

//   // Дополнительная функция для добавления ведущих нулей
//   padTime(time: number) {
//     return time.toString().padStart(2, '0');
//   }
// }
// // import { Injectable } from '@nestjs/common';
// // import { Card } from '@prisma/client';
// // import { PrismaService } from 'nestjs-prisma';
// // import { Cron, CronExpression } from '@nestjs/schedule';
// // import { CardIncUser } from '@/cards/entities/card.entity';

// // @Injectable()
// // export class NotificationService {
// //   constructor(private readonly prisma: PrismaService) {}

// //   @Cron('*/10 * * * * *')
// //   async handleCronTest() {
// //     const cards = await this.prisma.card.findMany({
// //       where: { isDeleted: false, nextTraining: { not: null } },
// //       include: { user: true },
// //       orderBy: { nextTraining: 'asc' },
// //     });
// //     console.log(cards.map((card) => card.nextTraining));
// //   }
// //   // когда пользователь присылает ответ после тренировки, то я обновляю карточку и ставлю nextTraining, далее я беру первые N карточек orderBy: { nextTraining: 'asc' }, у которых nextTraining != null и ставлю задачу на отправку уведомления через столько времени, сколько между сейчас и nextTraining последей карточки.

// //   // @Cron('* * * * *')
// //   @Cron('*/15 * * * *')
// //   async handleCron() {
// //     const pageLimit = 1000;
// //     let currentPage = 0;
// //     let hasMore = true;
// //     const userCardsMap = new Map<string, CardIncUser[]>();

// //     while (hasMore) {
// //       const cards = await this.prisma.card.findMany({
// //         where: { nextTraining: { lt: new Date() }, isDeleted: false },
// //         include: { user: true },
// //         skip: currentPage * pageLimit,
// //         take: pageLimit,
// //       });

// //       cards.forEach((card) => {
// //         const userCards = userCardsMap.get(card.userId) || [];
// //         userCards.push(card);
// //         userCardsMap.set(card.userId, userCards);
// //       });

// //       hasMore = cards.length === pageLimit;
// //       currentPage++;
// //     }

// //     for (const [userId, userCards] of userCardsMap) {
// //       if (userCards.length >= 10) {
// //         const user = userCards[0].user;
// //         if (user && user.email) {
// //           const ts = Date.now();
// //           const date_ob = new Date(ts);
// //           const hours = date_ob.getHours();
// //           const minutes = date_ob.getMinutes();
// //           const seconds = date_ob.getSeconds();
// //           console.log(
// //             `${hours}:${minutes}:${seconds}  `,
// //             user.email,
// //             userCards.length,
// //           );
// //           await this.sendNotification(user.email, userCards.length);
// //         }
// //       }
// //     }
// //   }

// //   private async sendNotification(email: string, cardsCount: number) {
// //     // Логика отправки уведомления
// //   }
// // }
