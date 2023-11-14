import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { TimingBlock } from './types/entities';

@Injectable()
export class CupboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getCupboard(userId: User['id']) {
    const shelvesData = await this.prisma.shelf.findMany({
      where: {
        userId, // Замените на ID пользователя
      },
      include: {
        box: {
          include: {
            card: true,
          },
        },
      },
    });

    const formattedShelves = shelvesData.map((shelf) => {
      let allShelfCardsGlobal = 0;
      let shelfTrainCards = 0;
      const boxesData = shelf.box.map((box) => {
        const allCards = box.card.length;
        allShelfCardsGlobal += allCards;
        const trainCards = box.card.filter((card) =>
          card.nextTraining ? card.nextTraining > new Date() : false,
        ).length;
        shelfTrainCards += trainCards;
        const waitCards = allCards - trainCards;

        let specialType = 'none';
        if (box.index === 0) specialType = 'new';
        if (box.index === shelf.box.length - 1) specialType = 'learnt';

        return {
          id: box.id,
          index: box.index,
          specialType: specialType,
          timing: box.timing,
          // timing: JSON.parse(JSON.stringify(box.timing)),
          data: {
            all: allCards,
            train: trainCards,
            wait: waitCards,
          },
        };
      });

      // const allShelfCards = shelf.box.reduce(
      //   (acc, box) => acc.concat(box.card),
      //   [],
      // );
      // const all = allShelfCards.length;
      // const train = allShelfCards.filter((card) =>
      //   card.nextTraining ? card.nextTraining > new Date() : false,
      // ).length;
      // const wait = all - train;

      return {
        id: shelf.id,
        index: shelf.index,
        isCollapsed: shelf.isCollapsed,
        title: shelf.title,
        boxesData: boxesData,
        data: {
          all: allShelfCardsGlobal,
          train: shelfTrainCards,
          wait: allShelfCardsGlobal - shelfTrainCards,
        },
      };
    });

    const result = {
      shelves: formattedShelves,
      commonShelf: {
        new: {
          all: 11,
        },
        learning: {
          all: 70,
          train: 33,
          wait: 37,
        },
        learnt: {
          all: 19,
          train: 8,
          wait: 11,
        },
        data: {
          all: 100,
          train: 52,
          wait: 48,
        },
        isCollapsed: true,
      },
    };
    return result;
    // const shelvesData = await this.prisma.shelf.findMany({
    //   where: {
    //     userId,
    //   },
    //   include: {
    //     box: {
    //       include: {
    //         card: true,
    //       },
    //     },
    //     // card: true,
    //     // boxId: true,
    //   },
    // });
    // console.log(shelvesData);
    // const formattedShelves = shelvesData.map((shelf) => {
    //   const boxesData = shelf.box.map((box) => {
    //     const allCards = box.card.length;
    //     const trainCards = box.card.filter((card) =>
    //       card.nextTraining ? card.nextTraining > new Date() : false,
    //     ).length;
    //     const waitCards = allCards - trainCards;

    //     let specialType = 'none';
    //     if (box.index === 0) specialType = 'new';
    //     if (box.index === shelf.box.length - 1) specialType = 'learnt';

    //     return {
    //       id: box.id,
    //       index: box.index,
    //       specialType: specialType,
    //       data: {
    //         all: allCards,
    //         train: trainCards,
    //         wait: waitCards,
    //       },
    //     };
    //   });
    // });

    //   const formattedShelves = shelvesData.map(shelf => {
    // const boxesData = shelf.box.map(box => {
    //   const allCards = box.card.length;
    //   const trainCards = box.card.filter(card =>  card.nextTraining ? card.nextTraining > new Date() : false,).length;
    //   const waitCards = allCards - trainCards;

    //   let specialType = 'none';
    //   if (box.index === 0) specialType = 'new';
    //   if (box.index === shelf.box.length - 1) specialType = 'learnt';

    //   return {
    //     id: box.id,
    //     index: box.index,
    //     specialType: specialType,
    //     data: {
    //       all: allCards,
    //       train: trainCards,
    //       wait: waitCards,
    //     },
    //   };
    // });

    // const allShelfCards = shelf.box.reduce((acc, box) => acc.concat(box.card), []);
    // const all = allShelfCards.length;
    // const train = allShelfCards.filter(card => card.nextTraining ? card.nextTraining > new Date() : false,).length;
    // const wait = all - train;

    // return {
    //   id: shelf.id,
    //   index: shelf.index,
    //   isCollapsed: shelf.isCollapsed,
    //   title: shelf.title,
    //   boxesData: boxesData,
    //   data: {
    //     all: all,
    //     train: train,
    //     wait: wait,
    //   },
    // };

    // return {
    //   shelves: shelvesData.map((shelf) => ({
    //     ...shelf,
    //     data: {
    //       all: 100,
    //       train: 52,
    //       wait: 48,
    //     },
    //   })),
    //   commonShelf: {
    //     new: {
    //       all: 11,
    //     },
    //     learning: {
    //       all: 70,
    //       train: 33,
    //       wait: 37,
    //     },
    //     learnt: {
    //       all: 19,
    //       train: 8,
    //       wait: 11,
    //     },
    //     data: {
    //       all: 100,
    //       train: 52,
    //       wait: 48,
    //     },
    //     isCollapsed: true,
    //   },
    // };
    //   const allShelfCards = shelf.box.reduce(
    //     (acc, box) => acc.concat(box.card),
    //     [],
    //   );
    //   const all = allShelfCards.length;
    //   const train = allShelfCards.filter(
    //     (card) => card.nextTraining > new Date(),
    //   ).length;
    //   const wait = all - train;

    //   return {
    //     id: shelf.id,
    //     index: shelf.index,
    //     isCollapsed: shelf.isCollapsed,
    //     title: shelf.title,
    //     boxesData: boxesData,
    //     data: {
    //       all: all,
    //       train: train,
    //       wait: wait,
    //     },
    //   };
    // });

    // const result = { shelves: formattedShelves };
  }
}
