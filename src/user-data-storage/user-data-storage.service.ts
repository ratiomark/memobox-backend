import { Injectable } from '@nestjs/common';
import {
  Box,
  BoxSpecialType,
  Card,
  MissedTrainingValue,
  Shelf,
  User,
} from '@prisma/client';
import {
  CommonShelfFrontedResponse,
  ShelfIncBoxes,
  ShelfIncBoxesIncCards,
} from '@/aggregate/entities/types';
import { CardsService } from '@/cards/cards.service';
import { commonShelfTemplate } from '@/common/const/commonShelfTemplate';
import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';

import { ShelvesService } from '@/shelves/shelves.service';
import { CupboardSchema, BoxSchemaFrontend } from './types/fronted-responses';
import { I18nService } from 'nestjs-i18n';
import { cards } from 'prisma/mock-data/staticDataFromDb';
import { timeLeft } from '@/cards/helpers/timeLeft';
import { UpdateCardDto } from '@/cards/dto/update-card.dto';
import { plainToClass } from 'class-transformer';
// import { zonedTimeToUtc } from 'date-fns-tz';
@Injectable()
export class UserDataStorageService {
  constructor(
    private readonly cardsService: CardsService,
    private readonly shelvesService: ShelvesService,
    private readonly i18n: I18nService,
  ) {}

  async getCupboardPageData(userId: User['id']): Promise<CupboardSchema> {
    const shelvesData = await this.shelvesService.findAllWithBoxCard(userId);

    const commonShelf: CommonShelfFrontedResponse = JSON.parse(
      JSON.stringify(commonShelfTemplate),
    );

    const formattedShelves = shelvesData.map((shelf) => {
      let allCardsInShelf = 0;
      let trainCardsInShelf = 0;
      const boxesData: BoxSchemaFrontend[] = shelf.box.map((box) => {
        const boxSpecialType = box.specialType;
        const allCardsInBox = box.card.length;
        const trainCardsInBox = box.card.filter((card) =>
          card.nextTraining ? card.nextTraining < new Date() : false,
        ).length;

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
        index: shelf.index,
        isCollapsed: shelf.isCollapsed,
        title: shelf.title,
        missedTrainingValue: shelf.missedTrainingValue,
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

  async getViewPageData(userId: User['id']) {
    const [cards, shelvesAndBoxesData] = await Promise.all([
      this.cardsService.findAllWithBox(userId),
      this.shelvesService.getShelvesAndBoxesData(userId),
    ]);

    const enhancedCards = cards.map((card) =>
      this.cardsService.enhanceCard(card),
    );

    return { cards: enhancedCards, shelvesAndBoxesData };
  }

  async getTrashPageData(userId: User['id'], lang = 'en') {
    const deletedShelvesAndShelvesData =
      await this.shelvesService.getDeletedShelves(userId);

    return getTrashPageDataFromDbData(deletedShelvesAndShelvesData);
  }
}

function getTrashPageDataFromDbData(shelves: ShelfIncBoxesIncCards[]) {
  if (shelves.length === 0) {
    return {};
  }
  if (shelves.length === 1) {
    const shelf = shelves[0];
    return {
      cards: shelf.card,
      boxes: shelf.box,
      shelves: [shelf],
    };
  }
  // if (shelves.length === 3) {
  //   const shelf = shelves[2];
  //   return {
  //     cards: shelf.card,
  //     boxes: shelf.box,
  //     shelves: [shelf],
  //   };
  // }
  const boxes = shelves.reduce((acc, shelf) => {
    const newBoxesObject = {
      ...shelf.box,
      shelfId: shelf.id,
      shelfTitle: shelf.title,
    };
    return [newBoxesObject, ...acc];
  }, []);

  const cards = shelves.reduce((acc, shelf) => {
    return [...shelf.card, ...acc];
  }, []);
  return {
    shelves: shelves,
    boxes,
    cards,
  };
}
