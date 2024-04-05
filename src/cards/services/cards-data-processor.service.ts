import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';
import { BoxId, ShelfId } from '@/common/types/prisma-entities';
import { NotificationService } from '@/notification/notification.service';
import {
  CupboardClass,
  UserDataStorageService,
} from '@/user-data-storage/user-data-storage.service';
import { Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BoxSpecialType } from '@prisma/client';
import { UserId } from 'aws-sdk/clients/appstream';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'nestjs-prisma';
import { UpdateCardDto } from '../dto/update-card.dto';
import { TrainingResponseDto } from '../dto/update-cards-after-training.dto';
import { CardIncBox, TrainingCardsCondition } from '../entities/card.entity';
import { timeLeft } from '../helpers/timeLeft';
import { addHours } from 'date-fns';

@Injectable()
export class CardProcessorService {
  private readonly logger = new Logger(CardProcessorService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly notificationService: NotificationService,
    private moduleRef: ModuleRef,
  ) {}

  async getNotificationTime(userId: UserId, minimumCards = 20) {
    const cards = (await this.prisma.card.findMany({
      where: { userId, isDeleted: false, nextTraining: { not: null } },
      select: { nextTraining: true },
      orderBy: { nextTraining: 'desc' },
      take: minimumCards,
    })) as { nextTraining: Date }[];

    // если карточек меньше чем минимальное количество, то уведомления не нужно отправлять
    if (cards.length < minimumCards) return null;
    const notificationTime = new Date(cards[0].nextTraining);
    return notificationTime;
  }

  // async getNotificationTime2(userId: UserId, minimumCards = 20) {
  //   this.logger.log('getNotificationTime - started');
  //   const cards = (await this.prisma.card.findMany({
  //     where: { userId, isDeleted: false, nextTraining: { not: null } },
  //     select: { nextTraining: true },
  //     orderBy: { nextTraining: 'desc' },
  //     take: minimumCards,
  //   })) as { nextTraining: Date }[];
  //   // this.logger.log('cards', cards.length);
  //   if (cards.length < minimumCards) return null;
  //   // this.logger.debug(new Date(cards[0].nextTraining));
  //   // this.logger.debug(new Date(cards[cards.length - 1].nextTraining));
  //   const notificationTime = new Date(cards[0].nextTraining);
  //   // [Nest] 62788  - 12.02.2024, 03:54:06   DEBUG [CardProcessorService] Mon Feb 12 2024 01:42:36
  //   // [Nest] 62788  - 12.02.2024, 03:54:06   DEBUG [CardProcessorService] Mon Feb 12 2024 09:54:06
  //   this.logger.log(`getNotificationTime - ${notificationTime}`);
  //   this.logger.log('getNotificationTime - ended');
  //   return notificationTime;
  // }

  async handleNotificationAfterCardUpdate(
    card: CardIncBox,
    previousBoxId: BoxId | undefined,
    skipNotificationUpdate = false,
  ) {
    if (skipNotificationUpdate || card.boxId === previousBoxId) return;
    try {
      const userId = card.userId;
      const notificationSettings =
        await this.notificationService.getNotificationSettings(userId);
      this.logger.log(notificationSettings);
      if (
        !notificationSettings ||
        !notificationSettings.emailNotificationsEnabled
      ) {
        return;
      }

      const notificationTime = await this.getNotificationTime(
        userId,
        notificationSettings.minimumCardsForEmailNotification,
      );
      this.logger.debug('notificationTime ', notificationTime);
      if (!notificationTime) {
        this.logger.log('notificationTime is null');
        return;
      }
      const timeSleepSettings =
        await this.notificationService.getTimeSleepSettings(userId);
      this.logger.debug('timeSleepSettings ');

      this.logger.debug(JSON.stringify(timeSleepSettings, null, 3));

      if (!timeSleepSettings || !timeSleepSettings.isTimeSleepEnabled) {
        void this.notificationService.rescheduleNotification(
          userId,
          notificationTime,
        );
        return;
      }

      const timezone = (await this.prisma.user.findUnique({
        where: { id: userId },
      }))!.timezone!;

      this.logger.debug('timezone  ', timezone);

      const correctedTime =
        this.notificationService.correctNotificationTimeForSleepUTC(
          notificationTime,
          timeSleepSettings,
          timezone,
        );
      this.logger.debug(JSON.stringify(correctedTime, null, 3));
      // this.logger.debug('correctedTime  ', correctedTime);
      void this.notificationService.rescheduleNotification(
        userId,
        correctedTime,
      );
    } catch (error) {
      console.error('Ошибка при обновлении уведомлений:', error);
    }
  }

  async handleNotificationAfterTraining(userId: UserId, timezone: string) {
    try {
      const notificationSettings =
        await this.notificationService.getNotificationSettings(userId);
      this.logger.debug(notificationSettings);
      if (
        !notificationSettings ||
        !notificationSettings.emailNotificationsEnabled
      ) {
        return;
      }
      const notificationTime = await this.getNotificationTime(
        userId,
        notificationSettings.minimumCardsForEmailNotification,
      );
      if (!notificationTime) {
        this.logger.log('notificationTime is null');
        return;
      }
      const timeSleepSettings =
        await this.notificationService.getTimeSleepSettings(userId);

      if (!timeSleepSettings || !timeSleepSettings.isTimeSleepEnabled) {
        void this.notificationService.rescheduleNotification(
          userId,
          notificationTime,
        );
        return;
      }

      const correctedTime =
        this.notificationService.correctNotificationTimeForSleepUTC(
          notificationTime,
          timeSleepSettings,
          timezone,
        );
      void this.notificationService.rescheduleNotification(
        userId,
        correctedTime,
      );
    } catch (error) {
      console.error('Ошибка при обновлении уведомлений:', error);
    }
  }

  enhanceCardListViewPage(cards: CardIncBox[]) {
    return cards.map((card) => this.enhanceCardViewPage(card));
  }

  enhanceCardListTrainingPage(cards: CardIncBox[]) {
    const enhancedCards = cards.map((card) =>
      this.enhanceCardTrainingPage(card),
    );
    return enhancedCards;
  }

  enhanceCardViewPage(card: CardIncBox) {
    const enhancedCard = this.transformToUpdateCardDto(card);
    this.calculateState(enhancedCard);
    // this.updateNextTraining(enhancedCard);
    return enhancedCard;
  }

  enhanceCardTrainingPage(card: CardIncBox) {
    const enhancedCard = this.transformToUpdateCardDto(card);
    this.calculateState(enhancedCard);
    return enhancedCard;
  }

  transformToUpdateCardDto(card: CardIncBox) {
    return plainToClass(UpdateCardDto, card);
  }

  updateNextTraining(card: UpdateCardDto) {
    card.nextTraining = timeLeft(card.nextTraining as Date, this.i18n);
  }

  calculateState(card: UpdateCardDto) {
    if (card.specialType === BoxSpecialType.new && NEW_CARDS_COUNTS_AS_TRAIN) {
      // this.logger.warn(`новая карточка ${card.boxIndex}`);
      card.state = 'train';
    } else if (card.nextTraining && card.nextTraining < new Date()) {
      card.state = 'train';
    } else {
      card.state = 'wait';
    }
  }

  // получить массив с ответами + userId
  // преобразовать массив с ответами в нужный формат
  // получить объект шкафа используя userId
  // для каждой карточк сгенерировать обновления
  // собрать обновления в список
  // обновить все карточки
  // инвалидировать шкаф
  async getCardsUpdatesListAfterTraining(
    userId: UserId,
    cardsWithAnswer: TrainingResponseDto,
    now: Date,
  ) {
    const cupboard = await this.getCupboardClass(userId);
    // this.logger.debug(JSON.stringify(cupboard, null, 3));
    const updates = cardsWithAnswer.responses.map((card) =>
      cupboard.getNextTrainingTimeByCardData({
        id: card.id,
        boxId: card.boxId,
        answer: card.answer,
        shelfId: card.shelfId,
        now,
      }),
    );
    return updates;
  }

  async getCupboardClass(userId: UserId): Promise<CupboardClass> {
    const userDataStorageService = this.moduleRef.get<UserDataStorageService>(
      UserDataStorageService,
      { strict: false },
    );
    const cupboard = await userDataStorageService.getCupboardClass(userId);
    // this.logger.debug(JSON.stringify(cupboard, null, 3));
    return cupboard;
  }

  createCondition(
    userId: UserId,
    shelfId: ShelfId | 'all',
    boxId: BoxId | 'all' | 'new' | 'learnt' | 'learning',
  ) {
    const mainCondition: TrainingCardsCondition = {
      userId,
      isDeleted: false,
      OR: [
        {
          nextTraining: {
            lt: new Date(), // Получить карточки, у которых nextTraining меньше текущего времени
          },
        },
        {
          nextTraining: null, // Получить карточки, у которых nextTraining равно null(карточки в новых коробках)
        },
      ],
    };
    if (shelfId === 'all') {
      switch (boxId) {
        case 'new':
          mainCondition.box = { specialType: BoxSpecialType.new };

          break;
        case 'learning':
          mainCondition.box = { specialType: BoxSpecialType.none };

          break;
        case 'learnt':
          mainCondition.box = { specialType: BoxSpecialType.learnt };

          break;
      }
    } else {
      if (boxId === 'all') {
        mainCondition.shelfId = shelfId;
      } else {
        mainCondition.shelfId = shelfId;
        mainCondition.boxId = boxId;
      }
    }
    return mainCondition;
  }
}
// import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';
// import { BoxId, ShelfId } from '@/common/types/prisma-entities';
// import { NotificationService } from '@/notification/notification.service';
// import {
//   CupboardClass,
//   UserDataStorageService,
// } from '@/user-data-storage/user-data-storage.service';
// import { Injectable, Logger } from '@nestjs/common';
// import { ModuleRef } from '@nestjs/core';
// import { BoxSpecialType } from '@prisma/client';
// import { UserId } from 'aws-sdk/clients/appstream';
// import { plainToClass } from 'class-transformer';
// import { I18nService } from 'nestjs-i18n';
// import { PrismaService } from 'nestjs-prisma';
// import { UpdateCardDto } from '../dto/update-card.dto';
// import { TrainingResponseDto } from '../dto/update-cards-after-training.dto';
// import { CardIncBox, TrainingCardsCondition } from '../entities/card.entity';
// import { timeLeft } from '../helpers/timeLeft';

// @Injectable()
// export class CardProcessorService {
//   private readonly logger = new Logger(CardProcessorService.name);
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly i18n: I18nService,
//     private readonly notificationService: NotificationService,
//     private moduleRef: ModuleRef,
//   ) {}

//   async getNotificationTime(userId: UserId, minimumCards = 20) {
//     const cards = (await this.prisma.card.findMany({
//       where: { userId, isDeleted: false, nextTraining: { not: null } },
//       select: { nextTraining: true },
//       orderBy: { nextTraining: 'desc' },
//       take: minimumCards,
//     })) as { nextTraining: Date }[];
//     // если карточек меньше чем минимальное количество, то уведомления не нужно отправлять
//     if (cards.length < minimumCards) return null;
//     const notificationTime = new Date(cards[0].nextTraining);
//     return notificationTime;
//   }

//   async getNotificationTime2(userId: UserId, minimumCards = 20) {
//     this.logger.log('getNotificationTime - started');
//     const cards = (await this.prisma.card.findMany({
//       where: { userId, isDeleted: false, nextTraining: { not: null } },
//       select: { nextTraining: true },
//       orderBy: { nextTraining: 'desc' },
//       take: minimumCards,
//     })) as { nextTraining: Date }[];
//     // this.logger.log('cards', cards.length);
//     if (cards.length < minimumCards) return null;
//     // this.logger.debug(new Date(cards[0].nextTraining));
//     // this.logger.debug(new Date(cards[cards.length - 1].nextTraining));
//     const notificationTime = new Date(cards[0].nextTraining);
//     // [Nest] 62788  - 12.02.2024, 03:54:06   DEBUG [CardProcessorService] Mon Feb 12 2024 01:42:36
//     // [Nest] 62788  - 12.02.2024, 03:54:06   DEBUG [CardProcessorService] Mon Feb 12 2024 09:54:06
//     this.logger.log(`getNotificationTime - ${notificationTime}`);
//     this.logger.log('getNotificationTime - ended');
//     return notificationTime;
//   }

//   async handleNotificationAfterCardUpdate(
//     card: CardIncBox,
//     previousBoxId: BoxId | undefined,
//     skipNotificationUpdate = false,
//   ) {
//     if (skipNotificationUpdate || card.boxId === previousBoxId) return;
//     try {
//       const userId = card.userId;
//       const notificationSettings =
//         await this.notificationService.getNotificationSettings(userId);
//       this.logger.log(notificationSettings);
//       if (
//         !notificationSettings ||
//         !notificationSettings.emailNotificationsEnabled
//       ) {
//         return;
//       }

// 			const notificationTime = await this.getNotificationTime(
//         userId,
//         notificationSettings.minimumCardsForEmailNotification,
//       );
//       if (!notificationTime) {
//         this.logger.log('notificationTime is null');
//         return;
//       }
//       const timeSleepSettings =
//         await this.notificationService.getTimeSleepSettings(userId);

//       if (!timeSleepSettings || !timeSleepSettings.isTimeSleepEnabled) {
//         void this.notificationService.rescheduleNotification(
//           userId,
//           notificationTime,
//         );
//         return;
//       }

//       const correctedTime =
//         this.notificationService.correctNotificationTimeForSleepUTC(
//           notificationTime,
//           timeSleepSettings,
//           timezone,
//         );
//       void this.notificationService.rescheduleNotification(
//         userId,
//         correctedTime,
//       );
//       // this.notificationService.rescheduleNotification(userId, notificationTime);
//     } catch (error) {
//       console.error('Ошибка при обновлении уведомлений:', error);
//     }
//   }

//   async handleNotificationAfterTraining(userId: UserId, timezone: string) {
//     try {
//       const notificationSettings =
//         await this.notificationService.getNotificationSettings(userId);
//       this.logger.debug(notificationSettings);
//       if (
//         !notificationSettings ||
//         !notificationSettings.emailNotificationsEnabled
//       ) {
//         return;
//       }
//       const notificationTime = await this.getNotificationTime(
//         userId,
//         notificationSettings.minimumCardsForEmailNotification,
//       );
//       if (!notificationTime) {
//         this.logger.log('notificationTime is null');
//         return;
//       }
//       const timeSleepSettings =
//         await this.notificationService.getTimeSleepSettings(userId);

//       if (!timeSleepSettings || !timeSleepSettings.isTimeSleepEnabled) {
//         void this.notificationService.rescheduleNotification(
//           userId,
//           notificationTime,
//         );
//         return;
//       }

//       const correctedTime =
//         this.notificationService.correctNotificationTimeForSleepUTC(
//           notificationTime,
//           timeSleepSettings,
//           timezone,
//         );
//       void this.notificationService.rescheduleNotification(
//         userId,
//         correctedTime,
//       );
//     } catch (error) {
//       console.error('Ошибка при обновлении уведомлений:', error);
//     }
//   }

//   enhanceCardListViewPage(cards: CardIncBox[]) {
//     return cards.map((card) => this.enhanceCardViewPage(card));
//   }

//   enhanceCardListTrainingPage(cards: CardIncBox[]) {
//     const enhancedCards = cards.map((card) =>
//       this.enhanceCardTrainingPage(card),
//     );
//     return enhancedCards;
//   }

//   enhanceCardViewPage(card: CardIncBox) {
//     const enhancedCard = this.transformToUpdateCardDto(card);
//     this.calculateState(enhancedCard);
//     // this.updateNextTraining(enhancedCard);
//     return enhancedCard;
//   }

//   enhanceCardTrainingPage(card: CardIncBox) {
//     const enhancedCard = this.transformToUpdateCardDto(card);
//     this.calculateState(enhancedCard);
//     return enhancedCard;
//   }

//   transformToUpdateCardDto(card: CardIncBox) {
//     return plainToClass(UpdateCardDto, card);
//   }

//   updateNextTraining(card: UpdateCardDto) {
//     card.nextTraining = timeLeft(card.nextTraining as Date, this.i18n);
//   }

//   calculateState(card: UpdateCardDto) {
//     if (card.specialType === BoxSpecialType.new && NEW_CARDS_COUNTS_AS_TRAIN) {
//       // this.logger.warn(`новая карточка ${card.boxIndex}`);
//       card.state = 'train';
//     } else if (card.nextTraining && card.nextTraining < new Date()) {
//       card.state = 'train';
//     } else {
//       card.state = 'wait';
//     }
//   }

//   // получить массив с ответами + userId
//   // преобразовать массив с ответами в нужный формат
//   // получить объект шкафа используя userId
//   // для каждой карточк сгенерировать обновления
//   // собрать обновления в список
//   // обновить все карточки
//   // инвалидировать шкаф
//   async getCardsUpdatesListAfterTraining(
//     userId: UserId,
//     cardsWithAnswer: TrainingResponseDto,
//     now: Date,
//   ) {
//     const cupboard = await this.getCupboardClass(userId);
//     // this.logger.debug(JSON.stringify(cupboard, null, 3));
//     const updates = cardsWithAnswer.responses.map((card) =>
//       cupboard.getNextTrainingTimeByCardData({
//         id: card.id,
//         boxId: card.boxId,
//         answer: card.answer,
//         shelfId: card.shelfId,
//         now,
//       }),
//     );
//     return updates;
//   }

//   async getCupboardClass(userId: UserId): Promise<CupboardClass> {
//     const userDataStorageService = this.moduleRef.get<UserDataStorageService>(
//       UserDataStorageService,
//       { strict: false },
//     );
//     const cupboard = await userDataStorageService.getCupboardClass(userId);
//     // this.logger.debug(JSON.stringify(cupboard, null, 3));
//     return cupboard;
//   }

//   createCondition(
//     userId: UserId,
//     shelfId: ShelfId | 'all',
//     boxId: BoxId | 'all' | 'new' | 'learnt' | 'learning',
//   ) {
//     const mainCondition: TrainingCardsCondition = {
//       userId,
//       isDeleted: false,
//       OR: [
//         {
//           nextTraining: {
//             lt: new Date(), // Получить карточки, у которых nextTraining меньше текущего времени
//           },
//         },
//         {
//           nextTraining: null, // Получить карточки, у которых nextTraining равно null(карточки в новых коробках)
//         },
//       ],
//     };
//     if (shelfId === 'all') {
//       switch (boxId) {
//         case 'new':
//           mainCondition.box = { specialType: BoxSpecialType.new };

//           break;
//         case 'learning':
//           mainCondition.box = { specialType: BoxSpecialType.none };

//           break;
//         case 'learnt':
//           mainCondition.box = { specialType: BoxSpecialType.learnt };

//           break;
//       }
//     } else {
//       if (boxId === 'all') {
//         mainCondition.shelfId = shelfId;
//       } else {
//         mainCondition.shelfId = shelfId;
//         mainCondition.boxId = boxId;
//       }
//     }
//     return mainCondition;
//   }
// }
