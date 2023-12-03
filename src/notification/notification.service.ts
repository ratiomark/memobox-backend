import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CardIncUser } from '@/cards/entities/card.entity';
// const dateTime = new Date();
// dateTime.setSeconds(dateTime.getSeconds() + data.seconds ?? 0);
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserId } from '@/users/types/types';
// scheduleNotification(
//   userId: UserId,
//   data: { text: string; seconds: number },
// ) {
// Текущее время и время, когда должен выполниться колбек
// console.log(`${this.formatTime(dateTime)} - date time`);
// console.log(`${this.formatTime(now)} - сейчас`);
@Injectable()
export class NotificationService {
  private timers = new Map<string, NodeJS.Timeout>();

  constructor(private eventEmitter: EventEmitter2) {}

  scheduleNotification(userId: UserId, dateTime: Date) {
    const now = new Date();
    const delay = dateTime.getTime() - now.getTime();

    // Планирование колбека
    const timerId = setTimeout(() => {
      // Время фактического выполнения колбека
      const callbackTime = new Date();
      console.log(`${this.formatTime(dateTime)} - должен отработать`);
      console.log(`${this.formatTime(callbackTime)} - отрабатывает сейчас`);

      this.eventEmitter.emit('notify', userId);
    }, delay);

    // Сохранение идентификатора таймера для возможной отмены
    this.timers.set(userId, timerId);
  }

  cancelNotification(userId: string) {
    const timerId = this.timers.get(userId);
    if (timerId) {
      clearTimeout(timerId);
      this.timers.delete(userId);
      console.log(`Notification for user ${userId} has been cancelled.`);
    }
  }

  rescheduleNotification(userId: string, newDateTime: Date) {
    this.cancelNotification(userId);
    // this.scheduleNotification(userId, newDateTime);
    console.log(`Notification for user ${userId} has been rescheduled.`);
  }

  @OnEvent('notify')
  handleNotifyEvent(userId: string) {
    this.sendNotification(userId);
    this.timers.delete(userId); // Удалить таймер после отправки уведомления
  }

  sendNotification(userId: string) {
    // Логика отправки уведомления
    console.log(`Sending notification to user ${userId}`);
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
