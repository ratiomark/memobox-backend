import { Injectable } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { PrismaService } from 'nestjs-prisma';
import { Shelf, Prisma, User, BoxSpecialType, Box } from '@prisma/client';
import { emptyDataTemplate } from 'src/common/const/commonShelfTemplate';
import { uuid } from 'src/utils/helpers/sql';
import { CardsService } from 'src/cards/cards.service';

type GenerateBoxesFromTemplateArg = {
  shelfTemplate: Prisma.JsonArray;
  userId: User['id'];
  shelfId: Shelf['id'];
};

@Injectable()
export class BoxesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardsService: CardsService,
  ) {}
  create(createBoxDto: CreateBoxDto) {
    return 'This action adds a new box';
  }
  createMany(createBoxDto: CreateBoxDto[]) {
    return this.prisma.box.createMany({ data: createBoxDto });
  }

  async createBoxesFromTemplate({
    shelfTemplate,
    userId,
    shelfId,
  }: GenerateBoxesFromTemplateArg) {
    const boxesData = this.generateBoxesFromTemplate({
      shelfTemplate,
      userId,
      shelfId,
    });
    await this.createMany(boxesData);
    boxesData[0].data = { all: 0 };
    boxesData.forEach((box) => (box.data = emptyDataTemplate));
    return boxesData;
  }

  generateBoxesFromTemplate({
    shelfTemplate,
    userId,
    shelfId,
  }: GenerateBoxesFromTemplateArg) {
    const boxesData: CreateBoxDto[] = shelfTemplate.map((timing, index) => {
      const boxId = uuid();
      const boxData = {
        id: boxId,
        shelfId,
        userId,
        index: index + 1,
        specialType: 'none' as BoxSpecialType,
        timing: timing as Prisma.InputJsonObject,
      };
      return boxData;
    });

    boxesData[shelfTemplate.length - 1].specialType = 'learnt';
    boxesData.unshift({
      id: uuid(),
      index: 0,
      shelfId,
      userId,
      specialType: 'new',
      timing: {},
    });
    return boxesData;
  }

  findAll() {
    return `This action returns all boxes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} box`;
  }

  async update(id: Box['id'], updateBoxDto: UpdateBoxDto): Promise<Box> {
    const boxUpdated = await this.prisma.box.update({
      where: { id },
      data: updateBoxDto,
    });
    return boxUpdated;
  }

  deleteSoftByShelfId(shelfId: Shelf['id']) {
    return this.prisma.box.updateMany({
      where: { shelfId },
      data: { isDeleted: true },
    });
  }

  async deleteSoftByBoxId(id: Box['id']) {
    const [box, cards] = await Promise.all([
      this.prisma.box.update({
        where: { id },
        data: { isDeleted: true },
      }),
      this.cardsService.deleteSoftByBoxId(id),
    ]);
    return { box, cards };
  }

  remove(id: number) {
    return `This action removes a #${id} box`;
  }
}