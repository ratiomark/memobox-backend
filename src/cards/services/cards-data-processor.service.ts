import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';
import { NotificationService } from '@/notification/notification.service';
import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import { BoxSpecialType, Box, Shelf } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'nestjs-prisma';
import { UpdateCardDto } from '../dto/update-card.dto';
import { CardIncBox, TrainingCardsCondition } from '../entities/card.entity';
import { timeLeft } from '../helpers/timeLeft';
import { TimingBlock } from '@/aggregate/entities/settings-types';
import {
  CardTrainingData,
  TrainingOutcome,
} from '@/common/types/entities-types';
import { ShelvesService } from '@/shelves/shelves.service';
import {
  CupboardClass,
  // UserDataStorageProxyService,
  UserDataStorageService,
} from '@/user-data-storage/user-data-storage.service';
import { BoxId, ShelfId, UserId } from '@/common/types/prisma-entities';
import { ModuleRef } from '@nestjs/core';
import { CupboardFactory } from '@/cupboard/cupboard.factory';
import { TrainingResponseDto } from '../dto/update-cards-after-training.dto';

@Injectable()
export class CardProcessorService {
  // private _shelvesService: ShelvesService;
  // private _userStorageService: UserDataStorageService;
  private readonly logger = new Logger(CardProcessorService.name);
  // private userDataStorageService: UserDataStorageService;
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly notificationService: NotificationService,
    // @Inject(forwardRef(() => UserDataStorageService))
    private moduleRef: ModuleRef,
    // private readonly cupboardFactory: CupboardFactory,
    // @Inject(forwardRef(() => ShelvesService))
    // private readonly shelvesServiceGetter:  ShelvesService,
    // private readonly shelvesServiceGetter: () => ShelvesService,
    // private readonly moduleRef: ModuleRef,
    // private readonly userStorageService: UserDataStorageService,
    // private readonly userStorageService: UserDataStorageProxyService,
    // @Inject(forwardRef(() => UserDataStorageService))
    // private readonly userDataStorageServiceGetter: () => UserDataStorageService,
  ) {}
  // onModuleInit() {
  //   setTimeout(() => {
  //     this.userDataStorageService = this.moduleRef.get(UserDataStorageService, {
  //       strict: false,
  //     });
  //   }, 4000);
  // }
  // onModuleInit() {
  //   this.userStorageService = this.moduleRef.get(UserDataStorageService, {
  //     strict: false,
  //   });
  // }
  // private get shelvesService() {
  //   if (!this._shelvesService) {
  //     this._shelvesService = this.shelvesServiceGetter();
  //   }
  //   return this._shelvesService;
  // }
  // onModuleInit() {
  //   this._userStorageService = this.moduleRef.get(UserDataStorageService, {
  //     strict: false,
  //   });
  // }
  // private get userStorageService() {
  //   if (!this._userStorageService) {
  //     this._userStorageService = this.userDataStorageServiceGetter();
  //   }
  //   return this._userStorageService;
  // }
  // получить объект, который можно превратить в класс, который
  async getNotificationTime(userId: UserId, minimumCards = 20) {
    this.logger.log('getNotificationTime - started');
    const cards = (await this.prisma.card.findMany({
      where: { userId, isDeleted: false, nextTraining: { not: null } },
      select: { nextTraining: true },
      orderBy: { nextTraining: 'asc' },
      take: minimumCards,
    })) as { nextTraining: Date }[];
    // this.logger.log('cards', cards.length);
    if (cards.length < minimumCards) return null;
    const notificationTime = new Date(cards[cards.length - 1].nextTraining);

    this.logger.log(`getNotificationTime - ${notificationTime}`);
    this.logger.log('getNotificationTime - ended');
    return notificationTime;
  }

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
      if (!notificationTime) {
        this.logger.log('notificationTime is null');
        return;
      }
      this.notificationService.rescheduleNotification(userId, notificationTime);
    } catch (error) {
      console.error('Ошибка при обновлении уведомлений:', error);
    }
  }

  updateCardsAfterTraining(userId: UserId) {
    return 'update cards';
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

  // проверенно тестами
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

  async updateCardsAfterTrainingHandler(
    userId: UserId,
    cardsWithAnswer: TrainingResponseDto,
  ) {
    const now = new Date();
    const cupboard = await this.getCupboardClass(userId);
    const cardsWithAnswersTransformed = cardsWithAnswer.responses.map(
      (card) => ({
        id: card.id,
        boxId: card.boxId,
        answer: card.answer,
        shelfId: card.shelfId,
        now,
      }),
    );
    const updates = cardsWithAnswersTransformed.map((card) =>
      cupboard.getNextTrainingTimeByCardData(card),
    );
    // this.logger.debug(updates);
    return updates;
    // console.log(updates);
    // const getNextTrainingTimeByCardData = await this.getCupboardObject(userId);
    // const userDataStorage = () =>
    //   this.moduleRef.get(UserDataStorageService, {
    //     strict: false,
    //   });
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
  // async getCupboardNextTimeFn(userId: UserId) {
  //   this.logger.debug('start - getCupboardObject');
  //   const userDataStorageService = this.moduleRef.get<UserDataStorageService>(
  //     UserDataStorageService,
  //     { strict: false },
  //   );
  //   this.logger.debug('moduleRef.get - updateCardsAfterTrainingHandler');
  //   const cupboard = await userDataStorageService.getCupboardObject(userId);
  //   // console.log(cupboard.getNextTrainingTimeByCardData())
  //   // this.logger.debug(cupboard, {
  //   //   context: 'updateCardsAfterTrainingHandler',
  //   // });
  //   this.logger.debug(JSON.stringify(cupboard, null, 3));
  //   return cupboard.getNextTrainingTimeByCardData;
  // }
  // получить массив с ответами + userId
  // преобразовать массив с ответами в нужный формат
  // получить объект шкафа используя userId
  // для каждой карточк сгенерировать обновления
  // собрать обновления в список
  // обновить все карточки
  // инвалидировать шкаф
  // `getNextTrainingTimeByCardData({
  //   shelfId,
  //   boxId,
  //   answer,
  // }: CardTrainingData): TrainingOutcome {
  //   const shelf = this.shelves[shelfId];
  //   if (!shelf) {
  //     throw new Error('Shelf not found');
  //   }

  //   const currentBox = shelf[boxId];
  //   if (!currentBox) {
  //     throw new Error('Box not found');
  //   }

  //   let targetBoxId: string;
  //   // let nextTraining: Date;

  //   switch (answer) {
  //     case 'good':
  //       targetBoxId = currentBox.nextBoxIdKey || boxId; // If no next box, stay in current
  //       break;
  //     case 'bad':
  //       targetBoxId = currentBox.previousBoxIdKey || boxId; // If no previous box, stay in current
  //       break;
  //     case 'middle':
  //     default:
  //       targetBoxId = boxId;
  //       break;
  //   }

  //   const targetBox = shelf[targetBoxId];
  //   const nextTraining = this.calculateNextTrainingTime(targetBox.timing);

  //   return { boxId: targetBoxId, nextTraining };
  // }`

  private calculateNextTrainingTime(timing: TimingBlock): Date {
    return new Date();
    // Implement the logic to calculate the next training time based on the timing
    // ...
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
