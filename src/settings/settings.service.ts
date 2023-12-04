/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
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
import {
  NotificationEmails,
  NotificationSettings,
  TimingBlock,
} from '@/aggregate/entities/settings-types';
import {
  DefaultSettings,
  notificationsMock,
  shelfTemplateDefaultMock,
  timeSleepMock,
} from './mock/settings-mock';
import { OnEvent } from '@nestjs/event-emitter';
import { UserId } from '@/users/types/types';
import { EVENT_USER_CREATED } from '@/common/const/events';
// const findSettingsCondition = { OR: [{ userId }, { userId: null }] }
@Injectable()
export class SettingsService implements OnModuleInit {
  private defaultSettings: DefaultSettings;
  private readonly logger = new Logger(SettingsService.name);

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
      notifications: notification?.settings ?? notificationsMock,
      shelfTemplate: shelfTemplate?.template ?? shelfTemplateDefaultMock,
    };
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
    const {
      timeSleep: timeSleepDefault,
      missedTraining: missedTrainingDefault,
      shelfTemplate: shelfTemplateDefault,
      notifications: notificationDefault,
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
      notifications: notification?.settings ?? notificationDefault,
    };

    return response;
  }

  async getNotificationSettings(
    userId: User['id'],
  ): Promise<NotificationSettings | null> {
    // const { notification: notificationDefault } = this.getDefaultSettings();
    const notification = await this.prisma.notification.findUnique({
      where: { userId },
    });
    return (notification?.settings as unknown as NotificationSettings) ?? null;
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

  async updateNotification(
    userId: User['id'],
    notificationSettings: NotificationSettings,
  ) {
    const notificationSettingsRow = await this.prisma.notification.update({
      where: { userId },
      data: {
        settings: notificationSettings as unknown as Prisma.InputJsonObject,
      },
    });
    return notificationSettingsRow.settings;
  }

  @OnEvent(EVENT_USER_CREATED)
  async setNotificationInitialEmail(payload: {
    email: string;
    userId: UserId;
  }) {
    this.logger.log('user.register event started ');
    const { email, userId } = payload;
    const notificationEmails: NotificationEmails[] = [
      { email, verified: false },
    ];
    const notifications = notificationsMock;
    notifications.notificationEmails = notificationEmails;
    await this.prisma.notification.upsert({
      where: { userId },
      update: { settings: notifications as unknown as Prisma.InputJsonObject },
      create: {
        userId,
        settings: notifications as unknown as Prisma.InputJsonObject,
      },
    });
    this.logger.log('user.register event ended');
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
