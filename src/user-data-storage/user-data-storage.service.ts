import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import { BoxSpecialType, MissedTrainingValue, User } from '@prisma/client';
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
import { UserId } from '@/common/types/prisma-entities';
import { ModuleRef } from '@nestjs/core';
import { RedisService } from '@/redis/redis.service';
import { ShelvesProcessorService } from '@/shelves/services/shelves-data-processor.service';
import { cacheOrFetchData } from '@/utils/helpers/cache-or-fetch';
import { addMinutes, addHours, addDays, addWeeks, addMonths } from 'date-fns';
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
  // private cardsService: CardsService;
  private nodeEnv: string;
  private readonly logger = new Logger(UserDataStorageService.name);
  // private cupboards = new Map<string, CupboardObject>();
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly httpService: HttpService,
    // @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
    // @Inject(forwardRef(() => BoxesService))
    private readonly boxesService: BoxesService,
    // @Inject(forwardRef(() => ShelvesService))
    private readonly shelvesService: ShelvesService,
    private readonly shelvesProcessorService: ShelvesProcessorService,
    // private readonly cardsService: CardsService,
    // private readonly boxesService: BoxesService,
    // private readonly shelvesService: ShelvesService,
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
    // let cupboardData =
    //   await this.redisService.getCupboardObjectByUserId(userId);
    // if (!cupboardData) {
    //   this.logger.log('cupboardData is null');
    //   cupboardData = await this.shelvesService.getCupboardObject(userId);
    //   await this.redisService.saveCupboardObjectByUserId(userId, cupboardData);
    // } else {
    //   this.logger.log('cupboardData уже в редисе!!!!!');
    // }
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

  // Дополнительная функция для добавления ведущих нулей
  padTime(time: number) {
    return time.toString().padStart(2, '0');
  }

  // @WaitForUnlock('updateCardsLock')
  async getCupboardPageData(userId: UserId): Promise<CupboardSchema> {
    const shelvesData = await this.shelvesService.findAllWithBoxCard(userId);

    const commonShelf: CommonShelfFrontedResponse = JSON.parse(
      JSON.stringify(commonShelfTemplate),
    );
    const now = new Date();
    // const delay = dateTime.getTime() - now.getTime();
    const formattedShelves = shelvesData.map((shelf, index) => {
      let allCardsInShelf = 0;
      let trainCardsInShelf = 0;
      const boxesData: BoxSchemaFrontend[] = shelf.box.map((box) => {
        const boxSpecialType = box.specialType;
        const allCardsInBox = box.card.length;
        let trainCardsInBox = box.card.filter((card) => {
          return card.nextTraining ? card.nextTraining < now : false;
        }).length;
        // const trainCardsInBox = box.card.filter((card) => {
        //   console.log(
        //     this.formatTime(card.nextTraining),
        //     this.formatTime(now),
        //     card.nextTraining > now,
        //   );
        //   return card.nextTraining ? card.nextTraining < now : false;
        // }).length;

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
          // specialType: specialType,
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
      boxes,
      cards,
      entitiesCount: {
        shelves: shelvesDeleted.length,
        boxes: boxes.length,
        cards: cards.length,
      },
      shelvesAndBoxesData,
    };
    // return getTrashPageDataFromDbData(deletedShelvesAndShelvesData);
  }

  // D:\Programs\PostgreSQL\bin\pg_dump -U postgres memobox > D:\Programs\PostgreSQL\bin\db_backup.sql
  // D:\Programs\PostgreSQL\bin\psql -U postgres -d memobox -f D:\Programs\PostgreSQL\bin\db_backup.sql

  // D:\Programs\PostgreSQL\bin\psql -U postgres -d memobox
  // show client_encoding;
  // set client_encoding to 'UTF8';

  async saveDb() {
    if (this.nodeEnv === 'production') {
      throw new Error('You can not restore database in production mode');
    }
    const isTesting = this.nodeEnv === 'testing';
    const isDevelopment = this.nodeEnv === 'development';
    let result;
    // await this.prisma.$disconnect();
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

      // await this.prisma.$connect();
      return result;
    } catch (error) {
      console.error('Ошибка при создании резервной копии:', error);
      // await this.prisma.$connect();
      return error;
    }
  }

  async restoreDb() {
    if (this.nodeEnv === 'production') {
      throw new Error('You can not restore database in production mode');
    }
    const isTesting = this.nodeEnv === 'testing';
    const isDevelopment = this.nodeEnv === 'development';
    let result;
    // await this.prisma.$disconnect();
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
        const { data } = await firstValueFrom(
          this.httpService.get(`http://${dbHost}:3001/restore-db`),
        );
        result = data;
      }
      // console.log('Бд восстановлена');
      // await this.prisma.$connect();
      return result;
    } catch (error) {
      console.error('Ошибка при восстановлении базы данных:', error);
      // await this.prisma.$connect();
      throw error;
    }
  }
}

export class CupboardClass {
  private readonly logger = new Logger(CupboardClass.name);
  private shelves: Record<string, ShelfData>;

  constructor(shelvesData: Record<string, ShelfData>) {
    this.shelves = shelvesData;
  }

  getNextTrainingTimeByCardData({
    id,
    shelfId,
    boxId,
    answer,
    now,
  }: CardTrainingData): TrainingOutcome {
    const shelf = this.shelves[shelfId];
    const shelfBoxes = shelf.boxes;
    const currentBox = shelfBoxes[boxId];
    let targetBoxId: string;
    if (currentBox.index === 0) {
      const targetBox = shelfBoxes[currentBox.nextBoxIdKey!];
      const nextTraining = this.calculateNextTrainingTime(
        now,
        targetBox.timing,
      );
      // no matter what answer is, we should move card to the box 1
      return { boxId: currentBox.nextBoxIdKey!, id, nextTraining };
    }
    if (currentBox.index === 1 && answer !== 'good') {
      const targetBox = currentBox;
      const nextTraining = this.calculateNextTrainingTime(
        now,
        targetBox.timing,
      );
      // no matter what answer is, we should not move card to the new cards box
      return { boxId, id, nextTraining };
    }

    // console.log(currentBox);
    // let nextTraining: Date;

    switch (answer) {
      case 'good':
        targetBoxId = currentBox.nextBoxIdKey || boxId; // If no next box, stay in current
        break;
      case 'bad':
        targetBoxId = currentBox.previousBoxIdKey || boxId; // If no previous box, stay in current
        break;
      case 'middle':
      default:
        targetBoxId = boxId;
        break;
    }

    const targetBox = shelfBoxes[targetBoxId];
    const nextTraining = this.calculateNextTrainingTime(now, targetBox.timing);
    // targetBoxId = targetBoxId
    return { boxId: targetBoxId, id, nextTraining };
  }

  private calculateNextTrainingTime(
    now: Date | string,
    timing: TimingBlock,
  ): Date | string {
    const currentTime = now ?? new Date();

    // Расчет нового времени тренировки
    let newTrainingTime = new Date(currentTime);
    newTrainingTime = addMinutes(newTrainingTime, timing.minutes);
    newTrainingTime = addHours(newTrainingTime, timing.hours);
    newTrainingTime = addDays(newTrainingTime, timing.days);
    newTrainingTime = addWeeks(newTrainingTime, timing.weeks);
    newTrainingTime = addMonths(newTrainingTime, timing.months);
    // newTrainingTime.setDate(
    //   newTrainingTime.getDate() + timing.days + timing.weeks * 7,
    // );
    // newTrainingTime.setHours(newTrainingTime.getHours() + timing.hours);
    // newTrainingTime.setMinutes(newTrainingTime.getMinutes() + timing.minutes);
    // newTrainingTime.setMonth(newTrainingTime.getMonth() + timing.months);

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

//     // console.log(currentBox);
//     // let nextTraining: Date;

//     switch (answer) {
//       case 'good':
//         targetBoxId = currentBox.nextBoxIdKey || boxId; // If no next box, stay in current
//         break;
//       case 'bad':
//         targetBoxId = currentBox.previousBoxIdKey || boxId; // If no previous box, stay in current
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

//     // Расчет нового времени тренировки
//     const newTrainingTime = new Date(currentTime);
//     newTrainingTime.setDate(
//       newTrainingTime.getDate() + timing.days + timing.weeks * 7,
//     );
//     newTrainingTime.setHours(newTrainingTime.getHours() + timing.hours);
//     newTrainingTime.setMinutes(newTrainingTime.getMinutes() + timing.minutes);
//     newTrainingTime.setMonth(newTrainingTime.getMonth() + timing.months);

//     return newTrainingTime.toISOString();
//     // return newTrainingTime;
//     // Implement the logic to calculate the next training time based on the timing
//     // ...
//   }

//   // Additional methods as needed
// }
