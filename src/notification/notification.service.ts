import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SettingsService } from '@/settings/settings.service';
import { EVENT_NOTIFY_EMAIL } from '@/common/const/events';
import { UserId } from '@/common/types/prisma-entities';
import {
  TimeSleepSettings,
  TimeSleepDataObject,
  DaysOfWeek,
  TimeSleepAtomicDataObject,
} from '@/aggregate/entities/settings-types';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import {
  addDays,
  addMinutes,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isWithinInterval,
  subDays,
  subMinutes,
} from 'date-fns';

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationService.name);

  constructor(
    private eventEmitter: EventEmitter2,
    private readonly settingsService: SettingsService,
  ) {}

  rescheduleNotification(userId: UserId, newDateTime: Date) {
    this.logger.log(`reschedule Notification for user ${userId} - started.`);
    // нужно обновить данные на AWS
    // addOrUpdateTrainingNotification;
    this.logger.log(`reschedule Notification for user ${userId} - ended.`);
  }

  getNotificationSettings(userId: UserId) {
    return this.settingsService.getNotificationSettings(userId);
  }

  getTimeSleepSettings(userId: UserId) {
    return this.settingsService.getTimeSleepSettings(userId);
  }

  // getNotificationTimeAdjusted(
  //   notificationTimeLocal: Date,
  //   timeSleepSettings: TimeSleepSettings,
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

  //   if (
  //     this.isNotificationBeforeWakeUpTime(
  //       notificationTimeLocal,
  //       currentDayWakeUpTime,
  //     )
  //   ) {
  //     return currentDayWakeUpTime;
  //   }

  //   if (
  //     this.isNotificationAfterFallAsleepTime(
  //       notificationTimeLocal,
  //       currentDayFallAsleepTime,
  //     )
  //   ) {
  //     return nextDayWakeUpTime;
  //   }

  //   return notificationTimeLocal;
  // }
  getNotificationTimeAdjusted(
    notificationTimeLocal: Date,
    timeSleepSettings: TimeSleepSettings,
    beforeSleepMinutes = 0,
    afterSleepMinutes = 0,
  ): Date {
    const currentDayOfWeek = this.getCurrentDayOfWeek(notificationTimeLocal);
    const nextDayOfWeek = this.getNextDayOfWeek(notificationTimeLocal);

    const {
      currentDayWakeUpTime,
      currentDayFallAsleepTime,
      nextDayWakeUpTime,
    } = this.getSleepTimes(
      notificationTimeLocal,
      timeSleepSettings,
      currentDayOfWeek,
      nextDayOfWeek,
    );

    const currentDayWakeUpTimeWithOffset = addMinutes(
      currentDayWakeUpTime,
      afterSleepMinutes,
    );
    const currentDayFallAsleepTimeWithOffset = subMinutes(
      currentDayFallAsleepTime,
      beforeSleepMinutes,
    );
    const nextDayWakeUpTimeWithOffset = addMinutes(
      nextDayWakeUpTime,
      afterSleepMinutes,
    );
    // Условие isBefore(notificationTimeLocal, currentDayWakeUpTimeWithOffset) проверяет, находится ли время уведомления строго до времени пробуждения. Если время уведомления равно времени пробуждения, мы хотим, чтобы уведомление было отправлено в это время, а не откладывалось до следующего дня.
    if (isBefore(notificationTimeLocal, currentDayWakeUpTimeWithOffset)) {
      return currentDayWakeUpTimeWithOffset;
    }

    // С другой стороны, условие isAfter(notificationTimeLocal, currentDayFallAsleepTimeWithOffset) || isEqual(notificationTimeLocal, currentDayFallAsleepTimeWithOffset) проверяет, находится ли время уведомления после или равно времени засыпания. Если время уведомления равно времени засыпания, мы хотим отложить уведомление до следующего дня, чтобы не беспокоить пользователя во время сна.
    if (
      isAfter(notificationTimeLocal, currentDayFallAsleepTimeWithOffset) ||
      isEqual(notificationTimeLocal, currentDayFallAsleepTimeWithOffset)
    ) {
      return nextDayWakeUpTimeWithOffset;
    }

    return notificationTimeLocal;
  }

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

  private getSleepTimes(
    notificationTimeLocal: Date,
    timeSleepSettings: TimeSleepSettings,
    currentDayOfWeek: DaysOfWeek,
    nextDayOfWeek: DaysOfWeek,
  ): {
    currentDayWakeUpTime: Date;
    currentDayFallAsleepTime: Date;
    nextDayWakeUpTime: Date;
  } {
    const {
      currentDayWakeUpObject,
      currentDayFallAsleepObject,
      nextDayWakeUpObject,
    } = this.getSleepObjects(
      timeSleepSettings,
      currentDayOfWeek,
      nextDayOfWeek,
    );

    const currentDayWakeUpTime = this.setTimeOnDate(
      notificationTimeLocal,
      currentDayWakeUpObject,
    );
    const currentDayFallAsleepTime = this.setTimeOnDate(
      notificationTimeLocal,
      currentDayFallAsleepObject,
    );
    const nextDayWakeUpTime = this.setTimeOnDate(
      this.getNextDay(notificationTimeLocal),
      nextDayWakeUpObject,
    );

    return {
      currentDayWakeUpTime,
      currentDayFallAsleepTime,
      nextDayWakeUpTime,
    };
  }

  private getSleepObjects(
    timeSleepSettings: TimeSleepSettings,
    currentDayOfWeek: DaysOfWeek,
    nextDayOfWeek: DaysOfWeek,
  ): {
    currentDayWakeUpObject: TimeSleepAtomicDataObject;
    currentDayFallAsleepObject: TimeSleepAtomicDataObject;
    nextDayWakeUpObject: TimeSleepAtomicDataObject;
  } {
    if (
      timeSleepSettings.isDayByDayOptionEnabled &&
      timeSleepSettings.dayByDayTimeSleepData
    ) {
      return {
        currentDayWakeUpObject:
          timeSleepSettings.dayByDayTimeSleepData[currentDayOfWeek].up,
        currentDayFallAsleepObject:
          timeSleepSettings.dayByDayTimeSleepData[currentDayOfWeek].down,
        nextDayWakeUpObject:
          timeSleepSettings.dayByDayTimeSleepData[nextDayOfWeek].up,
      };
    }

    return {
      currentDayWakeUpObject: timeSleepSettings.generalTimeSleepData.up,
      currentDayFallAsleepObject: timeSleepSettings.generalTimeSleepData.down,
      nextDayWakeUpObject: timeSleepSettings.generalTimeSleepData.up,
    };
  }

  private setTimeOnDate(
    date: Date,
    timeObject: TimeSleepAtomicDataObject,
  ): Date {
    const newDate = new Date(date);
    newDate.setHours(timeObject.hours, timeObject.minutes);
    return newDate;
  }

  private getNextDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
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
  //       notificationTimeLocal,
  //       finalSleepInterval,
  //     )
  //   ) {
  //     return zonedTimeToUtc(finalSleepInterval.end, timeZone);
  //   }

  //   return notificationTimeUTC;
  // }

  getCurrentDayOfWeek(notificationTimeLocal: Date): DaysOfWeek {
    const dayOfWeekNumber = getDay(notificationTimeLocal);
    const daysOfWeek: DaysOfWeek[] = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const dayOfWeek = daysOfWeek[dayOfWeekNumber];
    console.log('Day of week:', dayOfWeek);
    return dayOfWeek;
  }
  getNextDayOfWeek(notificationTimeLocal: Date): DaysOfWeek {
    const dayOfWeekNumber = getDay(notificationTimeLocal);
    if (dayOfWeekNumber === 6) {
      return 'sunday';
    }
    const daysOfWeek: DaysOfWeek[] = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    const dayOfWeek = daysOfWeek[dayOfWeekNumber + 1];
    console.log('Day of week:', dayOfWeek);
    return dayOfWeek;
  }
}

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
