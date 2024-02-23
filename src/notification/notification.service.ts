import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SettingsService } from '@/settings/settings.service';
import { EVENT_NOTIFY_EMAIL } from '@/common/const/events';
import { UserId } from '@/common/types/prisma-entities';

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationService.name);
  private timers = new Map<string, NodeJS.Timeout>();

  constructor(
    private eventEmitter: EventEmitter2,
    private readonly settingsService: SettingsService,
  ) {}

  scheduleNotification(userId: UserId, dateTime: Date) {
    this.logger.log(`schedule Notification - started.`);
    const now = new Date();
    const delay = dateTime.getTime() - now.getTime();
    this.logger.log(`delay - ${delay}`);
    // Планирование колбека
    const timerId = setTimeout(() => {
      // Время фактического выполнения колбека
      const callbackTime = new Date();
      this.logger.log(`${dateTime} - должен отработать`);
      this.logger.log(`${callbackTime} - отрабатывает сейчас`);
      this.logger.log(`${this.formatTime(dateTime)} - должен отработать`);
      this.logger.log(`${this.formatTime(callbackTime)} - отрабатывает сейчас`);

      this.eventEmitter.emit(EVENT_NOTIFY_EMAIL, userId);
    }, delay);

    // Сохранение идентификатора таймера для возможной отмены
    this.timers.set(userId, timerId);
    this.logger.log(`schedule Notification - ended.`);
  }

  cancelNotification(userId: UserId) {
    const timerId = this.timers.get(userId);
    if (timerId) {
      clearTimeout(timerId);
      this.timers.delete(userId);
      this.logger.log(`Notification for user ${userId} has been cancelled.`);
    }
  }

  rescheduleNotification(userId: UserId, newDateTime: Date) {
    // addOrUpdateTrainingNotification;
    this.logger.log(`reschedule Notification for user ${userId} - started.`);
    this.cancelNotification(userId);
    this.scheduleNotification(userId, newDateTime);
    this.logger.log(`reschedule Notification for user ${userId} - ended.`);
  }

  @OnEvent(EVENT_NOTIFY_EMAIL)
  handleNotifyEvent(userId: UserId) {
    this.sendNotification(userId);
    this.timers.delete(userId); // Удалить таймер после отправки уведомления
  }

  sendNotification(userId: UserId) {
    // Логика отправки уведомления
    this.logger.log(`Sending notification to user ${userId}`);
  }

  getNotificationSettings(userId: UserId) {
    return this.settingsService.getNotificationSettings(userId);
  }

  // Вспомогательная функция для форматирования времени
  formatTime(date: Date) {
    const hours = this.padTime(date.getHours());
    const minutes = this.padTime(date.getMinutes());
    const seconds = this.padTime(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  // Дополнительная функция для добавления ведущих нулей
  padTime(time: number) {
    return time.toString().padStart(2, '0');
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
