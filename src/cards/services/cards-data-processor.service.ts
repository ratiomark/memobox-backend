import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';
import { NotificationService } from '@/notification/notification.service';
import { UserId } from '@/users/types/types';
import { Injectable, Logger } from '@nestjs/common';
import { Card, BoxSpecialType, Box, Shelf } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'nestjs-prisma';
import { UpdateCardDto } from '../dto/update-card.dto';
import { CardIncBox, TrainingCardsCondition } from '../entities/card.entity';
import { timeLeft } from '../helpers/timeLeft';

@Injectable()
export class CardDataProcessorService {
  private readonly logger = new Logger(CardDataProcessorService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly notificationService: NotificationService,
  ) {}

  async getNotificationTime(userId: UserId, minimumCards = 10) {
    this.logger.log('getNotificationTime - started');
    const cards = (await this.prisma.card.findMany({
      where: { userId, isDeleted: false, nextTraining: { not: null } },
      select: { nextTraining: true },
      orderBy: { nextTraining: 'asc' },
      take: minimumCards,
    })) as { nextTraining: Date }[];
    if (cards.length < minimumCards) return null;
    const notificationTime = new Date(
      Math.max(
        ...(cards.map((card) => card.nextTraining) as unknown as number[]),
      ),
    );
    this.logger.log(`getNotificationTime - ${notificationTime}`);
    this.logger.log('getNotificationTime - ended');
    return notificationTime;
  }

  async handleNotificationAfterCardUpdate(
    card: CardIncBox,
    previousBoxId: string | undefined,
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
      if (notificationTime) {
        this.notificationService.rescheduleNotification(
          userId,
          notificationTime,
        );
      }
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
    return cards.map((card) => this.enhanceCardTrainingPage(card));
  }

  enhanceCardViewPage(card: CardIncBox) {
    const enhancedCard = this.transformToUpdateCardDto(card);
    this.calculateState(enhancedCard);
    this.updateNextTraining(enhancedCard);
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
      card.state = 'train';
    } else if (card.nextTraining && card.nextTraining < new Date()) {
      card.state = 'train';
    } else {
      card.state = 'wait';
    }
  }

  createCondition(
    userId: UserId,
    shelfId: Shelf['id'] | 'all',
    boxId: Box['id'] | 'all' | 'new' | 'learnt' | 'learning',
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
          nextTraining: null, // Получить карточки, у которых nextTraining равно null
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
