export interface TimingBlock {
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}

export interface NotificationEmails {
  email: string;
  verified: boolean;
}

export interface NotificationSettings {
  mobilePushEnabled: boolean;
  emailNotificationsEnabled: boolean;
  minimumCardsForPush: number;
  minimumCardsForEmailNotification: number;
  notificationEmails: NotificationEmails[];
}

export type DaysOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface SleepPeriod {
  startTime: string; // Формат "HH:mm"
  durationMinutes: number;
}

export interface TimeSleepAtomicDataObject {
  hours: number;
  minutes: number;
}

export interface SleepPeriodFrontendRequest {
  startTime: TimeSleepAtomicDataObject; // Формат "HH:mm"
  durationMinutes: number;
}

export interface TimeSleepSettings {
  isTimeSleepEnabled: boolean;
  isDayByDayOptionEnabled: boolean;
  generalSleepPeriod: SleepPeriod;
  dayByDaySleepPeriods: {
    [key in DaysOfWeek]: SleepPeriod[];
  };
}

// export interface TimeSleepSettings {
//   isTimeSleepEnabled: boolean;
//   isDayByDayOptionEnabled: boolean;
//   generalTimeSleepData: TimeSleepDataObject;
//   dayByDayTimeSleepData?: {
//     [key in DaysOfWeek]: TimeSleepDataObject;
//   };
// }
export interface UserSettings {
  notifications: NotificationSettings;
  missedTrainingValue: 'none' | 'additionalTraining' | 'sendBackwards';
  shelfTemplate: TimingBlock[];
  timeSleep: TimeSleepSettings;
}
