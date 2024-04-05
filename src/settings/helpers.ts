import {
  SleepPeriod,
  SleepPeriodFrontendRequest,
  TimeSleepSettings,
} from '@/aggregate/entities/settings-types';
import { mapStartTimeToHoursMinutes } from '@/notification/helpers';
import { SleepPeriodEntity } from './entities/setting.entity';
import { plainToInstance } from 'class-transformer';

export const prepareTimeSettingsToFront = (timeSettings: TimeSleepSettings) => {
  const { generalSleepPeriod, dayByDaySleepPeriods } = timeSettings;

  for (const day in dayByDaySleepPeriods) {
    if (dayByDaySleepPeriods[day].length === 0) {
      continue;
    } else if (dayByDaySleepPeriods[day].length === 1) {
      dayByDaySleepPeriods[day][0].startTime = mapStartTimeToHoursMinutes(
        dayByDaySleepPeriods[day][0].startTime,
      );
    } else {
      dayByDaySleepPeriods[day][0].startTime = mapStartTimeToHoursMinutes(
        dayByDaySleepPeriods[day][0].startTime,
      );
      dayByDaySleepPeriods[day][1].startTime = mapStartTimeToHoursMinutes(
        dayByDaySleepPeriods[day][1].startTime,
      );
    }
  }

  return {
    isTimeSleepEnabled: timeSettings.isTimeSleepEnabled,
    isDayByDayOptionEnabled: timeSettings.isDayByDayOptionEnabled,
    generalSleepPeriod: {
      startTime: mapStartTimeToHoursMinutes(generalSleepPeriod.startTime),
      durationMinutes: generalSleepPeriod.durationMinutes,
    },
    dayByDaySleepPeriods,
  };
};

export const getTimeRepresentation = (timeValue: number): number | string =>
  timeValue < 10 ? `0${timeValue}` : timeValue;

// export const mapFrontendSleepPeriodToBackendSleepPeriod = (
//   timeSleepPeriodFronted: SleepPeriodFrontendRequest,
// ): SleepPeriod => {
//   const { hours, minutes } = timeSleepPeriodFronted.startTime;
//   const startTime = `${getTimeRepresentation(hours)}:${getTimeRepresentation(
//     minutes,
//   )}`;
//   return { startTime, durationMinutes: timeSleepPeriodFronted.durationMinutes };
// };
export const mapFrontendSleepPeriodToBackendSleepPeriod = (
  period: SleepPeriodFrontendRequest,
): SleepPeriodEntity => {
  const { hours, minutes } = period.startTime;
  const startTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
  const sleepPeriod = { startTime, durationMinutes: period.durationMinutes };
  return plainToInstance(SleepPeriodEntity, sleepPeriod);
};
