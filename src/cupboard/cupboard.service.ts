import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { commonShelfTemplate } from '@/common/const/commonShelfTemplate';
import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';

@Injectable()
export class CupboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getCupboard(userId: User['id']) {
    const shelvesData = await this.prisma.shelf.findMany({
      where: {
        userId,
      },
      include: {
        box: {
          include: {
            card: true,
          },
        },
        user: true,
      },
    });

    const commonShelf = JSON.parse(JSON.stringify(commonShelfTemplate));
    let allShelfCardsGlobal = 0;
    let shelfTrainCards = 0;
    const formattedShelves = shelvesData.map((shelf) => {
      const boxesData = shelf.box.map((box) => {
        const allCards = box.card.length;
        allShelfCardsGlobal += allCards;
        const trainCards = box.card.filter((card) =>
          card.nextTraining ? card.nextTraining > new Date() : false,
        ).length;
        shelfTrainCards += trainCards;
        const waitCards = allCards - trainCards;

        let specialType = 'none';
        if (box.index === 0) {
          specialType = 'new';
          commonShelf.new.all += allCards;
        } else if (box.index === shelf.box.length - 1) {
          specialType = 'learnt';
          commonShelf.learnt.all += allCards;
          commonShelf.learnt.train += trainCards;
          commonShelf.learnt.wait += waitCards;
        } else {
          commonShelf.learning.all += allCards;
          commonShelf.learning.train += trainCards;
          commonShelf.learning.wait += waitCards;
        }

        return {
          id: box.id,
          index: box.index,
          specialType: specialType,
          timing: box.timing,
          data: {
            all: allCards,
            train: trainCards,
            wait: waitCards,
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
          all: allShelfCardsGlobal,
          train: shelfTrainCards,
          wait: allShelfCardsGlobal - shelfTrainCards,
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
}
