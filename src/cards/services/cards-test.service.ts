import { NotificationService } from '@/notification/notification.service';
import { Injectable, Logger } from '@nestjs/common';
import { User, Shelf, Box, BoxSpecialType } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'nestjs-prisma';
import { TrainingCardsCondition } from '../entities/card.entity';
import { CardDataProcessorService } from './cards-data-processor.service';
import { includeBoxWithIndexAndSpecialType } from '../consts/include-box';

@Injectable()
export class CardsTestService {
  private readonly logger = new Logger(CardsTestService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardDataProcessor: CardDataProcessorService,
    private readonly i18n: I18nService,
    private readonly notificationService: NotificationService,
  ) {}
  async getCardsByShelfIdAndBoxId(
    userId: User['id'],
    shelfId: Shelf['id'] | 'all',
    boxId: Box['id'] | 'all' | 'new' | 'learnt' | 'learning',
  ) {
    // const cards: Card[] = [];
    const mainCondition = this.cardDataProcessor.createCondition(
      userId,
      shelfId,
      boxId,
    );
    const trainingCards = await this.prisma.card.findMany({
      where: mainCondition,
    });
    // console.log(trainingCards);
    return trainingCards;
    // const cards = await this.prisma.card.findMany({
    //   where: { shelfId, boxId },
    // });
  }
}
