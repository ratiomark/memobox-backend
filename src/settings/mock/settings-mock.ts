import { Prisma } from '@prisma/client';
import {
  TimeSleepSettings,
  NotificationSettings,
  SleepPeriod,
} from '@/aggregate/entities/settings-types';

export const generalTimeSleepDataDefault: SleepPeriod = {
  startTime: '23:00',
  durationMinutes: 480,
};

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

// export const timeSleepMock: TimeSleepSettings = {
//   isTimeSleepEnabled: true,
//   isDayByDayOptionEnabled: false,
//   generalSleepPeriod: {
//     startTime: '23:00',
//     durationMinutes: 480,
//   },
//   // generalTimeSleepData: {
//   //   up: {
//   //     hours: 7,
//   //     minutes: 0,
//   //   },
//   //   down: {
//   //     hours: 23,
//   //     minutes: 0,
//   //   },
//   // },
// };
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
  emailNotificationsEnabled: true,
  minimumCardsForEmailNotification: 10,
  mobilePushEnabled: false,
  minimumCardsForPush: 15,
  notificationEmails: [],
};

export const shelfTemplateDefaultMock = [
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
];

export interface DefaultSettings {
  timeSleep: Prisma.JsonValue | TimeSleepSettings;
  shelfTemplate: Prisma.JsonValue;
  missedTraining: string;
  notifications: Prisma.JsonValue | NotificationSettings;
}
