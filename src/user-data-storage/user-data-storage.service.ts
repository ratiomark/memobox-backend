import { Injectable } from '@nestjs/common';
import { Box, BoxSpecialType, MissedTrainingValue, User } from '@prisma/client';
import { CommonShelfFrontedResponse } from '@/aggregate/entities/types';
import { CardsService } from '@/cards/cards.service';
import { commonShelfTemplate } from '@/common/const/commonShelfTemplate';
import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';
import {
  ShelfFrontedResponse,
  ShelvesCupboardFrontedResponse,
} from '@/shelves/entities/shelf.entity';
import { ShelvesService } from '@/shelves/shelves.service';
import { CupboardSchema, BoxSchemaFrontend } from './types/fronted-responses';
import { I18nService } from 'nestjs-i18n';
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

  async getViewPageData(userId: User['id'], lang = 'en') {
    const [cards, shelvesAndBoxesData] = await Promise.all([
      this.cardsService.findAllWithBox(userId),
      this.shelvesService.getShelvesAndBoxesData(userId),
    ]);

    const enhancedCardsPromises = cards.map(async (card) => {
      let state = 'wait'; // Значение по умолчанию

      if (
        card.box.specialType === BoxSpecialType.new &&
        NEW_CARDS_COUNTS_AS_TRAIN
      ) {
        state = 'train';
      } else if (card.nextTraining) {
        // const nextTrainingDate = new Date(card.nextTraining);
        // const now = new Date();

        // Если nextTraining меньше текущего времени, то карточка в состоянии 'train'
        // if (nextTrainingDate < now) {
        if (card.nextTraining < new Date()) {
          state = 'train';
        }
      }

      const nextTraining = await timeLeft(card.nextTraining, this.i18n, lang);

      return {
        ...card,
        lastTraining: card.lastTraining ? card.lastTraining : '---',
        nextTraining,
        isDeleting: false,
        boxIndex: card.box.index,
        specialType: card.box.specialType,
        state,
      };
    });

    const enhancedCards = await Promise.all(enhancedCardsPromises);
    return { cards: enhancedCards, shelvesAndBoxesData };
  }
}

async function timeLeft(
  utcTime: Date | null,
  i18nService: I18nService,
  lang = 'en',
) {
  if (!utcTime) return 'пора';
  // return await i18nService.translate('time.less_than_minute', { lang });

  const currentTime = new Date().getTime();
  const diff = utcTime.getTime() - currentTime;
  if (diff < 0) return 'пора';

  // Конвертируем разницу в секунды, минуты, часы, дни, месяцы и годы
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30); // Приблизительно
  const diffYears = Math.floor(diffMonths / 12);

  // Функция для интернационализации с учетом множественного числа
  const i18n = async (number, unit) => {
    return await i18nService.translate(
      `common.time.${unit}${number > 1 ? '_plural' : ''}`,
      { lang, args: { count: number } },
    );
  };

  if (diffYears > 0) {
    return await i18n(diffYears, 'year');
  } else if (diffMonths > 0) {
    return await i18n(diffMonths, 'month');
  } else if (diffDays > 1) {
    return await i18n(diffDays, 'day');
  } else if (diffHours > 0) {
    return `~ ${await i18n(diffHours, 'hour')}`;
  } else if (diffMinutes > 0) {
    return await i18n(diffMinutes, 'minute');
  } else {
    return await i18nService.translate('time.less_than_minute', { lang });
  }
}
// function timeLeft(utcTime: Date | null, lang = 'en') {
//   if (!utcTime) return 'пора';
//   // const eventTime = utcTime.getTime();
//   const currentTime = new Date().getTime();
//   const diff = utcTime.getTime() - currentTime;
//   if (diff < 0) return 'пора';

//   // Конвертируем разницу в секунды, минуты, часы, дни, месяцы и годы
//   const diffSeconds = Math.floor(diff / 1000);
//   const diffMinutes = Math.floor(diffSeconds / 60);
//   const diffHours = Math.floor(diffMinutes / 60);
//   const diffDays = Math.floor(diffHours / 24);
//   const diffMonths = Math.floor(diffDays / 30); // Приблизительно
//   const diffYears = Math.floor(diffMonths / 12);

//   // Функция для интернационализации
//   const i18n = (number, unit) => {
//     const units = {
//       en: {
//         day: 'day',
//         month: 'month',
//         year: 'year',
//         hour: 'hour',
//         minute: 'minute',
//       },
//       ru: { day: 'дн.', month: 'мес.', year: 'г.', hour: 'ч.', minute: 'мин.' },
//     };
//     return `${number} ${units[lang][unit]}`;
//   };

//   if (diffYears > 0) {
//     return i18n(diffYears, 'year');
//   } else if (diffMonths > 0) {
//     return i18n(diffMonths, 'month');
//   } else if (diffDays > 1) {
//     return i18n(diffDays, 'day');
//   } else if (diffHours > 0) {
//     return `~ ${i18n(diffHours, 'hour')}`;
//   } else if (diffMinutes > 0) {
//     return i18n(diffMinutes, 'minute');
//   } else {
//     return lang === 'en' ? '< a minute' : '< минуты';
//   }
// }

// export function timeLeft(utcTime: string | null) {
//   if (!utcTime) return 'пора';
//   // console.log(utcTime, '---------------');
//   const eventTime = new Date(utcTime);
//   // console.log(eventTime, '000000000000');
//   const currentTime = new Date();
//   // @ts-ignore
//   const diff = eventTime - currentTime;
//   if (diff < 0) return 'пора';
//   // Конвертируем разницу в секунды, минуты, часы и дни
//   const diffSeconds = Math.floor(diff / 1000);
//   const diffMinutes = Math.floor(diffSeconds / 60);
//   const diffHours = Math.floor(diffMinutes / 60);
//   const diffDays = Math.floor(diffHours / 24);

//   if (diffDays > 1) {
//     return `${diffDays} дн.`;
//   } else if (diffHours > 0) {
//     return `${diffHours} ч.`;
//   } else if (diffMinutes > 0) {
//     return `${diffMinutes} мин.`;
//   } else {
//     return '< минуты';
//   }
// }
