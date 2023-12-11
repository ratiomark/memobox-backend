import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
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
} from '@/common/types/entities-types';
import { TimingBlock } from '@/aggregate/entities/settings-types';
import { UserId } from '@/common/types/prisma-entities';
import { ModuleRef } from '@nestjs/core';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class UserDataStorageService {
  // private cardsService: CardsService;
  private readonly logger = new Logger(UserDataStorageService.name);
  // private cupboards = new Map<string, CupboardObject>();
  constructor(
    private readonly moduleRef: ModuleRef,
    // @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
    // @Inject(forwardRef(() => BoxesService))
    private readonly boxesService: BoxesService,
    // @Inject(forwardRef(() => ShelvesService))
    private readonly shelvesService: ShelvesService,
    // private readonly cardsService: CardsService,
    // private readonly boxesService: BoxesService,
    // private readonly shelvesService: ShelvesService,
    private readonly i18n: I18nService,
    private readonly redisService: RedisService,
  ) {}
  // onModuleInit() {
  //   this.cardsService = this.moduleRef.get(CardsService, { strict: false });
  // }
  // private get cardsService() {
  //   if (!this._cardsService) {
  //     this._cardsService = this.cardsServiceGetter();
  //   }
  //   return this._cardsService;
  // }

  async getCupboardClass(userId: UserId): Promise<CupboardDataObject> {
    let cupboardData =
      await this.redisService.getCupboardObjectByUserId(userId);
    if (!cupboardData) {
      this.logger.log('cupboardData is null');
      cupboardData = await this.shelvesService.getCupboardObject(userId);
      await this.redisService.saveCupboardObjectByUserId(userId, cupboardData);
    } else {
      this.logger.log('cupboardData уже в редисе!!!!!');
    }
    // вот тут можно обратиться к редис сервису и получить объект, только нужно его туда положить
    // const obj = await this.shelvesService.getCupboardObject(userId);
    // this.
    return new CupboardDataObject(cupboardData);
    // return new CupboardDataObject(
    //   await this.shelvesService.getCupboardObject(userId),
    // );
    // if (!this.cupboards.has(userId)) {
    //   const cupboardObject =
    //     await this.shelvesService.getCupboardObject(userId);
    //   // const cupboardDataObject = new CupboardDataObject(cupboardObject);
    //   this.cupboards.set(userId, cupboardObject);
    // }
    // console.log(this.cupboards);
    // return new CupboardDataObject(this.cupboards.get(userId)!);
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
        this.shelvesService.createShelvesAndBoxesDataFromShelvesIncBox(
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
    // const deletedShelvesAndShelvesData =
    // await this.shelvesService.findAllDeletedBoxes(userId);

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
}

export class CupboardDataObject {
  private shelves: Record<string, ShelfData>;

  constructor(shelvesData: Record<string, ShelfData>) {
    this.shelves = shelvesData;
  }

  getNextTrainingTimeByCardData({
    id,
    shelfId,
    boxId,
    answer,
    nextTraining: nextTrainingCurrent,
  }: CardTrainingData): TrainingOutcome {
    const shelf = this.shelves[shelfId];
    const currentBox = shelf[boxId];
    let targetBoxId: string;
    if (currentBox.index === 0) {
      const targetBox = shelf[currentBox.nextBoxIdKey!];
      const nextTraining = this.calculateNextTrainingTime(
        nextTrainingCurrent,
        targetBox.timing,
      );

      return { boxId: currentBox.nextBoxIdKey!, id, nextTraining };
    }

    console.log(currentBox);
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

    const targetBox = shelf[targetBoxId];
    const nextTraining = this.calculateNextTrainingTime(
      nextTrainingCurrent,
      targetBox.timing,
    );

    return { boxId: targetBoxId, id, nextTraining };
  }

  private calculateNextTrainingTime(
    cardNextTrainingCurrent: Date | string,
    timing: TimingBlock,
  ): Date | string {
    const currentTime = cardNextTrainingCurrent ?? new Date();

    // Расчет нового времени тренировки
    const newTrainingTime = new Date(currentTime);
    newTrainingTime.setDate(
      newTrainingTime.getDate() + timing.days + timing.weeks * 7,
    );
    newTrainingTime.setHours(newTrainingTime.getHours() + timing.hours);
    newTrainingTime.setMinutes(newTrainingTime.getMinutes() + timing.minutes);
    newTrainingTime.setMonth(newTrainingTime.getMonth() + timing.months);

    return newTrainingTime.toISOString();
    // return newTrainingTime;
    // Implement the logic to calculate the next training time based on the timing
    // ...
  }

  // Additional methods as needed
}

// @Injectable()
// export class UserDataStorageProxyService {
//   private get userDataStorageService() {
//     return this.moduleRef.get(UserDataStorageService, { strict: false });
//   }

//   constructor(private moduleRef: ModuleRef) {}

//   getUserData(userId: string) {
//     return this.userDataStorageService.getCupboardObject(userId);
//   }
// }
// function getTrashPageDataFromDbData(shelves: ShelfIncBoxesIncCards[]) {
//   if (shelves.length === 0) {
//     return { shelves: [] };
//   }
//   if (shelves.length === 1) {
//     const shelf = shelves[0];
//     return {
//       cards: shelf.card,
//       boxes: shelf.box,
//       shelves: [shelf],
//     };
//   }
//   const boxes = shelves.reduce((acc, shelf) => {
//     const newBoxesObject = {
//       ...shelf.box,
//       shelfId: shelf.id,
//       shelfTitle: shelf.title,
//     };
//     return [newBoxesObject, ...acc];
//   }, []);

//   const cards = shelves.reduce((acc, shelf) => {
//     return [...shelf.card, ...acc];
//   }, []);

//   return {
//     shelves: shelves,
//     boxes,
//     cards,
//   };
// }
