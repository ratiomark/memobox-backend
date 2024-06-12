import { DaysOfWeek, SleepPeriod } from '@/aggregate/entities/settings-types';
import { addMinutes, getDay, isWithinInterval, subMinutes } from 'date-fns';

interface IsNotificationWithinSleepIntervalProps {
  sleepPeriod: SleepPeriod;
  notificationTimeLocal: Date;
  beforeSleepMinutes: number;
  afterSleepMinutes: number;
}

export const mapStartTimeToHoursMinutes = (startTime: string) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  return { hours, minutes };
};

export const getIsNotificationWithinSleepInterval = ({
  sleepPeriod,
  notificationTimeLocal,
  beforeSleepMinutes,
  afterSleepMinutes,
}: IsNotificationWithinSleepIntervalProps) => {
  const { startTime, durationMinutes } = sleepPeriod;
  const [startHours, startMinutes] = startTime.split(':').map(Number);

  let sleepStartTime = new Date(notificationTimeLocal);
  sleepStartTime.setHours(startHours, startMinutes, 0, 0);
  let sleepEndTime = addMinutes(sleepStartTime, durationMinutes);

  sleepStartTime = subMinutes(sleepStartTime, beforeSleepMinutes);
  sleepEndTime = addMinutes(sleepEndTime, afterSleepMinutes);

  const isNotificationWithinSleepInterval = isWithinInterval(
    notificationTimeLocal,
    {
      start: sleepStartTime,
      end: sleepEndTime,
    },
  );
  return { isNotificationWithinSleepInterval, sleepEndTime };
};

export const getNextDayOfWeek = (notificationTimeLocal: Date): DaysOfWeek => {
  // getDay => Sunday - Saturday : 0 - 6
  const dayOfWeekNumber = getDay(notificationTimeLocal);
  if (dayOfWeekNumber === 6) {
    return 'sunday';
  }
  const daysOfWeek: DaysOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  const dayOfWeek = daysOfWeek[dayOfWeekNumber + 1];
  return dayOfWeek;
};

export const getPreviousDayOfWeek = (
  notificationTimeLocal: Date,
): DaysOfWeek => {
  // getDay => Sunday - Saturday : 0 - 6
  const dayOfWeekNumber = getDay(notificationTimeLocal);
  if (dayOfWeekNumber === 0) {
    return 'saturday';
  }
  const daysOfWeek: DaysOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  const dayOfWeek = daysOfWeek[dayOfWeekNumber - 1];
  // console.log('Day of week:', dayOfWeek);
  return dayOfWeek;
};
export const getCurrentDayOfWeek = (
  notificationTimeLocal: Date,
): DaysOfWeek => {
  // getDay => Sunday - Saturday : 0 - 6
  const dayOfWeekNumber = getDay(notificationTimeLocal);
  const daysOfWeek: DaysOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  const dayOfWeek = daysOfWeek[dayOfWeekNumber];
  // console.log('Day of week:', dayOfWeek);
  return dayOfWeek;
};
