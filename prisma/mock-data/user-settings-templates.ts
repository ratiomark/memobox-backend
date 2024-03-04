import {
  TimeSleepSettings,
  NotificationSettings,
  TimingBlock,
} from 'src/aggregate/entities/settings-types';
import { TESTER_EMAIL } from 'test/utils/constants';

export const timeSleepMock: TimeSleepSettings = {
  isTimeSleepEnabled: true,
  isDayByDayOptionEnabled: false,
  generalTimeSleepData: {
    up: {
      hours: 7,
      minutes: 0,
    },
    down: {
      hours: 23,
      minutes: 0,
    },
  },
};
const timeSleepMockExtended = {
  monday: {
    up: {
      hours: 7,
      minutes: 0,
    },
    down: {
      hours: 23,
      minutes: 0,
    },
  },
  tuesday: {
    up: {
      hours: 7,
      minutes: 0,
    },
    down: {
      hours: 23,
      minutes: 0,
    },
  },
  wednesday: {
    up: {
      hours: 7,
      minutes: 0,
    },
    down: {
      hours: 23,
      minutes: 0,
    },
  },
  thursday: {
    up: {
      hours: 7,
      minutes: 0,
    },
    down: {
      hours: 23,
      minutes: 0,
    },
  },
  friday: {
    up: {
      hours: 7,
      minutes: 0,
    },
    down: {
      hours: 23,
      minutes: 0,
    },
  },
  saturday: {
    up: {
      hours: 7,
      minutes: 0,
    },
    down: {
      hours: 23,
      minutes: 0,
    },
  },
  sunday: {
    up: {
      hours: 7,
      minutes: 0,
    },
    down: {
      hours: 23,
      minutes: 0,
    },
  },
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
