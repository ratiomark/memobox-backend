import { TimingBlockDto } from '@/aggregate/entities/aggregate.entity';
import { TimingBlock } from '@/aggregate/entities/settings-types';
import { MissedTrainingValue } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
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
export class CreateSettingTimeSleepDto {}
// export class CreateSettingTimeSleepDto {}
