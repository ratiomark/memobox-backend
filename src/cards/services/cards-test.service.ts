import { NotificationService } from '@/notification/notification.service';
import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { User, Shelf, Box, BoxSpecialType } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'nestjs-prisma';
import { CardIncBox, TrainingCardsCondition } from '../entities/card.entity';
import { CardProcessorService } from './cards-data-processor.service';
import { includeBoxWithIndexAndSpecialType } from '../const/include-box';
import { UserDataStorageService } from '@/user-data-storage/user-data-storage.service';

@Injectable()
export class CardsTestService {
  private readonly logger = new Logger(CardsTestService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardDataProcessor: CardProcessorService,
    private readonly i18n: I18nService,
    private readonly notificationService: NotificationService,
    // @Inject(forwardRef(() => UserDataStorageService))
    // private readonly userDataStorageService: UserDataStorageService,
  ) {}
  async getCardsByShelfIdAndBoxId(
    userId: User['id'],
    shelfId: Shelf['id'] | 'all',
    boxId: Box['id'] | 'all' | 'new' | 'learnt' | 'learning',
  ) {
    // const cards: Card[] = [];
    // const mainCondition = this.cardDataProcessor.createCondition(
    //   userId,
    //   shelfId,
    //   boxId,
    // );
    const trainingCards: CardIncBox[] = await this.prisma.card.findMany({
      where: { shelfId, boxId },
      include: includeBoxWithIndexAndSpecialType,
    });
    const trainingCardsEnhanced =
      this.cardDataProcessor.enhanceCardListTrainingPage(trainingCards);
    this.logger.debug(trainingCards);
    return trainingCardsEnhanced;
    // const cards = await this.prisma.card.findMany({
    //   where: { shelfId, boxId },
    // });
  }

  async getCardsFromNewBox(userId: User['id']) {
    const newCards = await this.prisma.card.findMany({
      where: {
        userId,
        box: {
          index: 0,
        },
      },
    });
    return newCards;
  }
}
