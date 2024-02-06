import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { MoveCardsDto, UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'nestjs-prisma';
import { Box, Card, Prisma, Shelf, User } from '@prisma/client';
import { CardProcessorService } from './services/cards-data-processor.service';
import { CardIncBox } from './entities/card.entity';
import { includeBoxWithIndexAndSpecialType } from './const/include-box';
import { TrainingResponseDto } from './dto/update-cards-after-training.dto';
import { UserId, CardId, ShelfId, BoxId } from '@/common/types/prisma-entities';
import { UserDataStorageService } from '@/user-data-storage/user-data-storage.service';
import { Lock } from '@/common/decorators/lock.decorator';
import { sleep } from '@/utils/common/sleep';
import { LOCK_KEYS } from '@/common/const/lock-keys-patterns';
import { appendTimeToFile } from '@/utils/helpers/append-data-to-file';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);
  constructor(
    private readonly prisma: PrismaService,
    // private readonly cardDataProcessor: CardProcessorService,
    // @Inject(forwardRef(() => CardProcessorService))
    private readonly cardDataProcessor: CardProcessorService,
    // @Inject(forwardRef(() => UserDataStorageService))
    // private readonly userDataStorageService: UserDataStorageService,
  ) {}

  async drop(userId: UserId) {
    const allCards = await this.prisma.card.findMany();
    const allBoxes = await this.prisma.box.findMany({
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
  // async drop(userId: UserId) {
  //   const boxNew = await this.prisma.box.findFirst({ where: { index: 0 } });
  //   // const box1 = await this.prisma.box.findFirst({ where: { index: 1 } });
  //   // const cardsToDrop = cards.filter((card) => {
  //   //   return card.box.index === 1;
  //   // });
  //   // const cardsToDropIds = cardsToDrop.map((card) => card.id);
  //   await this.prisma.card.updateMany({
  //     where: { userId, box: { index: 1 } },
  //     // where: { id: { in: cardsToDropIds } },
  //     data: { boxId: boxNew!.id, nextTraining: null },
  //   });
  // }

  async create(userId: UserId, createCardDto: CreateCardDto): Promise<Card> {
    const card = await this.prisma.card.create({
      data: { ...createCardDto, userId },
    });
    return card;
  }

  async update(
    id: CardId,
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

  async updateCardsAfterTraining(
    userId: UserId,
    cardsWithAnswer: TrainingResponseDto,
  ) {
    const updates =
      await this.cardDataProcessor.updateCardsAfterTrainingHandler(
        userId,
        cardsWithAnswer,
      );
    // const start = performance.now();

    const updatesJson = updates.map((u) => JSON.stringify(u));
    const query = `SELECT update_cards_after_training($1::jsonb[])`;

    await this.prisma.$executeRawUnsafe(query, updatesJson);

    // const end = performance.now();
    // appendTimeToFile('./updateCardsAfterTraining.txt', end - start);
    // this.logger.debug(`updateCardsAfterTraining: ${end - start} ms`);
  }

  async updateCardsWithPrisma(
    userId: UserId,
    cardsWithAnswer: TrainingResponseDto,
  ) {
    const updates =
      await this.cardDataProcessor.updateCardsAfterTrainingHandler(
        userId,
        cardsWithAnswer,
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

  restoreByBoxId(boxId: BoxId) {
    return this.prisma.card.updateMany({
      where: { boxId },
      data: { isDeleted: false, deletedAt: null },
    });
  }

  restoreByShelfId(shelfId: ShelfId) {
    return this.prisma.card.updateMany({
      where: { shelfId },
      data: { isDeleted: false, deletedAt: null },
    });
  }

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

  async deleteSoftByCardIdList(cardIds: CardId[]) {
    const deletedCards = this.prisma.card.updateMany({
      where: { id: { in: cardIds } },
      data: { isDeleted: true, deletedAt: new Date() },
    });

    return deletedCards;
  }

  deleteSoftByCardId(cardId: CardId) {
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
