import { DaysOfWeek } from '@/aggregate/entities/settings-types';
import { getDay } from 'date-fns';

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
  // console.log('Day of week:', dayOfWeek);
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
