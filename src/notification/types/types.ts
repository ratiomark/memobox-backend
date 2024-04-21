export interface UserNotificationData {
  email: string;
  language: string;
  name: string;
}

// export type DynamoDBSignature = TrainingNotificationSignature;

export type TrainingNotificationItem = {
  notificationId: string;
  notificationTime: string;
  email: string;
  name: string;
  user_language: string;
  notificationType: 'trainingNotification';
  // notificationType: 'training' | 'validateEmail';
};

export type PushTrainingNotification = {
  notificationId: string;
  notificationTime: string;
  // name: string;
  user_language: string;
};

type PushNotificationTag = 'trainingNotification' | 'subscriptionNotification';

interface PushNotificationBasePayload {
  tag: PushNotificationTag;
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  data?: {
    firstName?: string;
    url?: string;
  };
}

export interface PushTrainingNotificationPayload
  extends PushNotificationBasePayload {
  data: {
    url: '/training/all/all';
  };
}
