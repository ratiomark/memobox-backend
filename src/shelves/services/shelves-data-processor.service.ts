import { ShelvesDataViewPage } from '@/aggregate';
import { TimingBlock } from '@/aggregate/entities/settings-types';
import { ShelfIncBoxes } from '@/aggregate/entities/types';
import { BoxesService } from '@/boxes/boxes.service';
import { CreateBoxDto } from '@/boxes/dto/create-box.dto';
import { emptyDataTemplate } from '@/common/const/commonShelfTemplate';
import {
  BoxData,
  CupboardObject,
  ShelfData,
} from '@/common/types/entities-types';
import { AnswerType } from '@/common/types/frontend/types';
import { BoxId, UserId } from '@/common/types/prisma-entities';
import { RedisService } from '@/redis/redis.service';
import { Injectable, Logger } from '@nestjs/common';
import { Shelf, Prisma } from '@prisma/client';

@Injectable()
export class ShelvesProcessorService {
  private readonly logger = new Logger(ShelvesProcessorService.name);
  constructor(
    private readonly boxesService: BoxesService,
    private readonly redisService: RedisService, // Пре
  ) {}

  async getShelvesAndBoxesData(userId: UserId) {
    return await this.redisService.getShelvesByUserId(userId);
  }

  async saveShelvesAndBoxesData(
    userId: UserId,
    shelvesFromDb: ShelfIncBoxes[],
  ) {
    await this.redisService.saveShelvesByUserId(userId, shelvesFromDb);
  }

  async createShelfResponseFromNewShelf(
    userId: UserId,
    shelf: Shelf,
    shelfTemplate: Prisma.JsonArray,
  ) {
    const shelfResponse = {
      boxesData: [] as CreateBoxDto[],
      data: emptyDataTemplate,
      ...shelf,
      isCollapsed: true,
    };
    const shelfId = shelf.id;
    const boxesData = await this.boxesService.createBoxesFromTemplate({
      shelfId,
      userId,
      shelfTemplate,
    });
    shelfResponse.boxesData = boxesData;
    return shelfResponse;
  }

  createShelvesAndBoxesDataFromShelvesIncBox(
    shelves: ShelfIncBoxes[],
  ): ShelvesDataViewPage {
    return shelves.reduce((acc, shelf) => {
      const boxesItems = shelf.box.map((box) => ({
        id: box.id,
        index: box.index,
      }));

      // Добавляем данные о полке
      acc[shelf.id] = {
        maxIndexBox: shelf.box.length - 1,
        boxesItems,
        shelfTitle: shelf.title,
        shelfIndex: shelf.index,
      };

      return acc;
    }, {});
  }

  transformShelvesIncBoxToCupboardObject(
    userShelves: ShelfIncBoxes[],
  ): CupboardObject {
    const shelvesData: CupboardObject = {};

    userShelves.forEach((shelf) => {
      const boxData: Record<BoxId, BoxData> = {};
      // 6
      const sortedBoxes = shelf.box.sort((a, b) => a.index - b.index);
      const boxesLength = sortedBoxes.length;

      sortedBoxes.forEach((box, index) => {
        let nextBoxIdKey: BoxId;
        let previousBoxIdKey: BoxId;

        switch (index) {
          case boxesLength - 1: // learnt card box
            nextBoxIdKey = box.id;
            previousBoxIdKey = sortedBoxes[index - 1].id;
            break;
          case 0: // new cards box
            nextBoxIdKey = sortedBoxes[index + 1].id;
            previousBoxIdKey = box.id;
            break;
          default:
            nextBoxIdKey = sortedBoxes[index + 1].id;
            previousBoxIdKey = sortedBoxes[index - 1].id;
        }

        boxData[box.id] = {
          nextBoxIdKey,
          previousBoxIdKey,
          index: box.index,
          timing: box.timing as unknown as TimingBlock,
        };
      });

      shelvesData[shelf.id] = {
        maxBoxIndex: boxesLength - 1,
        boxes: boxData,
      };
    });

    return shelvesData;
  }
}
