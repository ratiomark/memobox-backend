import { Injectable, Logger } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { MoveCardsDto, UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'nestjs-prisma';
import { CardProcessorService } from './services/cards-data-processor.service';
import { CardIncBox } from './entities/card.entity';
import { includeBoxWithIndexAndSpecialType } from './const/include-box';
import { TrainingResponseDto } from './dto/update-cards-after-training.dto';
import { UserId, CardId, ShelfId, BoxId } from '@/common/types/prisma-entities';
import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';
import { Card } from '@prisma/client';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardDataProcessor: CardProcessorService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async create(userId: UserId, createCardDto: CreateCardDto): Promise<Card> {
    const card = await this.prisma.card.create({
      data: { ...createCardDto, userId },
    });
    return card;
  }

  async update(
    userId: UserId,
    id: CardId,
    updateCardDto: UpdateCardDto,
    skipNotificationUpdate = false,
  ) {
    const { previousBoxId, ...restUpdateCardDto } = updateCardDto;
    const cardUpdated = await this.prisma.card.update({
      where: { id, userId },
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

  async updateCardsAfterTraining(
    userId: UserId,
    cardsWithAnswer: TrainingResponseDto,
  ) {
    const now = new Date();
    const updates =
      await this.cardDataProcessor.getCardsUpdatesListAfterTraining(
        userId,
        cardsWithAnswer,
        now,
      );
    const updatesJson = updates.map((u) => JSON.stringify(u));
    const query = `SELECT update_cards_after_training($1::jsonb[])`;
    await this.prisma.$executeRawUnsafe(query, updatesJson);
    this.logger.log(cardsWithAnswer.timezone); //в моем случае Asia/Jerusalem
    void this.cardDataProcessor.handleNotificationAfterTraining(
      userId,
      cardsWithAnswer.timezone,
    );
    return updates;
  }

  // async updateCardsAfterTraining(
  //   userId: UserId,
  //   cardsWithAnswer: TrainingResponseDto,
  // ) {
  //   const now = new Date();
  //   const updates =
  //     await this.cardDataProcessor.getCardsUpdatesListAfterTraining(
  //       userId,
  //       cardsWithAnswer,
  //       now,
  //     );
  //   // const start = performance.now();
  //   const updatesJson = updates.map((u) => JSON.stringify(u));
  //   const query = `SELECT update_cards_after_training($1::jsonb[])`;
  //   await this.prisma.$executeRawUnsafe(query, updatesJson);
  //   this.logger.debug(cardsWithAnswer.timeZone);
  //   void this.cardDataProcessor.handleNotificationAfterTraining(userId);
  //   return updates;
  //   // const end = performance.now();
  //   // appendTimeToFile('./updateCardsAfterTraining.txt', end - start);
  //   // this.logger.debug(`updateCardsAfterTraining: ${end - start} ms`);
  // }

  async updateCardsWithPrisma(
    userId: UserId,
    cardsWithAnswer: TrainingResponseDto,
  ) {
    const updates =
      await this.cardDataProcessor.getCardsUpdatesListAfterTraining(
        userId,
        cardsWithAnswer,
        new Date(),
      );
    // const start = performance.now();

    const updatePromises = updates.map((update) =>
      this.prisma.card.update({
        where: {
          id: update.id,
        },
        data: {
          boxId: update.boxId,
          nextTraining: new Date(update.nextTraining),
        },
      }),
    );

    // Выполняем все промисы с помощью Promise.all
    await Promise.all(updatePromises);
    // const end = performance.now();
    // appendTimeToFile('./updateCardsWithPrisma.txt', end - start);
    // this.logger.debug(`updateCardsWithPrisma: ${end - start} ms`);
  }

  deleteSoftByShelfId(shelfId: ShelfId) {
    return this.prisma.card.updateMany({
      where: { shelfId },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  deleteSoftByBoxId(boxId: BoxId) {
    return this.prisma.card.updateMany({
      where: { boxId },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // restoreByBoxId(boxId: BoxId) {
  //   return this.prisma.card.updateMany({
  //     where: { boxId },
  //     data: { isDeleted: false, deletedAt: null },
  //   });
  // }

  // restoreByShelfId(shelfId: ShelfId) {
  //   return this.prisma.card.updateMany({
  //     where: { shelfId },
  //     data: { isDeleted: false, deletedAt: null },
  //   });
  // }

  restoreByCardId(
    userId: UserId,
    shelfId: ShelfId,
    boxId: BoxId,
    cardId: CardId,
  ) {
    return this.prisma.card.update({
      where: { id: cardId, userId },
      data: { isDeleted: false, deletedAt: null, shelfId, boxId },
    });
  }

  // restoreMultipleByCardIds(
  //   userId: UserId,
  //   shelfId: ShelfId,
  //   boxId: BoxId,
  //   cardIds: CardId[],
  // ) {
  //   return this.prisma.card.updateMany({
  //     where: { id: { in: cardIds }, userId },
  //     data: { isDeleted: false, deletedAt: null, shelfId, boxId },
  //   });
  // }

  async findTrainingCardsByShelfIdAndBoxId(
    userId: UserId,
    shelfId: ShelfId | 'all',
    boxId: BoxId | 'all' | 'new' | 'learnt' | 'learning',
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

  async findAll(userId: UserId): Promise<Card[]> {
    return this.prisma.card.findMany({
      where: { userId },
    });
  }

  async findAllWithBox(userId: UserId): Promise<CardIncBox[]> {
    return this.prisma.card.findMany({
      where: { userId, isDeleted: false },
      include: includeBoxWithIndexAndSpecialType,
    });
  }

  async findAllDeletedCards(userId: UserId) {
    return this.prisma.card.findMany({
      where: { userId, isDeleted: true },
      include: {
        box: {
          select: {
            index: true,
            specialType: true,
          },
        },
        shelf: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  async restoreSeveralCards(userId: UserId, moveCardsDto: MoveCardsDto) {
    return await this.prisma.card.updateMany({
      where: { id: { in: moveCardsDto.cardIds }, userId },
      data: {
        shelfId: moveCardsDto.shelfId,
        boxId: moveCardsDto.boxId,
        isDeleted: false,
        deletedAt: null,
      },
    });
  }

  async moveCards(userId: UserId, moveCardsDto: MoveCardsDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, cardsUpdated] = await this.prisma.$transaction([
      this.prisma.card.updateMany({
        where: { id: { in: moveCardsDto.cardIds }, userId },
        data: { shelfId: moveCardsDto.shelfId, boxId: moveCardsDto.boxId },
      }),
      this.prisma.card.findMany({
        where: { id: { in: moveCardsDto.cardIds }, userId },
        include: includeBoxWithIndexAndSpecialType,
      }),
    ]);

    return this.cardDataProcessor.enhanceCardListViewPage(cardsUpdated);
  }

  async deleteSoftByCardIdList(userId, cardIdList: CardId[]) {
    const deletedCards = await this.prisma.card.updateMany({
      where: { id: { in: cardIdList }, userId },
      data: { isDeleted: true, deletedAt: new Date() },
    });

    return deletedCards;
  }

  deleteSoftByCardId(userId: UserId, cardId: CardId) {
    return this.prisma.card.update({
      where: { id: cardId, userId },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  deletePermanentlyByCardIdList(userId: UserId, cardIdList: CardId[]) {
    return this.prisma.card.deleteMany({
      where: { id: { in: cardIdList }, userId },
    });
  }

  deletePermanentlyByCardId(userId: UserId, cardId: CardId) {
    return this.prisma.card.delete({
      where: { id: cardId, userId },
    });
  }

  // нужно, чтобы лишний раз не импортировать cardDataProcessor в user-data-storage
  enhanceCard(card: CardIncBox) {
    return this.cardDataProcessor.enhanceCardViewPage(card);
  }

  // используется только для тестов
  async drop(userId: UserId) {
    const nodeEnv = this.configService.getOrThrow('app.nodeEnv', {
      infer: true,
    });
    if (nodeEnv === 'production') {
      throw new Error('You can not drop cards in production mode');
    }
    const allCards = await this.prisma.card.findMany({ where: { userId } });
    const allBoxes = await this.prisma.box.findMany({
      where: { userId },
      orderBy: { index: 'asc' },
    });
    const now = new Date();
    for (let i = 0; i < allCards.length; i++) {
      const card = allCards[i];
      const boxIndex = Math.floor(i / 5); // 5 карточек в каждой коробке
      const box = allBoxes[boxIndex];

      let nextTraining: Date | null = now;
      if (box.index === 0) {
        nextTraining = null;
      }

      // Обновление карточки
      await this.prisma.card.update({
        where: { id: card.id },
        data: {
          boxId: box.id,
          nextTraining: nextTraining,
        },
      });
    }
  }
}
