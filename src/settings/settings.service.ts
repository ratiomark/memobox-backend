/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import {
  UpdateSettingDto,
  UpdateSettingMissedTrainingDto,
} from './dto/update-setting.dto';
import { PrismaService } from 'nestjs-prisma';
import {
  MissedTrainingValue,
  Prisma,
  ShelfTemplate,
  User,
} from '@prisma/client';
import { sleep } from '@/utils/common/sleep';
import { TimingBlock } from '@/aggregate/entities/settings-types';
// const findSettingsCondition = { OR: [{ userId }, { userId: null }] }
@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSettingDto: CreateSettingDto) {
    return 'This action adds a new setting';
  }

  async getShelfTemplate(userId: User['id']): Promise<Prisma.JsonArray> {
    // пытаюсь получить пользовательский шаблон, если нет, то общий.
    const shelfTemplateSettings = await this.prisma.shelfTemplate.findMany({
      where: { OR: [{ userId }, { userId: null }] },
    });
    let templateToUse: ShelfTemplate['template'];
    if (shelfTemplateSettings.length == 2) {
      templateToUse = shelfTemplateSettings[1].userId
        ? (shelfTemplateSettings[1].template as Prisma.JsonArray)
        : (shelfTemplateSettings[0].template as Prisma.JsonArray);
    } else {
      templateToUse = shelfTemplateSettings[0].template as Prisma.JsonArray;
    }
    return templateToUse;
  }

  findAll() {
    return `This action returns all settings`;
  }

  async getAllSettings(userId: User['id']) {
    const [timeSleep, missedTraining, shelfTemplate, notification] =
      await Promise.all([
        this.prisma.timeSleep.findMany({
          where: { OR: [{ userId }, { userId: null }] },
        }),
        this.prisma.missedTraining.findMany({
          where: { OR: [{ userId }, { userId: null }] },
        }),
        this.getShelfTemplate(userId),
        this.prisma.notification.findMany({
          where: { OR: [{ userId }, { userId: null }] },
        }),
      ]);
    const [timeSleepRes, missedTrainingRes, notificationRes] = [
      timeSleep,
      missedTraining,
      notification,
    ].map((settings) => this.fromDbArrayResponseToObj(settings, 'settings'));
    // console.log('timeSleepRes', timeSleepRes);
    // await sleep(15);
    return {
      timeSleep: timeSleepRes,
      missedTraining: missedTrainingRes,
      shelfTemplate,
      notification: notificationRes,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  async updateMissedTrainingValue(
    userId: User['id'],
    missedTraining: MissedTrainingValue,
  ) {
    if (missedTraining === 'none') {
      // что если я уберу await?
      await this.prisma.missedTraining.deleteMany({ where: { userId } });
      return { missedTraining: 'none' };
    }
    const settingsRow = await this.prisma.missedTraining.upsert({
      where: { userId },
      update: { settings: missedTraining },
      create: { userId, settings: missedTraining },
    });
    return { missedTraining: settingsRow.settings };
  }
  async updateShelfTemplate(
    userId: User['id'],
    updateShelfTemplate: Prisma.InputJsonArray,
  ) {
    const shelfTemplateRow = await this.prisma.shelfTemplate.upsert({
      where: { userId },
      update: { template: updateShelfTemplate },
      create: { userId, template: updateShelfTemplate },
    });
    return { shelfTemplate: shelfTemplateRow.template };
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }

  fromDbArrayResponseToObj(array: Prisma.JsonArray, fieldRequired: string) {
    let requiredData;
    if (array.length === 2) {
      requiredData = (array[1] as Prisma.JsonObject).userId
        ? // @ts-ignore
          (array[1][fieldRequired] as Prisma.JsonArray)
        : // @ts-ignore
          (array[0][fieldRequired] as Prisma.JsonArray);
    } else {
      // @ts-ignore
      requiredData = array[0][fieldRequired] as Prisma.JsonArray;
    }
    return requiredData;
  }
}
