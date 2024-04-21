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
import { RedisService } from '@/redis/redis.service';
import { cacheOrFetchData } from '@/utils/helpers/cache-or-fetch';
import { PrismaService } from 'nestjs-prisma';
import { PushTrainingNotification, UserNotificationData } from './types/types';
import { TrainingNotificationItem } from './types/types';
import {
  PushDataFromServerless,
  ResponseDTO,
} from './dto/notifications-from-aws.dto';
import { appendTimeToFile } from '@/utils/helpers/append-data-to-file';
import * as cron from 'node-cron';
import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';
import { ServerLessService } from '@/server-less/server-less.service';
import { start } from 'repl';
import { sleep } from '@/utils/common/sleep';
import {
  SEND_EMAIL_NOTIFICATION_AFTER,
  SEND_PUSH_NOTIFICATION_AFTER,
} from '@/common/const/notification-data';

type NotificationPromise = Promise<TrainingNotificationItem | null | undefined>;

@Injectable()
export class NotificationDataProcessorService implements OnModuleInit {
  private logger = new Logger(NotificationDataProcessorService.name);
  private nodeEnv: string;
  private xApiKey: string;
  constructor(
    private readonly settingsService: SettingsService,
    private readonly serverless: ServerLessService,
    // private readonly awsDynamo: DynamoDbService,
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
    // private readonly httpService: HttpService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    // this.startCronJob();
  }
  onModuleInit() {
    this.nodeEnv = this.configService.getOrThrow('app.nodeEnv', {
      infer: true,
    });
    this.xApiKey = this.configService.getOrThrow<string>(
      'SERVERLESS_X_API_KEY',
      {
        infer: true,
      },
    );
  }

  // startCronJob() {
  //   cron.schedule('*/2 * * * *', async () => {
  //     this.logger.log('Running a job at 2-minute intervals');
  //     await this.serverless.sendAllEmailNotifications();
  //   });
  // }

  async rescheduleEmailNotification(userId: UserId, notificationTime: Date) {
    this.logger.log(`reschedule Notification for user ${userId} - started.`);
    const notificationItem = await this.createEmailNotificationItem(
      userId,
      notificationTime,
    );

    const lastNotificationItem =
      await this.prisma.notificationHistory.findFirst({
        where: { userId },
      });

    if (lastNotificationItem) {
      // если время не изменилось, то ничего не нужно делать
      if (isEqual(lastNotificationItem.notificationTime, notificationTime)) {
        this.logger.log(`no need to update notification ${userId} - ended.`);
        return;
      }
      void this.serverless.addOrUpdateEmailTrainingNotification(
        notificationItem,
      );
      // void this.serverless.replaceTrainingNotification(
      //   notificationItem,
      //   lastNotificationItem.notificationTime,
      // );
    } else {
      void this.serverless.addOrUpdateEmailTrainingNotification(
        notificationItem,
      );
    }

    await this.prisma.notificationHistory.upsert({
      where: { userId },
      update: { notificationTime },
      create: { userId, notificationTime },
    });

    this.logger.log(`reschedule Notification for user ${userId} - ended.`);
  }

  async getUserNotificationData(userId: UserId): Promise<UserNotificationData> {
    const getUserDataFn = async (userId: UserId) => {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, language: true, firstName: true },
      });
      // FIXME: использовать мейл указанный в настройках уведомлений
      if (!user || user.email === null) {
        throw new Error('User not found or missing required fields');
      }
      return {
        email: user.email,
        language: user.language ?? 'en',
        name: user.firstName ?? 'user_name',
      };
    };
    const userData = await getUserDataFn(userId);
    // const userData = await cacheOrFetchData<UserNotificationData>(
    //   userId,
    //   this.redisService.getUserNotificationData.bind(this.redisService),
    //   getUserDataFn,
    //   this.redisService.saveUserNotificationData.bind(this.redisService),
    // );

    return userData;
  }

  async recalculateEmailNotificationsAfterServerless(
    data: ResponseDTO[],
    apiKey: string,
  ) {
    if (apiKey !== this.xApiKey) {
      throw new Error('Invalid apiKey');
    }
    const start = performance.now();
    for (const item of data) {
      if (item.success && item.response) {
        await this.processServerlessEmailLanguageResponse(
          item.notificationIds,
          true,
        );
      } else if (!item.success) {
        await this.processServerlessEmailLanguageResponse(
          item.notificationIds,
          false,
        );
      }
    }
    const end = performance.now();
    // appendTimeToFile('./recalculateNotification.txt', end - start);
    this.logger.debug(`recalculateNotification time: ${end - start} ms`);
  }

  async processServerlessEmailLanguageResponse(
    userIdList: UserId[],
    notificationsSendSuccessfully: boolean,
  ) {
    if (userIdList.length === 0) {
      return;
    }
    try {
      const notificationItemPromises: NotificationPromise[] = userIdList.map(
        (id) =>
          this.getNotificationEmailItemAfterServerless(
            id,
            notificationsSendSuccessfully,
          ),
      );

      const notificationItems = await Promise.all(notificationItemPromises);
      const notificationItemsFiltered = notificationItems.filter(
        Boolean,
      ) as TrainingNotificationItem[];

      await this.serverless.addOrUpdateEmailTrainingNotificationList([
        ...notificationItemsFiltered,
      ]);

      const notificationUpdatesJson = notificationItemsFiltered.map((item) =>
        JSON.stringify({
          userId: item.notificationId,
          notificationTime: item.notificationTime,
        }),
      );
      const query = `SELECT update_or_insert_notification_history($1::jsonb[])`;
      await this.prisma.$executeRawUnsafe(query, notificationUpdatesJson);
    } catch (error) {
      this.logger.error('Ошибка при обновлении уведомлений:', error);
    }
  }

  async getNotificationEmailItemAfterServerless(
    userId: UserId,
    notificationsSendSuccessfully: boolean,
  ) {
    // userId
    // настройки уведомлений
    try {
      const notificationSettings = await this.getNotificationSettings(userId);
      this.logger.log(notificationSettings);
      if (
        !notificationSettings ||
        !notificationSettings.emailNotificationsEnabled
      ) {
        return null;
      }

      const minimumCards =
        notificationSettings.minimumCardsForEmailNotification;

      const cards = (await this.prisma.card.findMany({
        where: {
          userId,
          isDeleted: false,
          nextTraining: { not: null },
          shelf: {
            notificationEnabled: { not: false },
            isDeleted: false,
          },
        },
        select: { nextTraining: true },
        orderBy: { nextTraining: 'asc' },
        take: minimumCards,
      })) as { nextTraining: Date }[];

      // если карточек меньше чем минимальное количество, то уведомления не нужно отправлять
      if (cards.length < minimumCards) return null;
      const notificationTime = new Date(cards[minimumCards - 1].nextTraining);

      if (!notificationTime) {
        // this.logger.log('notificationTime is null');
        return null;
      }

      const now = new Date();
      let nextNotificationTime;
      if (isBefore(notificationTime, now)) {
        nextNotificationTime = now;
      } else {
        nextNotificationTime = notificationTime;
      }

      // this.logger.debug('nextNotificationTime ', nextNotificationTime);
      if (notificationsSendSuccessfully) {
        nextNotificationTime = addHours(
          nextNotificationTime,
          SEND_EMAIL_NOTIFICATION_AFTER,
        );
      }
      // this.logger.debug('nextNotificationTime ', nextNotificationTime);

      const timeSleepSettings = await this.getTimeSleepSettings(userId);
      // this.logger.debug('timeSleepSettings ');

      // this.logger.debug(JSON.stringify(timeSleepSettings, null, 2));

      // this.logger.debug('timeSleepSettings ');
      if (!timeSleepSettings || !timeSleepSettings.isTimeSleepEnabled) {
        return await this.createEmailNotificationItem(
          userId,
          nextNotificationTime,
        );
      }

      const timezone = (await this.prisma.user.findUnique({
        where: { id: userId },
        select: { timezone: true },
      }))!.timezone!;

      // this.logger.debug('timezone  ', timezone);

      const correctedTime = this.correctNotificationTimeForSleepUTC(
        nextNotificationTime,
        timeSleepSettings,
        timezone,
      );
      // this.logger.debug(JSON.stringify(correctedTime, null, 3));
      this.logger.debug('correctedTime  ', correctedTime);
      return await this.createEmailNotificationItem(userId, correctedTime);
    } catch (error) {
      this.logger.error('Ошибка при обновлении уведомлений:', error);
    }
  }

  async createEmailNotificationItem(userId: UserId, notificationTime: Date) {
    // this.logger.log(`reschedule Notification for user ${userId} - started.`);
    const userData = await this.getUserNotificationData(userId);
    const notificationItem: TrainingNotificationItem = {
      notificationId: userId,
      // notificationTime: '2024-04-10T00:10:00.000Z',
      notificationTime: notificationTime.toISOString(),
      name: userData.name,
      notificationType: 'trainingNotification',
      user_language: userData.language,
      email: userData.email,
    };
    // this.logger.log(`userData: ${JSON.stringify(userData)}`);
    // this.logger.log(
    //   `notificationItem: ${JSON.stringify(notificationItem, null, 2)}`,
    // );
    return notificationItem;
    // нужно обновить данные на AWS
  }

  // ----
  // ----
  // ----
  // ----
  // ----

  async recalculateAll() {
    const users = await this.prisma.user.findMany({
      // where: { lastName: 'Doe', NOT: { email: 'yanagae@gmail.com' } },
    });
    const usersIds = users.map((user) => user.id);
    await this.processServerlessEmailLanguageResponse(usersIds, false);

    // const end = performance.now();

    // appendTimeToFile('./recalculateAll.txt', end - start);
    // this.logger.debug(`recalculateAll time: ${end - start} ms`);
    // this.logger.log('recalculateNotifications - ended');
  }

  getNotificationSettings(userId: UserId) {
    return this.settingsService.getNotificationSettings(userId);
  }

  getTimeSleepSettings(userId: UserId) {
    return this.settingsService.getTimeSleepSettings(userId);
  }

  // Основная функция корректировки времени уведомления
  getNotificationTimeAdjusted(
    notificationTimeLocal: Date,
    timeSleepSettings: TimeSleepSettings,
    beforeSleepMinutes = 0,
    afterSleepMinutes = 0,
    debug = false,
  ): Date {
    if (
      !timeSleepSettings.isTimeSleepEnabled ||
      !timeSleepSettings.generalSleepPeriod
    ) {
      return notificationTimeLocal;
    }

    if (timeSleepSettings.isDayByDayOptionEnabled) {
      return this.getNotificationTimeAdjustedForDayByDay(
        notificationTimeLocal,
        timeSleepSettings,
        beforeSleepMinutes,
        afterSleepMinutes,
        debug,
      );
    }

    return this.getNotificationTimeAdjustedForGeneralSleepPeriod(
      notificationTimeLocal,
      timeSleepSettings,
      beforeSleepMinutes,
      afterSleepMinutes,
      debug,
    );
  }

  getNotificationTimeAdjustedForDayByDay(
    notificationTimeLocal: Date,
    timeSleepSettings: TimeSleepSettings,
    beforeSleepMinutes = 0,
    afterSleepMinutes = 0,
    debug = false,
  ): Date {
    const notificationDayOfWeek = getCurrentDayOfWeek(notificationTimeLocal);
    const nextDayOfWeek = getNextDayOfWeek(notificationTimeLocal);
    const previousDayOfWeek = getPreviousDayOfWeek(notificationTimeLocal);
    const sleepPeriodsForCurrentDay =
      timeSleepSettings.dayByDaySleepPeriods?.[notificationDayOfWeek];
    const sleepPeriodsForPreviousDay =
      timeSleepSettings.dayByDaySleepPeriods?.[previousDayOfWeek];
    const sleepPeriodsForNextDay =
      timeSleepSettings.dayByDaySleepPeriods?.[nextDayOfWeek];

    console.log('previousDayOfWeek:  ', previousDayOfWeek);
    console.log('notificationDayOfWeek:   ', notificationDayOfWeek);
    console.log('nextDayOfWeek:   ', nextDayOfWeek);
    if (sleepPeriodsForCurrentDay?.length === 0) {
      // Если для текущего дня нет периода сна, то проверяем периоды сна для предыдущего дня
      return this.getNotificationTimeFromPreviousPeriod(
        sleepPeriodsForPreviousDay,
        notificationTimeLocal,
        beforeSleepMinutes,
        afterSleepMinutes,
      );
    } else {
      // в начале проверю периоды текущего дня, потом если потребуется последний пероид предыдущего дня
      const sortedSleepPeriods = sleepPeriodsForCurrentDay.sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      );

      for (const sleepPeriod of sortedSleepPeriods) {
        // const { startTime, durationMinutes } = sleepPeriod;
        // const [startHours, startMinutes] = startTime.split(':').map(Number);

        // let sleepStartTime = new Date(notificationTimeLocal);
        // sleepStartTime.setHours(startHours, startMinutes, 0, 0);
        // let sleepEndTime = addMinutes(sleepStartTime, durationMinutes);

        // sleepStartTime = subMinutes(sleepStartTime, beforeSleepMinutes);
        // sleepEndTime = addMinutes(sleepEndTime, afterSleepMinutes);

        const { isNotificationWithinSleepInterval, sleepEndTime } =
          getIsNotificationWithinSleepInterval({
            sleepPeriod,
            notificationTimeLocal,
            beforeSleepMinutes,
            afterSleepMinutes,
          });

        if (isNotificationWithinSleepInterval) {
          if (sortedSleepPeriods.length === 1) {
            return sleepEndTime;
          }
          // нужно провереть не пересекается с временем начала следующего периода сна
          const nextPeriod = sortedSleepPeriods[1];

          const {
            isNotificationWithinSleepInterval: isInNextInterval,
            sleepEndTime: nextSleepTime,
          } = getIsNotificationWithinSleepInterval({
            sleepPeriod: nextPeriod,
            notificationTimeLocal,
            beforeSleepMinutes,
            afterSleepMinutes,
          });
          if (isInNextInterval) {
            return nextSleepTime;
          }
          return sleepEndTime;
        }
      }
      return this.getNotificationTimeFromPreviousPeriod(
        sleepPeriodsForPreviousDay,
        notificationTimeLocal,
        beforeSleepMinutes,
        afterSleepMinutes,
      );
    }
  }

  getNotificationTimeFromPreviousPeriod(
    sleepPeriodsForPreviousDay: SleepPeriod[],
    notificationTimeLocal: Date,
    beforeSleepMinutes: number,
    afterSleepMinutes: number,
  ) {
    if (sleepPeriodsForPreviousDay.length === 0) {
      return notificationTimeLocal;
    }
    const sortedSleepPeriods = sleepPeriodsForPreviousDay.sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    );
    const lastPeriod = sortedSleepPeriods[sortedSleepPeriods.length - 1];
    const { startTime, durationMinutes } = lastPeriod;
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    let sleepStartTime = subDays(notificationTimeLocal, 1);
    sleepStartTime.setHours(startHours, startMinutes, 0, 0);
    let sleepEndTime = addMinutes(sleepStartTime, durationMinutes);
    // if (debug) {
    //   console.log('notificationTimeLocal:', notificationTimeLocal);
    //   console.log('sleepStartTime:', sleepStartTime);
    //   console.log('sleepEndTime:', sleepEndTime);
    // }
    sleepStartTime = subMinutes(sleepStartTime, beforeSleepMinutes);
    sleepEndTime = addMinutes(sleepEndTime, afterSleepMinutes);
    if (isBefore(notificationTimeLocal, sleepEndTime)) {
      return sleepEndTime;
    } else {
      return notificationTimeLocal;
    }
  }
  getNotificationTimeAdjustedForGeneralSleepPeriod(
    notificationTimeLocal: Date,
    timeSleepSettings: TimeSleepSettings,
    beforeSleepMinutes = 0,
    afterSleepMinutes = 0,
    debug = false,
  ): Date {
    const { startTime, durationMinutes } = timeSleepSettings.generalSleepPeriod;
    const [startHours, startMinutes] = startTime.split(':').map(Number);

    // Создаем объекты даты для начала и конца сна
    let sleepStartTime = new Date(notificationTimeLocal);
    sleepStartTime.setHours(startHours, startMinutes, 0, 0);
    let sleepEndTime = addMinutes(sleepStartTime, durationMinutes);
    if (debug) {
      console.log('notificationTimeLocal:', notificationTimeLocal);
      console.log('sleepStartTime:', sleepStartTime);
      console.log('sleepEndTime:', sleepEndTime);
    }
    sleepStartTime = subMinutes(sleepStartTime, beforeSleepMinutes);
    sleepEndTime = addMinutes(sleepEndTime, afterSleepMinutes);
    if (debug) {
      console.log('sleepStartTime after correction:', sleepStartTime);
      console.log('sleepEndTime after correction:', sleepEndTime);
    }
    // например, если период сна начинается в 01:00 и заканчивается в 8:00 - то true
    const isSleepStartEndSameDay = isSameDay(sleepStartTime, sleepEndTime);
    if (debug) {
      console.log('isSleepStartEndSameDay: ', isSleepStartEndSameDay);
    }

    if (isSleepStartEndSameDay) {
      const isNotificationWithinSleepInterval = isWithinInterval(
        notificationTimeLocal,
        {
          start: sleepStartTime,
          end: sleepEndTime,
        },
      );
      const isNotificationBeforeSleepInterval = isBefore(
        notificationTimeLocal,
        sleepStartTime,
      );
      if (isNotificationWithinSleepInterval) {
        return sleepEndTime;
      }
      if (isNotificationBeforeSleepInterval) {
        if (isSameDay(notificationTimeLocal, sleepStartTime)) {
          return notificationTimeLocal;
        } else {
          return sleepStartTime;
        }
      }
      return notificationTimeLocal;
    }
    if (!isSleepStartEndSameDay) {
      const endSleepCurrentDay = subDays(sleepEndTime, 1);
      const isNotificationWithinWakeUpInterval = isWithinInterval(
        notificationTimeLocal,
        {
          start: endSleepCurrentDay,
          end: sleepStartTime,
        },
      );
      const isNotificationBeforeSleepInterval = isBefore(
        notificationTimeLocal,
        endSleepCurrentDay,
      );
      const isNotificationAtSleepStartTime = isEqual(
        notificationTimeLocal,
        sleepStartTime,
      );
      if (debug) {
        console.log('endSleepCurrentDay:  ', endSleepCurrentDay);
        console.log(
          'notificationBeforeSleepInterval: ',
          isNotificationBeforeSleepInterval,
        );
        console.log(
          'isNotificationAtSleepStartTime:  ',
          isNotificationAtSleepStartTime,
        );
      }
      if (isNotificationWithinWakeUpInterval) {
        if (isNotificationAtSleepStartTime) {
          return sleepEndTime;
        }
      }
      if (isNotificationBeforeSleepInterval) {
        return endSleepCurrentDay;
      }
      if (isAfter(notificationTimeLocal, sleepStartTime)) {
        return sleepEndTime;
      }
      if (isAfter(notificationTimeLocal, sleepEndTime)) {
        return addDays(sleepEndTime, 1);
      }
    }
    return notificationTimeLocal;
  }
  correctNotificationTimeForSleep(
    notificationTimeUTC: Date,
    timeSleepSettings: TimeSleepSettings,
    timeZone: string,
    beforeSleepMinutes = 30,
    afterSleepMinutes = 30,
  ): Date {
    if (!timeSleepSettings.isTimeSleepEnabled) {
      return utcToZonedTime(notificationTimeUTC, timeZone); // Возвращаем локальное время
    }

    const notificationTimeLocal = utcToZonedTime(notificationTimeUTC, timeZone);
    const adjustedNotificationTimeLocal = this.getNotificationTimeAdjusted(
      notificationTimeLocal,
      timeSleepSettings,
      beforeSleepMinutes,
      afterSleepMinutes,
    );

    return adjustedNotificationTimeLocal; // Возвращаем локальное время
  }

  correctNotificationTimeForSleepUTC(
    notificationTimeUTC: Date,
    timeSleepSettings: TimeSleepSettings,
    timeZone: string,
    beforeSleepMinutes = 30,
    afterSleepMinutes = 30,
  ): Date {
    const timeLocalCorrected = this.correctNotificationTimeForSleep(
      notificationTimeUTC,
      timeSleepSettings,
      timeZone,
      beforeSleepMinutes,
      afterSleepMinutes,
    );
    return zonedTimeToUtc(timeLocalCorrected, timeZone);
  }

  // push
  // push
  // push
  // push
  // push
  // push

  async getPushNotificationItemAfterServerless(userId: UserId) {
    // userId
    // настройки уведомлений
    try {
      const notificationSettings = await this.getNotificationSettings(userId);
      // this.logger.log(notificationSettings);
      if (!notificationSettings || !notificationSettings.mobilePushEnabled) {
        return null;
      }

      const minimumCards = notificationSettings.minimumCardsForPush;

      const cards = (await this.prisma.card.findMany({
        where: {
          userId,
          isDeleted: false,
          nextTraining: { not: null },
          shelf: {
            notificationEnabled: { not: false },
            isDeleted: false,
          },
        },
        select: { nextTraining: true },
        orderBy: { nextTraining: 'asc' },
        take: minimumCards,
      })) as { nextTraining: Date }[];

      // если карточек меньше чем минимальное количество, то уведомления не нужно отправлять
      if (cards.length < minimumCards) return null;
      const notificationTime = new Date(cards[minimumCards - 1].nextTraining);

      if (!notificationTime) {
        // this.logger.log('notificationTime is null');
        return null;
      }

      const now = new Date();
      let nextNotificationTime;
      if (isBefore(notificationTime, now)) {
        nextNotificationTime = now;
      } else {
        nextNotificationTime = notificationTime;
      }

      // this.logger.debug('nextNotificationTime ', nextNotificationTime);
      nextNotificationTime = addHours(
        nextNotificationTime,
        SEND_PUSH_NOTIFICATION_AFTER,
      );
      // this.logger.debug('nextNotificationTime ', nextNotificationTime);

      const timeSleepSettings = await this.getTimeSleepSettings(userId);
      // this.logger.debug('timeSleepSettings ');

      // this.logger.debug(JSON.stringify(timeSleepSettings, null, 2));

      // this.logger.debug('timeSleepSettings ');
      if (!timeSleepSettings || !timeSleepSettings.isTimeSleepEnabled) {
        return await this.createPushNotificationItem(
          userId,
          nextNotificationTime,
        );
      }

      const timezone = (await this.prisma.user.findUnique({
        where: { id: userId },
        select: { timezone: true },
      }))!.timezone!;

      // this.logger.debug('timezone  ', timezone);

      const correctedTime = this.correctNotificationTimeForSleepUTC(
        nextNotificationTime,
        timeSleepSettings,
        timezone,
      );
      // this.logger.debug(JSON.stringify(correctedTime, null, 3));
      this.logger.debug('correctedTime  ', correctedTime);
      return await this.createPushNotificationItem(userId, correctedTime);
    } catch (error) {
      this.logger.error('Ошибка при обновлении уведомлений:', error);
    }
  }

  async reschedulePushNotification(userId: UserId, notificationTime: Date) {
    this.logger.log(`reschedule Notification for user ${userId} - started.`);
    const notificationItem = await this.createPushNotificationItem(
      userId,
      notificationTime,
    );
    void this.serverless.addOrUpdatePushTrainingNotification(notificationItem);
    // const lastNotificationItem =
    //   await this.prisma.notificationHistory.findFirst({
    //     where: { userId },
    //   });
    // // const lastNotificationItem =
    // //   await this.prisma.notificationHistory.findFirst({
    // //     where: { userId },
    // //   });

    // if (lastNotificationItem) {
    //   // если время не изменилось, то ничего не нужно делать
    //   if (isEqual(lastNotificationItem.notificationTime, notificationTime)) {
    //     this.logger.log(`no need to update notification ${userId} - ended.`);
    //     return;
    //   }
    //   void this.serverless.addOrUpdatePushTrainingNotification(
    //     notificationItem,
    //   );
    // } else {
    //   void this.serverless.addOrUpdatePushTrainingNotification(
    //     notificationItem,
    //   );
    // }

    // await this.prisma.notificationHistory.upsert({
    //   where: { userId },
    //   update: { notificationTime },
    //   create: { userId, notificationTime },
    // });
    // await this.prisma.notificationHistory.upsert({
    //   where: { userId },
    //   update: { notificationTime },
    //   create: { userId, notificationTime },
    // });

    this.logger.log(`reschedule Notification for user ${userId} - ended.`);
  }

  async createPushNotificationItem(userId: UserId, notificationTime: Date) {
    const userData = await this.getUserNotificationData(userId);
    const notificationItem: PushTrainingNotification = {
      notificationId: userId,
      notificationTime: notificationTime.toISOString(),
      // name: userData.name,
      user_language: userData.language,
    };
    return notificationItem;
  }

  async recalculatePushNotificationsAfterServerless(
    data: PushDataFromServerless,
    apiKey: string,
  ) {
    if (apiKey !== this.xApiKey) {
      throw new Error('Invalid apiKey');
    }
    await sleep(1);
    // + - +
    // const pushForRu = [1, 2, 3];
    // sendPush(pushForRu);

    // const start = performance.now();
    // for (const item of data) {
    //   if (item.success && item.response) {
    //     await this.processServerlessEmailLanguageResponse(
    //       item.notificationIds,
    //       true,
    //     );
    //   } else if (!item.success) {
    //     await this.processServerlessEmailLanguageResponse(
    //       item.notificationIds,
    //       false,
    //     );
    //   }
    // }
    // const end = performance.now();
    // // appendTimeToFile('./recalculateNotification.txt', end - start);
    // this.logger.debug(`recalculateNotification time: ${end - start} ms`);
  }

  // async processServerlessPushLanguageResponse(
  //   userIdList: UserId[],
  //   notificationsSendSuccessfully: boolean,
  // ) {
  //   try {
  //     const notificationItemPromises: NotificationPromise[] = userIdList.map(
  //       (id) =>
  //         this.getNotificationEmailItemAfterServerless(
  //           id,
  //           notificationsSendSuccessfully,
  //         ),
  //     );

  //     const notificationItems = await Promise.all(notificationItemPromises);
  //     const notificationItemsFiltered = notificationItems.filter(
  //       Boolean,
  //     ) as TrainingNotificationItem[];

  //     await this.serverless.addOrUpdateEmailTrainingNotificationList([
  //       ...notificationItemsFiltered,
  //     ]);

  //     const notificationUpdatesJson = notificationItemsFiltered.map((item) =>
  //       JSON.stringify({
  //         userId: item.notificationId,
  //         notificationTime: item.notificationTime,
  //       }),
  //     );
  //     const query = `SELECT update_or_insert_notification_history($1::jsonb[])`;
  //     await this.prisma.$executeRawUnsafe(query, notificationUpdatesJson);
  //   } catch (error) {
  //     this.logger.error('Ошибка при обновлении уведомлений:', error);
  //   }
  // }

  // async getNotificationPushItemAfterServerless(
  //   userId: UserId,
  //   notificationsSendSuccessfully: boolean,
  // ) {
  //   // userId
  //   // настройки уведомлений
  //   try {
  //     const notificationSettings = await this.getNotificationSettings(userId);
  //     this.logger.log(notificationSettings);
  //     if (
  //       !notificationSettings ||
  //       !notificationSettings.emailNotificationsEnabled
  //     ) {
  //       return null;
  //     }

  //     const minimumCards =
  //       notificationSettings.minimumCardsForEmailNotification;

  //     const cards = (await this.prisma.card.findMany({
  //       where: {
  //         userId,
  //         isDeleted: false,
  //         nextTraining: { not: null },
  //         shelf: { notificationEnabled: { not: false } },
  //       },
  //       select: { nextTraining: true },
  //       orderBy: { nextTraining: 'desc' },
  //       take: minimumCards,
  //     })) as { nextTraining: Date }[];

  //     // если карточек меньше чем минимальное количество, то уведомления не нужно отправлять
  //     if (cards.length < minimumCards) return null;
  //     const notificationTime = new Date(cards[0].nextTraining);

  //     // this.logger.debug('notificationTime ', notificationTime);
  //     if (!notificationTime) {
  //       // this.logger.log('notificationTime is null');
  //       return null;
  //     }

  //     const now = new Date();
  //     let nextNotificationTime;
  //     if (isBefore(notificationTime, now)) {
  //       nextNotificationTime = now;
  //     } else {
  //       nextNotificationTime = notificationTime;
  //     }

  //     // this.logger.debug('nextNotificationTime ', nextNotificationTime);
  //     if (notificationsSendSuccessfully) {
  //       nextNotificationTime = addHours(nextNotificationTime, 4);
  //     }
  //     // this.logger.debug('nextNotificationTime ', nextNotificationTime);

  //     const timeSleepSettings = await this.getTimeSleepSettings(userId);
  //     // this.logger.debug('timeSleepSettings ');

  //     // this.logger.debug(JSON.stringify(timeSleepSettings, null, 2));

  //     // this.logger.debug('timeSleepSettings ');
  //     if (!timeSleepSettings || !timeSleepSettings.isTimeSleepEnabled) {
  //       return await this.createEmailNotificationItem(
  //         userId,
  //         nextNotificationTime,
  //       );
  //     }

  //     const timezone = (await this.prisma.user.findUnique({
  //       where: { id: userId },
  //       select: { timezone: true },
  //     }))!.timezone!;

  //     // this.logger.debug('timezone  ', timezone);

  //     const correctedTime = this.correctNotificationTimeForSleepUTC(
  //       nextNotificationTime,
  //       timeSleepSettings,
  //       timezone,
  //     );
  //     // this.logger.debug(JSON.stringify(correctedTime, null, 3));
  //     this.logger.debug('correctedTime  ', correctedTime);
  //     return await this.createEmailNotificationItem(userId, correctedTime);
  //   } catch (error) {
  //     this.logger.error('Ошибка при обновлении уведомлений:', error);
  //   }
  // }
}
