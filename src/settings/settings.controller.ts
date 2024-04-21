import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import {
  UpdateSettingDto,
  UpdateSettingMissedTrainingDto,
  UpdateSettingShelfTemplateDto,
  UpdateSettingTimeSleepDto,
} from './dto/update-setting.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '@/common/decorators';
import { NotificationSettings } from '@/aggregate/entities/settings-types';
import { User, Prisma } from '@prisma/client';
import { UserId } from '@/common/types/prisma-entities';

@ApiTags('Settings')
@Controller({
  path: 'settings',
  version: '1',
})
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // @Post()
  // create(@Body() createSettingDto: CreateSettingDto) {
  //   return this.settingsService.create(createSettingDto);
  // }

  @Get()
  getAllSettings(@GetCurrentUser('id') userId: UserId) {
    return this.settingsService.getAllSettings(userId);
  }

  @Patch('missed-training')
  updateMissedTraining(
    @GetCurrentUser('id') userId: UserId,
    @Body() missedTrainingValue: UpdateSettingMissedTrainingDto,
  ) {
    console.log('missedTrainingValue', missedTrainingValue);
    return this.settingsService.updateMissedTrainingValue(
      userId,
      missedTrainingValue.missedTraining!,
    );
  }

  @Patch('shelf-template')
  updateShelfTemplate(
    @GetCurrentUser('id') userId: UserId,
    @Body() shelfTemplate: UpdateSettingShelfTemplateDto,
  ) {
    console.log('missedTrainingValue', shelfTemplate);
    return this.settingsService.updateShelfTemplate(
      userId,
      shelfTemplate.shelfTemplate as unknown as Prisma.InputJsonArray,
    );
  }

  @Delete('shelf-template')
  setDefaultShelfTemplate(@GetCurrentUser('id') userId: UserId) {
    return this.settingsService.setDefaultShelfTemplate(userId);
  }

  @Patch('time-sleep')
  updateTimeSleep(
    @GetCurrentUser('id') userId: UserId,
    @Body() timeSleep: UpdateSettingTimeSleepDto,
  ) {
    console.log(JSON.stringify(timeSleep, null, 2));
    return this.settingsService.updateTimeSleep(userId, timeSleep);
  }

  @Patch('notification')
  updateNotification(
    @GetCurrentUser('id') userId: UserId,
    @Body() notificationSettings: NotificationSettings,
  ) {
    // console.log('timeSleep', timeSleep);
    // const timeSleepObj = plainToClass(UpdateSettingTimeSleepDto, timeSleep);
    // console.log('timeSleep', timeSleepObj);
    return this.settingsService.updateNotification(
      userId,
      notificationSettings,
    );
  }

  @Patch('switchPushNotification')
  async enablePush(
    @GetCurrentUser('id') userId: UserId,
    @Body() switchState: { pushEnabled: boolean },
  ) {
    return await this.settingsService.switchPushNotificationEnabled(
      userId,
      switchState.pushEnabled,
    );
    // console.log('timeSleep', timeSleep);
    // const timeSleepObj = plainToClass(UpdateSettingTimeSleepDto, timeSleep);
    // console.log('timeSleep', timeSleepObj);
    // return this.settingsService.updateNotification(
    //   userId,
    //   notificationSettings,
    // );
    // return { success: true, message: 'Push notification toggled successfully' };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.settingsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
  //   // return this.settingsService.update(+id, updateSettingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.settingsService.remove(+id);
  // }
}
