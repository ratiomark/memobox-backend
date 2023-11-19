import { Injectable } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { PrismaService } from 'nestjs-prisma';
import {
  Shelf,
  Prisma,
  ShelfTemplate,
  User,
  BoxSpecialType,
  Box,
} from '@prisma/client';
import { TimingBlock } from 'src/aggregate/entities/settings-types';
import { emptyDataTemplate } from 'src/common/const/commonShelfTemplate';
import { uuid } from 'src/utils/helpers/sql';
import { BoxSchema } from './entities/box.entity';

type GenerateBoxesFromTemplateArg = {
  shelfTemplate: Prisma.JsonArray;
  userId: User['id'];
  shelfId: Shelf['id'];
};

@Injectable()
export class BoxesService {
  constructor(private readonly prisma: PrismaService) {}
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

  remove(id: number) {
    return `This action removes a #${id} box`;
  }
}
