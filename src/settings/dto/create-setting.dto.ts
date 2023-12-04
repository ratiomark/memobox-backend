import { TimingBlockDto } from '@/aggregate/entities/aggregate.entity';
import {
  DaysOfWeek,
  TimeSleepDataObject,
  TimingBlock,
} from '@/aggregate/entities/settings-types';
import { MissedTrainingValue } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateSettingDto {}

export class CreateSettingMissedTrainingDto {
  @IsEnum(MissedTrainingValue)
  @IsNotEmpty()
  missedTraining: MissedTrainingValue;
}

export class CreateSettingShelfTemplateDto {
  // @IsNotEmptyObject()
  // @IsObject()
  @ValidateNested({ each: true })
  @Type(() => TimingBlockDto)
  shelfTemplate: TimingBlockDto[];
}

// export class CreateSettingNotificationDto {
//   @IsNotEmpty()
//   @IsObject()
//   notification: TimingBlock;
// }
export class CreateSettingTimeSleepDto {
  @IsBoolean()
  @IsDefined()
  isTimeSleepEnabled: boolean;

  @IsBoolean()
  @IsDefined()
  isDayByDayOptionEnabled: boolean;

  @IsDefined()
  @IsNotEmptyObject()
  generalTimeSleepData: TimeSleepDataObject;

  @IsOptional()
  dayByDayTimeSleepData?: {
    [key in DaysOfWeek]: TimeSleepDataObject;
  };
}

export class CreateSettingNotificationDto {
  @IsBoolean()
  mobilePushEnabled: boolean;

  @IsNumber()
  minimumCardsForPush: number;

  @IsBoolean()
  emailNotificationsEnabled: boolean;

  @IsNumber()
  minimumCardsForEmailNotification: number;

  // @IsArray()
  // notificationEmails: NotificationEmails[];
}
