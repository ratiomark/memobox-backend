import { Injectable, Logger } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { MoveCardsDto, UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'nestjs-prisma';
import { Box, Card, Shelf, User } from '@prisma/client';
import { UserId } from '@/users/types/types';
import { CardDataProcessorService } from './services/cards-data-processor.service';
import { CardIncBox } from './entities/card.entity';
import { includeBoxWithIndexAndSpecialType } from './consts/include-box';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardDataProcessor: CardDataProcessorService,
    // private readonly notificationService: NotificationService,
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

  async update(
    id: Card['id'],
    updateCardDto: UpdateCardDto,
    skipNotificationUpdate = false,
  ) {
    const { previousBoxId, ...restUpdateCardDto } = updateCardDto;
    const cardUpdated = await this.prisma.card.update({
      where: { id },
      data: restUpdateCardDto,
      include: includeBoxWithIndexAndSpecialType,
    });

    void this.cardDataProcessor.handleNotificationAfterCardUpdate(
      cardUpdated,
      previousBoxId,
      skipNotificationUpdate,
    );

    return this.cardDataProcessor.enhanceCardViewPage(cardUpdated);
  }

  updateCardsAfterTraining(userId: UserId) {
    return 'update cards';
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
    const mainCondition = this.cardDataProcessor.createCondition(
      userId,
      shelfId,
      boxId,
    );
    const trainingCards = await this.prisma.card.findMany({
      where: mainCondition,
      include: includeBoxWithIndexAndSpecialType,
    });

    return this.cardDataProcessor.enhanceCardListTrainingPage(trainingCards);
  }

  async findAll(userId: User['id']): Promise<Card[]> {
    return this.prisma.card.findMany({
      where: { userId },
    });
  }

  async findAllWithBox(userId: User['id']): Promise<CardIncBox[]> {
    return this.prisma.card.findMany({
      where: { userId, isDeleted: false },
      include: includeBoxWithIndexAndSpecialType,
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
        include: includeBoxWithIndexAndSpecialType,
      }),
    ]);

    return this.cardDataProcessor.enhanceCardListViewPage(cardsUpdated);
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

  // нужно, чтобы лишний раз не импортировать cardDataProcessor в user-data-storage
  enhanceCard(card: CardIncBox) {
    return this.cardDataProcessor.enhanceCardViewPage(card);
  }
}
