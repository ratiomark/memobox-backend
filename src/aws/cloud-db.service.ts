import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { TrainingNotificationItem } from './types/db-tables';
import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CloudDbService implements OnModuleInit {
  private nodeEnv: string;
  private readonly docClient: DynamoDBDocumentClient;
  private readonly logger = new Logger(CloudDbService.name);
  //  const { data } = await firstValueFrom<{ data: string }>(
  //           this.httpService.get(`http://${dbHost}:3001/restore-db`),
  //         );
  //         result = data;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    const client = new DynamoDB({
      region: 'eu-central-1', // Или используйте ConfigService для динамической настройки
    });
    this.docClient = DynamoDBDocumentClient.from(client);
  }
  onModuleInit() {
    const nodeEnv = this.configService.getOrThrow('app.nodeEnv', {
      infer: true,
    });
    this.nodeEnv = nodeEnv;
  }

  async addOrUpdateTrainingNotification(
    notificationItem: TrainingNotificationItem,
  ) {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - DynamoDb ignored');
      return;
    }
    try {
      const headers = {
        'x-api-key': '12345',
      };
      const { data } = await firstValueFrom<{ data: any }>(
        this.httpService.post(
          `http://memobox-vercel-edge-functions.vercel.app/api/addNotifications`,
          [notificationItem],
          { headers },
        ),
      );
      this.logger.debug(
        'addOrUpdateTrainingNotification:',
        JSON.stringify(data, null, 3),
      );
      this.logger.log('Notification item added successfully');
    } catch (error) {
      this.logger.error('Error adding notification item:', error);
      throw error;
    }
  }

  async replaceTrainingNotification(
    notificationItem: TrainingNotificationItem,
    lastNotificationTime: Date,
  ) {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - DynamoDb ignored');
      return;
    }
    try {
      // Удаляем старую запись с тем же notificationId
      await this.addOrUpdateTrainingNotification(notificationItem);
      this.logger.log('Notification item replaced successfully');
    } catch (error) {
      this.logger.error('Error replacing notification item:', error);
      throw error;
    }
  }

  async addOrUpdateTrainingNotificationList(
    notificationItems: TrainingNotificationItem[],
  ) {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - DynamoDb ignored');
      return;
    }
    if (notificationItems.length === 0) {
      this.logger.debug('Empty notificationItems list');
      return;
    }
    // Разбиваем весь массив записей на пачки по 25 элементов, так как это максимум для BatchWriteItem
    const headers = {
      'x-api-key': '12345',
    };

    try {
      const { data } = await firstValueFrom<{ data: any }>(
        this.httpService.post(
          `http://memobox-vercel-edge-functions.vercel.app/api/addNotifications`,
          // `http://memobox-vercel-edge-functions-l9x9mmwmc-ratiomarks-projects.vercel.app/api/addNotifications`,
          notificationItems,
          { headers },
        ),
      );
      this.logger.debug(
        'addOrUpdateTrainingNotificationList  ',
        JSON.stringify(data, null, 3),
      );
    } catch (error) {
      this.logger.error('Error adding batch of notification items:', error);
      throw error;
    }
  }

  // async getAllEmails() {
  //   if (this.nodeEnv === 'testing') {
  //     this.logger.log('Testing Mode - DynamoDb ignored');
  //     return;
  //   }

  //   // Разбиваем весь массив записей на пачки по 25 элементов, так как это максимум для BatchWriteItem
  //   const headers = {
  //     'x-api-key': '12345',
  //   };

  //   try {
  //     const { data } = await firstValueFrom<{ data: any }>(
  //       this.httpService.get(
  //         `http://memobox-vercel-edge-functions.vercel.app/api/getNotifications`,
  //         { headers },
  //       ),
  //     );
  //     this.logger.debug(
  //       'addOrUpdateTrainingNotificationList  ',
  //       JSON.stringify(data, null, 3),
  //     );
  //     return data;
  //   } catch (error) {
  //     this.logger.error('Error getAllEmails:', error);
  //     throw error;
  //   }
  // }
}
// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// import { DynamoDB } from '@aws-sdk/client-dynamodb';
// import {
//   BatchWriteCommand,
//   DeleteCommand,
//   DynamoDBDocumentClient,
//   PutCommand,
// } from '@aws-sdk/lib-dynamodb';
// import { TrainingNotificationItem } from './types/db-tables';
// import { AllConfigType } from '@/config/config.type';
// import { ConfigService } from '@nestjs/config';
// import { HttpService } from '@nestjs/axios';

// @Injectable()
// export class DynamoDbService implements OnModuleInit {
//   private nodeEnv: string;
//   private readonly docClient: DynamoDBDocumentClient;
//   private readonly logger = new Logger(DynamoDbService.name);
//   //  const { data } = await firstValueFrom<{ data: string }>(
//   //           this.httpService.get(`http://${dbHost}:3001/restore-db`),
//   //         );
//   //         result = data;
//   constructor(
//     private readonly httpService: HttpService,
//     private readonly configService: ConfigService<AllConfigType>,
//   ) {
//     const client = new DynamoDB({
//       region: 'eu-central-1', // Или используйте ConfigService для динамической настройки
//     });
//     this.docClient = DynamoDBDocumentClient.from(client);
//   }
//   onModuleInit() {
//     const nodeEnv = this.configService.getOrThrow('app.nodeEnv', {
//       infer: true,
//     });
//     this.nodeEnv = nodeEnv;
//   }

//   async addOrUpdateTrainingNotification(
//     notificationItem: TrainingNotificationItem,
//   ) {
//     if (this.nodeEnv === 'testing') {
//       this.logger.log('Testing Mode - DynamoDb ignored');
//       return;
//     }
//     try {
//       await this.docClient.send(
//         new PutCommand({
//           TableName: 'Notifications', // notification.TableName,
//           Item: notificationItem,
//           // Item: notification.Item,
//         }),
//       );
//       this.logger.log('Notification item added successfully');
//     } catch (error) {
//       this.logger.error('Error adding notification item:', error);
//       throw error;
//     }
//   }

//   async replaceTrainingNotification(
//     notificationItem: TrainingNotificationItem,
//     lastNotificationTime: Date,
//   ) {
//     if (this.nodeEnv === 'testing') {
//       this.logger.log('Testing Mode - DynamoDb ignored');
//       return;
//     }
//     try {
//       // Удаляем старую запись с тем же notificationId
//       await this.docClient.send(
//         new DeleteCommand({
//           TableName: 'Notifications',
//           Key: {
//             notificationId: notificationItem.notificationId,
//             // Используйте исходное notificationTime, если оно известно
//             notificationTime: lastNotificationTime,
//           },
//         }),
//       );

//       // Создаем новую запись с новым notificationTime
//       await this.docClient.send(
//         new PutCommand({
//           TableName: 'Notifications',
//           Item: notificationItem,
//         }),
//       );
//       this.logger.log('Notification item replaced successfully');
//     } catch (error) {
//       this.logger.error('Error replacing notification item:', error);
//       throw error;
//     }
//   }

//   async addOrUpdateTrainingNotificationList(
//     notificationItems: TrainingNotificationItem[],
//   ) {
//     if (this.nodeEnv === 'testing') {
//       this.logger.log('Testing Mode - DynamoDb ignored');
//       return;
//     }

//     // Разбиваем весь массив записей на пачки по 25 элементов, так как это максимум для BatchWriteItem

//     const batches: TrainingNotificationItem[][] = [];
//     while (notificationItems.length) {
//       batches.push(notificationItems.splice(0, 25));
//     }
//     const TableName = 'Notifications';
//     try {
//       for (const batch of batches) {
//         const writeRequests = batch.map((item) => ({
//           PutRequest: {
//             Item: item,
//           },
//         }));

//         await this.docClient.send(
//           new BatchWriteCommand({
//             RequestItems: {
//               [TableName]: writeRequests,
//             },
//           }),
//         );

//         this.logger.log('Batch of notification items added successfully');
//       }
//     } catch (error) {
//       this.logger.error('Error adding batch of notification items:', error);
//       throw error;
//     }
//   }
// }
