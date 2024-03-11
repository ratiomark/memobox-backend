// export type DynamoDBSignature = TrainingNotificationSignature;

export type TrainingNotificationItem = {
  TableName: string;
  Item: {
    notificationId: string;
    notificationTime: string;
    email: string;
    language: string;
    notificationType: 'training' | 'validateEmail';
  };
};
