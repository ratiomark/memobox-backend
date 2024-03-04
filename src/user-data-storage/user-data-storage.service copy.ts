import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import { Box, BoxSpecialType, MissedTrainingValue, User } from '@prisma/client';
import { CommonShelfFrontedResponse } from '@/aggregate/entities/types';
import { CardsService } from '@/cards/cards.service';
import { commonShelfTemplate } from '@/common/const/commonShelfTemplate';
import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';

import { ShelvesService } from '@/shelves/shelves.service';
import { CupboardSchema, BoxSchemaFrontend } from './types/fronted-responses';
import { I18nService } from 'nestjs-i18n';
import { BoxesService } from '@/boxes/boxes.service';
import {
  ShelfData,
  CardTrainingData,
  TrainingOutcome,
  CupboardObject,
} from '@/common/types/entities-types';
import { TimingBlock } from '@/aggregate/entities/settings-types';
import { ShelfId, UserId } from '@/common/types/prisma-entities';
import { ModuleRef } from '@nestjs/core';
import { RedisService } from '@/redis/redis.service';
import { ShelvesProcessorService } from '@/shelves/services/shelves-data-processor.service';
import { cacheOrFetchData } from '@/utils/helpers/cache-or-fetch';
import {
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  subDays,
} from 'date-fns';
import { PrismaService } from 'nestjs-prisma';
import { AllConfigType } from '@/config/config.type';
import { ConfigService, PathImpl2 } from '@nestjs/config';
import { exec } from 'child_process';
import { promisify } from 'util';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const execAsync = promisify(exec);

@Injectable()
export class UserDataStorageService implements OnModuleInit {
  private nodeEnv: string;
  private readonly logger = new Logger(UserDataStorageService.name);
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly httpService: HttpService,
    private readonly cardsService: CardsService,
    private readonly boxesService: BoxesService,
    private readonly shelvesService: ShelvesService,
    private readonly shelvesProcessorService: ShelvesProcessorService,
    private readonly i18n: I18nService,
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}
  async onModuleInit() {
    const nodeEnv = this.configService.getOrThrow('app.nodeEnv', {
      infer: true,
    });
    this.nodeEnv = nodeEnv;
    if (this.nodeEnv === 'testing' || this.nodeEnv === 'development') {
      this.logger.warn('Testing mode [on init] - ');
      await this.saveDb();
    }
  }

  async getCupboardClass(userId: UserId): Promise<CupboardClass> {
    const cupboardData = await cacheOrFetchData<CupboardObject>(
      userId,
      this.redisService.getCupboardObjectByUserId.bind(this.redisService),
      this.shelvesService.getCupboardObject.bind(this.shelvesService),
      this.redisService.saveCupboardObjectByUserId.bind(this.redisService),
    );
    return new CupboardClass(cupboardData);
  }

  formatTime(date: Date | null) {
    if (!date) {
      return null;
    }
    const month = date.getUTCMonth() + 1;
    const day = date.getDay() + 1;
    const hours = this.padTime(date.getHours());
    const minutes = this.padTime(date.getMinutes());
    const seconds = this.padTime(date.getSeconds());
    return `${month} ${day}  ${hours}:${minutes}:${seconds}`;
  }

  padTime(time: number) {
    return time.toString().padStart(2, '0');
  }

  async getCupboardPageData(userId: UserId): Promise<CupboardSchema> {
    const shelvesData = await this.shelvesService.findAllWithBoxCard(userId);

    const commonShelf: CommonShelfFrontedResponse = JSON.parse(
      JSON.stringify(commonShelfTemplate),
    );
    const now = new Date();
    const formattedShelves = shelvesData.map((shelf, index) => {
      let allCardsInShelf = 0;
      let trainCardsInShelf = 0;
      const boxesData: BoxSchemaFrontend[] = shelf.box.map((box) => {
        const boxSpecialType = box.specialType;
        const allCardsInBox = box.card.length;
        let trainCardsInBox = box.card.filter((card) => {
          if (boxSpecialType === BoxSpecialType.new) return false;
          return card.nextTraining ? card.nextTraining < now : false;
        }).length;

        allCardsInShelf += allCardsInBox;
        trainCardsInShelf += trainCardsInBox;

        switch (boxSpecialType) {
          case BoxSpecialType.none:
            commonShelf.learning.all += allCardsInBox;
            commonShelf.learning.train += trainCardsInBox;
            commonShelf.learning.wait += allCardsInBox - trainCardsInBox;
            break;
          case BoxSpecialType.learnt:
            commonShelf.learnt.all += allCardsInBox;
            commonShelf.learnt.train += trainCardsInBox;
            commonShelf.learnt.wait += allCardsInBox - trainCardsInBox;
            break;
          case BoxSpecialType.new:
            commonShelf.new.all += allCardsInBox;
            if (NEW_CARDS_COUNTS_AS_TRAIN) {
              trainCardsInBox = allCardsInBox;
              trainCardsInShelf += allCardsInBox;
            }
            break;
        }

        return {
          id: box.id,
          index: box.index,
          specialType: boxSpecialType,
          missedTrainingValue:
            box.missedTrainingValue ?? MissedTrainingValue.none,
          timing: box.timing,
          data: {
            all: allCardsInBox,
            train: trainCardsInBox,
            wait: allCardsInBox - trainCardsInBox,
          },
        };
      });

      return {
        id: shelf.id,
        index: index,
        isCollapsed: shelf.isCollapsed,
        title: shelf.title,
        missedTrainingValue: shelf.missedTrainingValue,
        isDeleting: false,
        isDeleted: false,
        boxesData: boxesData,
        data: {
          all: allCardsInShelf,
          train: trainCardsInShelf,
          wait: allCardsInShelf - trainCardsInShelf,
        },
      };
    });
    commonShelf.data.all =
      commonShelf.new.all + commonShelf.learning.all + commonShelf.learnt.all;
    commonShelf.data.train =
      commonShelf.learning.train +
      commonShelf.learnt.train +
      (NEW_CARDS_COUNTS_AS_TRAIN ? commonShelf.new.all : 0);
    commonShelf.data.wait =
      commonShelf.learning.wait +
      commonShelf.learnt.wait +
      (!NEW_CARDS_COUNTS_AS_TRAIN ? commonShelf.new.all : 0);

    const result = {
      shelves: formattedShelves,
      commonShelf: { ...commonShelf, isCollapsed: true },
    };
    return result;
  }

  async getViewPageData(userId: UserId) {
    const [cards, shelvesIncBoxes] = await Promise.all([
      this.cardsService.findAllWithBox(userId),
      this.shelvesService.getShelvesAndBoxesData(userId),
    ]);

    const enhancedCards = cards.map((card) =>
      this.cardsService.enhanceCard(card),
    );

    return {
      cards: enhancedCards,
      shelvesAndBoxesData:
        this.shelvesProcessorService.createShelvesAndBoxesDataFromShelvesIncBox(
          shelvesIncBoxes,
        ),
    };
  }

  async getTrashPageData(userId: UserId) {
    const [shelvesDeleted, boxes, cards, shelvesAndBoxesData] =
      await Promise.all([
        this.shelvesService.findAllDeletedShelves(userId),
        this.boxesService.findAllDeletedBoxes(userId),
        this.cardsService.findAllDeletedCards(userId),
        this.shelvesService.getShelvesAndBoxesData(userId),
      ]);

    return {
      shelves: shelvesDeleted,
      boxes: this.sortTrashBoxesBeforeResponse(boxes),
      cards,
      boxesTest: this.sortTrashBoxesBeforeResponse(boxes, true),
      entitiesCount: {
        shelves: shelvesDeleted.length,
        boxes: boxes.length,
        cards: cards.length,
      },
      shelvesAndBoxesData,
    };
  }

  sortTrashBoxesBeforeResponse(
    boxes: Box[],
    test: boolean = false,
  ): Box[] | Box[][] {
    boxes.sort((a, b) => {
      if (a.shelfId < b.shelfId) return -1;
      if (a.shelfId > b.shelfId) return 1;
      return 0;
    });
    const testResponse: Box[][] = [];
    for (let i = 0; i < boxes.length; i++) {
      const shelfId = boxes[i].shelfId;
      const shelfObjects: Box[] = [];
      let j = i;
      while (j < boxes.length && boxes[j].shelfId === shelfId) {
        shelfObjects.push(boxes[j]);
        j++;
      }
      shelfObjects.sort(this.sortTrashBoxes);
      if (test) {
        testResponse.push(shelfObjects);
      } else {
        boxes.splice(i, shelfObjects.length, ...shelfObjects);
      }
      i += shelfObjects.length - 1;
    }

    return test ? testResponse : boxes;
  }

  sortTrashBoxes(a: Box, b: Box) {
    if (a.specialType === 'new' && b.specialType !== 'new') return -1;
    if (a.specialType !== 'new' && b.specialType === 'new') return 1;
    if (a.specialType === 'learnt' && b.specialType !== 'learnt') return 1;
    if (a.specialType !== 'learnt' && b.specialType === 'learnt') return -1;
    return a.index - b.index;
  }

  async saveDb() {
    if (this.nodeEnv === 'production') {
      throw new Error('You can not restore database in production mode');
    }
    const isDevelopment = this.nodeEnv === 'development';
    let result;
    const [dbName, username, dbPassword, dbHost, postgresBinPath]: string[] = [
      'name',
      'username',
      'password',
      'host',
      'postgresBinPath',
    ].map((key) =>
      this.configService.getOrThrow(
        `database.${key}` as PathImpl2<AllConfigType>,
        {
          infer: true,
        },
      ),
    );
    try {
      if (isDevelopment && !postgresBinPath) {
        throw new Error('No path to postgres binaries specified');
      }
      if (isDevelopment) {
        const dumpCommand = `${postgresBinPath}\\pg_dump -U ${username} --clean ${dbName} > ${postgresBinPath}\\db_backup.dump`;
        await execAsync(dumpCommand, {
          env: {
            PGPASSWORD: dbPassword,
          },
        });
        result = 'Database saved successfully';
      } else {
        const { data } = await firstValueFrom(
          this.httpService.get(`http://${dbHost}:3001/save-db`),
        );
        result = data;
      }

      return result;
    } catch (error) {
      console.error('Ошибка при создании резервной копии:', error);
      return error;
    }
  }

  async restoreDb() {
    if (this.nodeEnv === 'production') {
      throw new Error('You can not restore database in production mode');
    }
    const isDevelopment = this.nodeEnv === 'development';
    let result: string;
    const [dbName, username, dbPassword, dbHost, postgresBinPath]: string[] = [
      'name',
      'username',
      'password',
      'host',
      'postgresBinPath',
    ].map((key) =>
      this.configService.getOrThrow(
        `database.${key}` as PathImpl2<AllConfigType>,
        {
          infer: true,
        },
      ),
    );
    try {
      if (isDevelopment && !postgresBinPath) {
        throw new Error('No path to postgres binaries specified');
      }

      if (isDevelopment) {
        const restoreCommand = `${postgresBinPath}\\psql -U ${username} -d ${dbName} -f ${postgresBinPath}\\db_backup.dump`;

        const { stdout } = await execAsync(restoreCommand, {
          env: {
            PGPASSWORD: dbPassword,
          },
        });
        result = 'Database restored successfully';
      } else {
        const { data } = await firstValueFrom<{ data: string }>(
          this.httpService.get(`http://${dbHost}:3001/restore-db`),
        );
        result = data;
      }
      return result;
    } catch (error) {
      console.error('Ошибка при восстановлении базы данных:', error);
      throw error;
    }
  }
}

export class CupboardClass {
  private readonly logger = new Logger(CupboardClass.name);
  private shelves: Record<UserId, ShelfData>;

  constructor(shelvesData: Record<UserId, ShelfData>) {
    this.shelves = shelvesData;
  }

  getBoxesByShelfId(shelfId: ShelfId) {
    return this.shelves[shelfId].boxes;
  }

  getNextTrainingTimeByCardData({
    id,
    shelfId,
    boxId,
    answer,
    now,
  }: CardTrainingData): TrainingOutcome {
    const shelfBoxes = this.getBoxesByShelfId(shelfId);
    const currentBox = shelfBoxes[boxId];
    let targetBoxId: string;
    if (currentBox.index === 0) {
      const targetBox = shelfBoxes[currentBox.nextBoxIdKey];
      const nextTraining = this.calculateNextTrainingTime(
        now,
        targetBox.timing,
      );
      return { boxId: currentBox.nextBoxIdKey, id, nextTraining };
    } else if (currentBox.index === 1 && answer !== 'good') {
      const targetBox = currentBox;
      const nextTraining = this.calculateNextTrainingTime(
        now,
        targetBox.timing,
      );
      return { boxId, id, nextTraining };
    }

    switch (answer) {
      case 'good':
        targetBoxId = currentBox.nextBoxIdKey;
        break;
      case 'bad':
        targetBoxId = currentBox.previousBoxIdKey;
        break;
      case 'middle':
      default:
        targetBoxId = boxId;
        break;
    }

    const targetBox = shelfBoxes[targetBoxId];
    const nextTraining = this.calculateNextTrainingTime(now, targetBox.timing);
    return { boxId: targetBoxId, id, nextTraining };
  }

  public calculateNextTrainingTime(now: Date, timing: TimingBlock): string {
    const currentTime = now ?? new Date();

    let newTrainingTime: Date;
    newTrainingTime = addMinutes(currentTime, timing.minutes);
    newTrainingTime = addHours(newTrainingTime, timing.hours);
    newTrainingTime = addDays(newTrainingTime, timing.days);
    newTrainingTime = addWeeks(newTrainingTime, timing.weeks);
    newTrainingTime = addMonths(newTrainingTime, timing.months);

    return newTrainingTime.toISOString();
  }
}

// export class CupboardDataObject {
//   private readonly logger = new Logger(CupboardDataObject.name);
//   private shelves: Record<string, ShelfData>;

//   constructor(shelvesData: Record<string, ShelfData>) {
//     this.shelves = shelvesData;
//   }

//   getNextTrainingTimeByCardData({
//     id,
//     shelfId,
//     boxId,
//     answer,
//     nextTraining: nextTrainingCurrent,
//   }: CardTrainingData): TrainingOutcome {
//     const shelf = this.shelves[shelfId];
//     const currentBox = shelf[boxId];
//     let targetBoxId: string;
//     if (currentBox.index === 0) {
//       const targetBox = shelf[currentBox.nextBoxIdKey!];
//       const nextTraining = this.calculateNextTrainingTime(
//         nextTrainingCurrent,
//         targetBox.timing,
//       );

//       return { boxId: currentBox.nextBoxIdKey!, id, nextTraining };
//     }

//     switch (answer) {
//       case 'good':
//         break;
//       case 'bad':
//         break;
//       case 'middle':
//       default:
//         targetBoxId = boxId;
//         break;
//     }

//     const targetBox = shelf[targetBoxId];
//     const nextTraining = this.calculateNextTrainingTime(
//       nextTrainingCurrent,
//       targetBox.timing,
//     );

//     return { boxId: targetBoxId, id, nextTraining };
//   }

//   private calculateNextTrainingTime(
//     cardNextTrainingCurrent: Date | string,
//     timing: TimingBlock,
//   ): Date | string {
//     const currentTime = cardNextTrainingCurrent ?? new Date();

//     const newTrainingTime = new Date(currentTime);
//     newTrainingTime.setDate(
//       newTrainingTime.getDate() + timing.days + timing.weeks * 7,
//     );
//     newTrainingTime.setHours(newTrainingTime.getHours() + timing.hours);
//     newTrainingTime.setMinutes(newTrainingTime.getMinutes() + timing.minutes);
//     newTrainingTime.setMonth(newTrainingTime.getMonth() + timing.months);

//     return newTrainingTime.toISOString();
//   }

// }
