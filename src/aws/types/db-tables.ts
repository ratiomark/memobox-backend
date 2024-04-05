// export type DynamoDBSignature = TrainingNotificationSignature;

export type TrainingNotificationItem = {
  // TableName: string;
  // Item: {
  notificationId: string;
  notificationTime: string;
  email: string;
  name: string;
  user_language: string;
  notificationType: 'trainingNotification';
  // notificationType: 'training' | 'validateEmail';
  // };
};
