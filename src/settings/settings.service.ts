/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import {
  UpdateSettingDto,
  UpdateSettingMissedTrainingDto,
  UpdateSettingTimeSleepDto,
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
import {
  DefaultSettings,
  notificationsMock,
  shelfTemplateDefaultMock,
  timeSleepMock,
} from './mock/settings-mock';
// const findSettingsCondition = { OR: [{ userId }, { userId: null }] }
@Injectable()
export class SettingsService implements OnModuleInit {
  private defaultSettings: DefaultSettings;
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const [timeSleep, missedTraining, notification, shelfTemplate] =
      await Promise.all([
        this.prisma.timeSleep.findFirst({ where: { userId: null } }),
        this.prisma.missedTraining.findFirst({ where: { userId: null } }),
        this.prisma.notification.findFirst({ where: { userId: null } }),
        this.prisma.shelfTemplate.findFirst({ where: { userId: null } }),
      ]);

    this.defaultSettings = {
      timeSleep: timeSleep?.settings ?? timeSleepMock,
      missedTraining: missedTraining?.settings ?? MissedTrainingValue.none,
      notification: notification?.settings ?? notificationsMock,
      shelfTemplate: shelfTemplate?.template ?? shelfTemplateDefaultMock,
    };
  }

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
  // timeSleep = timeSleepDefault,
  // missedTraining = missedTrainingDefault,
  // shelfTemplate = shelfTemplateDefault,
  // notification = notificationDefault,
  async getAllSettings(userId: User['id']) {
    const {
      timeSleep: timeSleepDefault,
      missedTraining: missedTrainingDefault,
      shelfTemplate: shelfTemplateDefault,
      notification: notificationDefault,
    } = this.getDefaultSettings();

    const [timeSleep, missedTraining, shelfTemplate, notification] =
      await Promise.all([
        this.prisma.timeSleep.findUnique({ where: { userId } }),
        this.prisma.missedTraining.findUnique({ where: { userId } }),
        this.prisma.shelfTemplate.findUnique({ where: { userId } }),
        this.prisma.notification.findUnique({ where: { userId } }),
      ]);

    const response = {
      timeSleep: timeSleep?.settings ?? timeSleepDefault,
      missedTraining: missedTraining?.settings ?? missedTrainingDefault,
      shelfTemplate: shelfTemplate?.template ?? shelfTemplateDefault,
      notification: notification?.settings ?? notificationDefault,
    };
    // console.log('timeSleepRes', timeSleepRes);
    // await sleep(15);
    return response;
    // return {
    //   timeSleep: timeSleepRes,
    //   missedTraining: missedTrainingRes,
    //   shelfTemplate,
    //   notification: notificationRes,
    // };
  }
  // async getAllSettings(userId: User['id']) {
  //   const [timeSleep, missedTraining, shelfTemplate, notification] =
  //     await Promise.all([
  //       this.prisma.timeSleep.findMany({
  //         where: { OR: [{ userId }, { userId: null }] },
  //       }),
  //       this.prisma.missedTraining.findMany({
  //         where: { OR: [{ userId }, { userId: null }] },
  //       }),
  //       this.getShelfTemplate(userId),
  //       this.prisma.notification.findMany({
  //         where: { OR: [{ userId }, { userId: null }] },
  //       }),
  //     ]);
  //   const [timeSleepRes, missedTrainingRes, notificationRes] = [
  //     timeSleep,
  //     missedTraining,
  //     notification,
  //   ].map((settings) => this.fromDbArrayResponseToObj(settings, 'settings'));
  //   // console.log('timeSleepRes', timeSleepRes);
  //   // await sleep(15);
  //   return {
  //     timeSleep: timeSleepRes,
  //     missedTraining: missedTrainingRes,
  //     shelfTemplate,
  //     notification: notificationRes,
  //   };
  // }

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

  async setDefaultShelfTemplate(userId: User['id']) {
    await this.prisma.shelfTemplate.deleteMany({ where: { userId } });
    return { shelfTemplate: this.getDefaultSettings().shelfTemplate };
  }

  async updateTimeSleep(
    userId: User['id'],
    timeSleep: UpdateSettingTimeSleepDto,
  ) {
    const timeSleepRow = await this.prisma.timeSleep.upsert({
      where: { userId },
      update: { settings: timeSleep as Prisma.InputJsonObject },
      create: { userId, settings: timeSleep as Prisma.InputJsonObject },
    });
    return timeSleepRow.settings;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }

  fromDbArrayResponseToObj(array: Prisma.JsonArray, fieldRequired: string) {
    let requiredData: Prisma.JsonObject | Prisma.JsonArray;
    if (array.length === 2) {
      requiredData = (array[1] as Prisma.JsonObject).userId
        ? // @ts-ignore
          (array[1][fieldRequired] as Prisma.JsonObject)
        : // @ts-ignore
          (array[0][fieldRequired] as Prisma.JsonObject);
    } else {
      // @ts-ignore
      requiredData = array[0][fieldRequired] as Prisma.JsonObject;
    }
    return requiredData;
  }

  getDefaultSettings() {
    return this.defaultSettings;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }
}
