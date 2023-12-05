import { Injectable, Logger } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { MoveCardsDto, UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'nestjs-prisma';
import { Box, BoxSpecialType, Card, Shelf, User } from '@prisma/client';
import { TrainingCardsCondition, CardIncBox } from './entities/card.entity';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import { UserId } from '@/users/types/types';
import { NotificationService } from '@/notification/notification.service';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(
    userId: User['id'],
    createCardDto: CreateCardDto,
  ): Promise<Card> {
    const card = await this.prisma.card.create({
      data: { ...createCardDto, userId },
    });
    return card;
  }

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

  async update(
    id: Card['id'],
    updateCardDto: UpdateCardDto,
    skipNotificationUpdate = false,
  ) {
    const { previousBoxId, ...restUpdateCardDto } = updateCardDto;
    const cardUpdated = await this.prisma.card.update({
      where: { id },
      data: restUpdateCardDto,
      include: { box: { select: { index: true, specialType: true } } },
    });

    void (async () => {
      // ничего не нужно делать, так как изменение карточки не затронуло nextTraining
      if (skipNotificationUpdate || cardUpdated.boxId === previousBoxId) return;
      try {
        const userId = cardUpdated.userId;
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
    })();

    return this.enhanceCard(cardUpdated);
  }

  enhanceCardList(cards: CardIncBox[]) {
    return cards.map((card) => this.enhanceCard(card));
  }

  enhanceCard(card: CardIncBox) {
    const enhancedCard = plainToClass(UpdateCardDto, card);
    enhancedCard.calculateState();
    enhancedCard.updateNextTraining(this.i18n);
    return enhancedCard;
  }

  deleteSoftByShelfId(shelfId: Shelf['id']) {
    return this.prisma.card.updateMany({
      where: { shelfId },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  deleteSoftByBoxId(boxId: Box['id']) {
    return this.prisma.card.updateMany({
      where: { boxId },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  async findTrainingCardsByShelfIdAndBoxId(
    userId: User['id'],
    shelfId: Shelf['id'] | 'all',
    boxId: Box['id'] | 'all' | 'new' | 'learnt' | 'learning',
  ) {
    // const cards: Card[] = [];
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
    const trainingCards = await this.prisma.card.findMany({
      where: mainCondition,
    });
    // console.log(trainingCards);
    return trainingCards;
    // const cards = await this.prisma.card.findMany({
    //   where: { shelfId, boxId },
    // });
  }

  async findAll(userId: User['id']): Promise<Card[]> {
    return this.prisma.card.findMany({
      where: { userId },
    });
  }

  async findAllWithBox(userId: User['id']): Promise<CardIncBox[]> {
    return this.prisma.card.findMany({
      where: { userId, isDeleted: false },
      include: { box: { select: { index: true, specialType: true } } },
    });
  }

  async findAllDeletedCards(userId: User['id']) {
    return this.prisma.card.findMany({
      where: { userId, isDeleted: true },
    });
  }

  async moveCards(moveCardsDto: MoveCardsDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, cardsUpdated] = await this.prisma.$transaction([
      this.prisma.card.updateMany({
        where: { id: { in: moveCardsDto.cardIds } },
        data: { shelfId: moveCardsDto.shelfId, boxId: moveCardsDto.boxId },
      }),
      this.prisma.card.findMany({
        where: { id: { in: moveCardsDto.cardIds } },
        include: { box: { select: { index: true, specialType: true } } },
      }),
    ]);

    return this.enhanceCardList(cardsUpdated);
  }

  async deleteSoftByCardIdList(cardIds: Card['id'][]) {
    const deletedCards = this.prisma.card.updateMany({
      where: { id: { in: cardIds } },
      data: { isDeleted: true, deletedAt: new Date() },
    });

    return deletedCards;
  }

  deleteSoftByCardId(cardId: Card['id']) {
    return this.prisma.card.update({
      where: { id: cardId },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
