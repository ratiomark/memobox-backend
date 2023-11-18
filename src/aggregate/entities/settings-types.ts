export interface TimingBlock {
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}

interface NotificationEmails {
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

export interface TimeSleepDataObject {
  up: {
    hours: number;
    minutes: number;
  };
  down: {
    hours: number;
    minutes: number;
  };
}

export type DaysOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface TimeSleepSettings {
  isTimeSleepEnabled: boolean;
  isDayByDayOptionEnabled: boolean;
  generalTimeSleepData: TimeSleepDataObject;
  dayByDayTimeSleepData?: {
    [key in DaysOfWeek]: TimeSleepDataObject;
  };
}
export interface UserSettings {
  notifications: NotificationSettings;
  missedTrainingValue: 'none' | 'additionalTraining' | 'sendBackwards';
  shelfTemplate: TimingBlock[];
  timeSleep: TimeSleepSettings;
}
