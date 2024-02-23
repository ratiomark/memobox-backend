// export type DynamoDBSignature = TrainingNotificationSignature;

export type TrainingNotificationItem = {
  TableName: string;
  Item: {
    notificationId: string;
    time: string;
    email: string;
    language: string;
    notificationType: string;
  };
};
