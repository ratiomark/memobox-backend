import {
  TimeSleepSettings,
  NotificationSettings,
  TimingBlock,
  SleepPeriod,
} from 'src/aggregate/entities/settings-types';
import { TESTER_EMAIL } from '../../test/utils/constants';

export const generalTimeSleepDataDefault: SleepPeriod = {
  startTime: '23:00',
  durationMinutes: 480,
};

// export const generalTimeSleepDataDefault: TimeSleepDataObject = {
//   up: {
//     hours: 7,
//     minutes: 0,
//   },
//   down: {
//     hours: 23,
//     minutes: 0,
//   },
// };

export const timeSleepMock: TimeSleepSettings = {
  isTimeSleepEnabled: true,
  isDayByDayOptionEnabled: false,
  generalSleepPeriod: generalTimeSleepDataDefault,
  dayByDaySleepPeriods: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  // generalTimeSleepData: generalTimeSleepDataDefault,
};

const timeSleepMockExtended = {
  monday: generalTimeSleepDataDefault,
  tuesday: generalTimeSleepDataDefault,
  wednesday: generalTimeSleepDataDefault,
  thursday: generalTimeSleepDataDefault,
  friday: generalTimeSleepDataDefault,
  saturday: generalTimeSleepDataDefault,
  sunday: generalTimeSleepDataDefault,
};

export const notificationsMock: NotificationSettings = {
  mobilePushEnabled: false,
  emailNotificationsEnabled: true,
  minimumCardsForPush: 15,
  minimumCardsForEmailNotification: 10,
  notificationEmails: [
    {
      email: TESTER_EMAIL,
      verified: false,
    },
  ],
};

export const shelfTemplateTestMock = [
  // export const shelfTemplateDefaultMock: TimingBlock[] = [
  {
    minutes: 5,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 8,
    days: 0,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 1,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 1,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 1,
  },
  {
    minutes: 0,
    hours: 0,
    days: 28,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 3,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 2,
    weeks: 3,
    months: 1,
  },
  {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 2,
  },
  {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 4,
    months: 2,
  },
];
export const shelfTemplateDefaultMock = [
  // export const shelfTemplateDefaultMock: TimingBlock[] = [
  {
    minutes: 5,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 8,
    days: 0,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 1,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 3,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 14,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 28,
    weeks: 0,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 3,
    months: 0,
  },
  {
    minutes: 0,
    hours: 0,
    days: 2,
    weeks: 3,
    months: 1,
  },
  {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 2,
  },
  {
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 4,
    months: 2,
  },
];

function toJsonStringForPrisma(value) {
  return JSON.stringify(value).replace(/"/g, '\\"');
}
