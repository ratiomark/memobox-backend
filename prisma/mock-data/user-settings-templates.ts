import {
  TimeSleepSettings,
  NotificationSettings,
  TimingBlock,
} from 'src/aggregate/entities/settings-types';

export const timeSleepMock: TimeSleepSettings = {
  isTimeSleepEnabled: true,
  isDayByDayOptionEnabled: false,
  generalTimeSleepData: {
    up: {
      hours: 8,
      minutes: 0,
    },
    down: {
      hours: 22,
      minutes: 0,
    },
  },
  dayByDayTimeSleepData: {
    monday: {
      up: {
        hours: 8,
        minutes: 0,
      },
      down: {
        hours: 22,
        minutes: 0,
      },
    },
    tuesday: {
      up: {
        hours: 8,
        minutes: 0,
      },
      down: {
        hours: 22,
        minutes: 0,
      },
    },
    wednesday: {
      up: {
        hours: 8,
        minutes: 0,
      },
      down: {
        hours: 22,
        minutes: 0,
      },
    },
    thursday: {
      up: {
        hours: 8,
        minutes: 0,
      },
      down: {
        hours: 22,
        minutes: 0,
      },
    },
    friday: {
      up: {
        hours: 8,
        minutes: 0,
      },
      down: {
        hours: 22,
        minutes: 0,
      },
    },
    saturday: {
      up: {
        hours: 8,
        minutes: 0,
      },
      down: {
        hours: 22,
        minutes: 0,
      },
    },
    sunday: {
      up: {
        hours: 8,
        minutes: 0,
      },
      down: {
        hours: 22,
        minutes: 0,
      },
    },
  },
};

export const notificationsMock: NotificationSettings = {
  mobilePushEnabled: true,
  emailNotificationsEnabled: true,
  minimumCardsForPush: 15,
  minimumCardsForEmailNotification: 10,
  notificationEmails: [
    {
      email: 'someEmail@mail.com',
      verified: true,
    },
    {
      email: 'someNotVerifiedEmail@mail.com',
      verified: false,
    },
  ],
};

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
