import {
  DaysOfWeek,
  SleepPeriod,
  SleepPeriodFrontendRequest,
  TimeSleepAtomicDataObject,
} from '@/aggregate/entities/settings-types';
import { Transform } from 'class-transformer';
import { mapFrontendSleepPeriodToBackendSleepPeriod } from '../helpers';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  ValidateNested,
  IsOptional,
  IsString,
  IsNumber,
  IsDefined,
  IsObject,
  ValidationTypes,
  IsArray,
} from 'class-validator';

export class Setting {}

export class SleepPeriodEntity implements SleepPeriod {
  @IsString()
  startTime: string;

  @IsNumber()
  durationMinutes: number;
}

export class TimeSleepAtomicDataObjectDto implements TimeSleepAtomicDataObject {
  @IsNumber()
  hours: number;

  @IsNumber()
  minutes: number;
}

export class SleepPeriodFrontendEntity implements SleepPeriodFrontendRequest {
  @IsObject()
  @ValidateNested()
  @Type(() => TimeSleepAtomicDataObjectDto)
  startTime: TimeSleepAtomicDataObjectDto;

  @IsNumber()
  durationMinutes: number;
}

export class DayByDaySleepPeriodsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepPeriodFrontendEntity)
  @Transform(({ value }) =>
    value.map(mapFrontendSleepPeriodToBackendSleepPeriod),
  )
  monday: SleepPeriodFrontendEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepPeriodFrontendEntity)
  @Transform(({ value }) =>
    value.map(mapFrontendSleepPeriodToBackendSleepPeriod),
  )
  sunday: SleepPeriodFrontendEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepPeriodFrontendEntity)
  @Transform(({ value }) =>
    value.map(mapFrontendSleepPeriodToBackendSleepPeriod),
  )
  tuesday: SleepPeriodFrontendEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepPeriodFrontendEntity)
  @Transform(({ value }) =>
    value.map(mapFrontendSleepPeriodToBackendSleepPeriod),
  )
  saturday: SleepPeriodFrontendEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepPeriodFrontendEntity)
  @Transform(({ value }) =>
    value.map(mapFrontendSleepPeriodToBackendSleepPeriod),
  )
  thursday: SleepPeriodFrontendEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepPeriodFrontendEntity)
  @Transform(({ value }) =>
    value.map(mapFrontendSleepPeriodToBackendSleepPeriod),
  )
  wednesday: SleepPeriodFrontendEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepPeriodFrontendEntity)
  @Transform(({ value }) =>
    value.map(mapFrontendSleepPeriodToBackendSleepPeriod),
  )
  friday: SleepPeriodFrontendEntity[];
}

export class CreateSettingTimeSleepDto {
  @IsBoolean()
  @IsDefined()
  isTimeSleepEnabled: boolean;

  @IsBoolean()
  @IsDefined()
  isDayByDayOptionEnabled: boolean;

  @IsDefined()
  @Type(() => SleepPeriodFrontendEntity)
  @ValidateNested()
  @Transform(({ value }) => mapFrontendSleepPeriodToBackendSleepPeriod(value))
  generalSleepPeriod: SleepPeriodEntity;

  @IsOptional()
  @Type(() => DayByDaySleepPeriodsDto)
  @ValidateNested()
  dayByDaySleepPeriods?: Record<DaysOfWeek, SleepPeriodEntity[]>;
}

// export class TimeSleepSettingsEntity {
//   @IsBoolean()
//   isTimeSleepEnabled: boolean;

//   @IsBoolean()
//   isDayByDayOptionEnabled: boolean;

//   @ValidateNested()
//   @Type(() => SleepPeriodEntity)
//   generalSleepPeriod: SleepPeriodEntity;

//   @IsOptional()
//   @ValidateNested({ each: true })
//   @Type(() => SleepPeriodEntity)
//   dayByDaySleepPeriods?: Record<DaysOfWeek, SleepPeriodEntity[]>;
// }

// export class TimeSleepSettingsFrontendEntity {
//   @IsBoolean()
//   isTimeSleepEnabled: boolean;

//   @IsBoolean()
//   isDayByDayOptionEnabled: boolean;

//   @ValidateNested()
//   @Type(() => SleepPeriodFrontendEntity)
//   generalSleepPeriod: SleepPeriodFrontendEntity;

//   @IsOptional()
//   // @ValidateNested({ each: true })
//   @Type(() => SleepPeriodFrontendEntity)
//   dayByDaySleepPeriods?: Record<DaysOfWeek, SleepPeriodFrontendEntity[]>;
// }
