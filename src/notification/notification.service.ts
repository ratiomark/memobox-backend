import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EVENT_NOTIFY_EMAIL, EVENT_USER_CREATED } from '@/common/const/events';
import { UserId } from '@/common/types/prisma-entities';
import {
  TimeSleepSettings,
  // TimeSleepDataObject,
  DaysOfWeek,
  SleepPeriod,
  // TimeSleepAtomicDataObject,
} from '@/aggregate/entities/settings-types';
import { RedisService } from '@/redis/redis.service';
import { cacheOrFetchData } from '@/utils/helpers/cache-or-fetch';
import { PrismaService } from 'nestjs-prisma';
import { UserNotificationData } from './types/types';
import { ResponseDTO } from './dto/notifications-from-aws.dto';
import { appendTimeToFile } from '@/utils/helpers/append-data-to-file';
import * as cron from 'node-cron';
import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';
import { ServerLessService } from '@/server-less/server-less.service';
import { NotificationDataProcessorService } from './notification-data-processor.service';
import { sleep } from '@/utils/common/sleep';

@Injectable()
export class NotificationService implements OnModuleInit {
  private logger = new Logger(NotificationService.name);
  private nodeEnv: string;
  constructor(
    // private eventEmitter: EventEmitter2,
    private readonly notificationProcessor: NotificationDataProcessorService,
    private readonly serverless: ServerLessService,
    // private readonly awsDynamo: DynamoDbService,
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
    // private readonly httpService: HttpService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    this.startCronJob();
  }
  onModuleInit() {
    const nodeEnv = this.configService.getOrThrow('app.nodeEnv', {
      infer: true,
    });
    this.nodeEnv = nodeEnv;
  }

  startCronJob() {
    cron.schedule('*/1 * * * *', async () => {
      this.logger.log('Running a job at 2-minute intervals');
      await sleep(1);
      // await this.serverless.sendAllEmailNotifications();
      // await this.serverless.sendAllPushNotifications();
    });
  }

  async rescheduleEmailNotification(userId: UserId, notificationTime: Date) {
    await this.notificationProcessor.rescheduleEmailNotification(
      userId,
      notificationTime,
    );
  }

  async recalculateEmailNotificationsAfterServerless(
    data: ResponseDTO[],
    apiKey: string,
  ) {
    await this.notificationProcessor.recalculateEmailNotificationsAfterServerless(
      data,
      apiKey,
    );
  }

  async recalculateAll() {
    await this.notificationProcessor.recalculateAll();
  }

  getNotificationSettings(userId: UserId) {
    return this.notificationProcessor.getNotificationSettings(userId);
  }

  getTimeSleepSettings(userId: UserId) {
    return this.notificationProcessor.getTimeSleepSettings(userId);
  }

  // Основная функция корректировки времени уведомления
  getNotificationTimeAdjusted(
    notificationTimeLocal: Date,
    timeSleepSettings: TimeSleepSettings,
    beforeSleepMinutes = 0,
    afterSleepMinutes = 0,
    debug = false,
  ): Date {
    return this.notificationProcessor.getNotificationTimeAdjusted(
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
    return this.notificationProcessor.getNotificationTimeAdjustedForDayByDay(
      notificationTimeLocal,
      timeSleepSettings,
      beforeSleepMinutes,
      afterSleepMinutes,
      debug,
    );
  }

  getNotificationTimeFromPreviousPeriod(
    sleepPeriodsForPreviousDay: SleepPeriod[],
    notificationTimeLocal: Date,
    beforeSleepMinutes: number,
    afterSleepMinutes: number,
  ) {
    return this.notificationProcessor.getNotificationTimeFromPreviousPeriod(
      sleepPeriodsForPreviousDay,
      notificationTimeLocal,
      beforeSleepMinutes,
      afterSleepMinutes,
    );
  }

  getNotificationTimeAdjustedForGeneralSleepPeriod(
    notificationTimeLocal: Date,
    timeSleepSettings: TimeSleepSettings,
    beforeSleepMinutes = 0,
    afterSleepMinutes = 0,
    debug = false,
  ): Date {
    return this.notificationProcessor.getNotificationTimeAdjustedForGeneralSleepPeriod(
      notificationTimeLocal,
      timeSleepSettings,
      beforeSleepMinutes,
      afterSleepMinutes,
      debug,
    );
  }

  correctNotificationTimeForSleep(
    notificationTimeUTC: Date,
    timeSleepSettings: TimeSleepSettings,
    timeZone: string,
    beforeSleepMinutes = 30,
    afterSleepMinutes = 30,
  ): Date {
    return this.notificationProcessor.correctNotificationTimeForSleep(
      notificationTimeUTC,
      timeSleepSettings,
      timeZone,
      beforeSleepMinutes,
      afterSleepMinutes,
    );
  }

  correctNotificationTimeForSleepUTC(
    notificationTimeUTC: Date,
    timeSleepSettings: TimeSleepSettings,
    timeZone: string,
    beforeSleepMinutes = 30,
    afterSleepMinutes = 30,
  ): Date {
    return this.notificationProcessor.correctNotificationTimeForSleepUTC(
      notificationTimeUTC,
      timeSleepSettings,
      timeZone,
      beforeSleepMinutes,
      afterSleepMinutes,
    );
  }
}
