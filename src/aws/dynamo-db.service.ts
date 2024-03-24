import { Injectable } from '@nestjs/common';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { TrainingNotificationItem } from './types/db-tables';

@Injectable()
export class DynamoDbService {
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    const client = new DynamoDB({
      region: 'eu-central-1', // Или используйте ConfigService для динамической настройки
    });
    this.docClient = DynamoDBDocumentClient.from(client);
  }

  async addOrUpdateTrainingNotification(
    notificationItem: TrainingNotificationItem,
  ) {
    try {
      await this.docClient.send(
        new PutCommand({
          TableName: 'Notifications', // notification.TableName,
          Item: notificationItem,
          // Item: notification.Item,
        }),
      );
      console.log('Notification item added successfully');
    } catch (error) {
      console.error('Error adding notification item:', error);
      throw error;
    }
  }
}
// import { Injectable } from '@nestjs/common';
// import { DynamoDB } from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
// import { TrainingNotificationItem } from './types/db-tables';

// @Injectable()
// export class DynamoDbService {
//   private readonly docClient: DynamoDBDocumentClient;

//   constructor() {
//     const client = new DynamoDB({
//       region: 'eu-central-1', // Или используйте ConfigService для динамической настройки
//     });
//     this.docClient = DynamoDBDocumentClient.from(client);
//   }

//   async addOrUpdateTrainingNotification(
//     notification: TrainingNotificationItem,
//   ) {
//     try {
//       await this.docClient.send(
//         new PutCommand({
//           TableName: notification.TableName,
//           Item: notification.Item,
//         }),
//       );
//       console.log('Notification item added successfully');
//     } catch (error) {
//       console.error('Error adding notification item:', error);
//       throw error;
//     }
//   }

//   // async addItem(argumentDb: DynamoDBSignature) {
//   //   const params = {
//   //     TableName: argumentDb.TableName,
//   //     Item: argumentDb.Item,
//   //   };

//   //   try {
//   //     await this.docClient.send(new PutCommand(params));
//   //     console.log('Item added successfully');
//   //   } catch (error) {
//   //     console.error('Error adding item:', error);
//   //     throw error;
//   //   }
//   // }
// }
