import { Injectable } from '@nestjs/common';
import { BoxSpecialType, User } from '@prisma/client';
import { CardsService } from 'src/cards/cards.service';
import { commonShelfTemplate } from 'src/common/const/commonShelfTemplate';
import { NEW_CARDS_COUNTS_AS_TRAIN } from 'src/common/const/flags';
import { ShelvesService } from 'src/shelves/shelves.service';

@Injectable()
export class UserDataStorageService {
  constructor(
    private readonly cardsService: CardsService,
    private readonly shelvesService: ShelvesService,
  ) {}

  async getCupboardPageData(userId: User['id']) {
    const shelvesData = await this.shelvesService.findAllWithBoxCard(userId);

    const commonShelf = JSON.parse(JSON.stringify(commonShelfTemplate));

    const formattedShelves = shelvesData.map((shelf) => {
      let allCardsInShelf = 0;
      let trainCardsInShelf = 0;
      const boxesData = shelf.box.map((box) => {
        const boxSpecialType = box.specialType;
        const allCardsInBox = box.card.length;
        const trainCardsInBox = box.card.filter((card) =>
          card.nextTraining ? card.nextTraining > new Date() : false,
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

        // const waitCardsInBox = allCardsInBox - trainCardsInBox;

        // // let specialType = 'none';
        // if (box.index === 0) {
        //   // specialType = 'new';
        //   commonShelf.new.all += allCardsInBox;
        // } else if (box.index === shelf.box.length - 1) {
        //   // specialType = 'learnt';
        //   commonShelf.learnt.all += allCardsInBox;
        //   commonShelf.learnt.train += trainCardsInBox;
        //   commonShelf.learnt.wait += waitCardsInBox;
        // } else {
        //   commonShelf.learning.all += allCardsInBox;
        //   commonShelf.learning.train += trainCardsInBox;
        //   commonShelf.learning.wait += waitCardsInBox;
        // }

        return {
          id: box.id,
          index: box.index,
          specialType: boxSpecialType,
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
    const enhancedCards = cards.map((card) => {
      let state = 'wait'; // Значение по умолчанию

      if (
        card.box.specialType === BoxSpecialType.new &&
        NEW_CARDS_COUNTS_AS_TRAIN
      ) {
        state = 'train';
      } else if (card.nextTraining) {
        const nextTrainingDate = new Date(card.nextTraining);
        const now = new Date();

        // Если nextTraining больше текущего времени, то карточка в состоянии 'train'
        if (nextTrainingDate > now) {
          state = 'train';
        }
      }

      // const boxIndex = card.box.index;
      // let specialType = 'none';
      // switch (boxIndex) {
      //   case 0:
      //     specialType = 'new';
      //     break;
      //   case shelvesAndBoxesData[card.shelfId].maxIndexBox:
      //     specialType = 'learnt';
      //     break;
      // }

      return {
        ...card,
        boxIndex: card.box.index,
        specialType: card.box.specialType,
        state,
      };
    });
    return { cards: enhancedCards, shelvesAndBoxesData };
  }
}
