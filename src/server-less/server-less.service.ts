import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { TrainingNotificationItem } from '@/aws/types/db-tables';
import { AllConfigType } from '@/config/config.type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { MailData } from '@/mail/interfaces/mail-data.interface';
import { PushTrainingNotification } from '@/notification/types/types';
import { UserId } from 'aws-sdk/clients/appstream';
import axios from 'axios';

@Injectable()
// export class ServerLessService {
export class ServerLessService implements OnModuleInit {
  private nodeEnv: string;
  private xApiKey: string;
  private baseHeader: any;
  private readonly logger = new Logger(ServerLessService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    // const url = this.httpService.axiosRef.getUri();
    // this.logger.warn('url');
    // this.logger.warn(url);
    // this.initVariables();
  }
  onModuleInit() {
    const url = this.httpService.axiosRef.getUri();
    this.logger.warn('url');
    this.logger.warn(url);
    this.initVariables();
  }

  async addOrUpdateEmailTrainingNotification(
    notificationItem: TrainingNotificationItem,
  ) {
    await this.addOrUpdateEmailTrainingNotificationList([notificationItem]);
  }

  async addOrUpdateEmailTrainingNotificationList(
    notificationItems: TrainingNotificationItem[],
  ) {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - ServerLessService ignored');
      return;
    }
    if (notificationItems.length === 0) {
      this.logger.debug('Empty notificationItems list');
      return;
    }

    try {
      const { data } = await firstValueFrom<{ data: any }>(
        this.httpService.post(`/addNotifications`, notificationItems, {
          headers: this.baseHeader,
        }),
      );
      // this.logger.debug(
      //   'addOrUpdateTrainingNotificationList  ',
      //   JSON.stringify(data, null, 3),
      // );
    } catch (error) {
      this.logger.error('Error adding batch of notification items:', error);
      throw error;
    }
  }

  async createIndexPushNotification() {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - ServerLessService ignored');
      return;
    }
    // if (notificationItems.length === 0) {
    //   this.logger.debug('Empty notificationItems list');
    //   return;
    // }

    try {
      await firstValueFrom<{ data: any }>(
        this.httpService.post(
          `/createIndexPushNotification`,
          {},
          {
            headers: this.baseHeader,
          },
        ),
      );
    } catch (error) {
      this.logger.error('Error adding batch of notification items:', error);
      throw error;
    }
  }

  async createIndexEmailNotifications() {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - ServerLessService ignored');
      return;
    }
    try {
      await firstValueFrom<{ data: any }>(
        this.httpService.post(
          `/createIndexEmailNotifications`,
          {},
          {
            headers: this.baseHeader,
          },
        ),
      );
    } catch (error) {
      this.logger.error('Error adding batch of notification items:', error);
      throw error;
    }
  }

  async sendEmail(
    mailData: MailData<{ hash?: string; name?: string; testNumber?: number }>,
  ) {
    const body = {
      to: mailData.to,
      language: mailData.language,
      emailType: mailData.emailType,
      data: mailData.data,
    };

    try {
      const { data } = await firstValueFrom<{ data: any }>(
        this.httpService.post(`/sendEmail`, body, {
          headers: this.baseHeader,
        }),
      );
      this.logger.debug('sendEmail ', JSON.stringify(data, null, 3));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error('Ошибка запроса:', error.message);
        if (error.response) {
          this.logger.error('Статус ответа:', error.response.status);
          this.logger.error('Заголовки ответа:', error.response.headers);
          this.logger.error('Данные ответа:', error.response.data);
        }
      } else {
        this.logger.error('Неожиданная ошибка:', error);
      }
      // console.error('Error calling ActivateEmail function:', error);
    }
  }

  async sendAllEmailNotifications() {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - ServerLessService ignored');
      return;
    }
    try {
      await firstValueFrom<{ data: any }>(
        this.httpService.post(
          `/sendAllEmailNotifications`,
          {},
          { headers: this.baseHeader },
        ),
      );
    } catch (error) {
      this.logger.error('Error sendAllEmailNotifications:', error);
      throw error;
    }
  }
  async sendAllPushNotifications() {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - ServerLessService ignored');
      return;
    }
    try {
      await firstValueFrom<{ data: any }>(
        this.httpService.post(
          `/sendAllPushNotifications`,
          {},
          { headers: this.baseHeader },
        ),
      );
    } catch (error) {
      this.logger.error('Error sendAllEmailNotifications:', error);
      throw error;
    }
  }

  async addOrUpdatePushTrainingNotification(
    notificationItem: PushTrainingNotification,
  ) {
    await this.addOrUpdatePushTrainingNotificationList([notificationItem]);
  }

  async addOrUpdatePushTrainingNotificationList(
    notificationItems: PushTrainingNotification[],
  ) {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - ServerLessService ignored');
      return;
    }
    if (notificationItems.length === 0) {
      this.logger.debug('Empty notificationItems list');
      return;
    }

    try {
      // const { data } =
      await firstValueFrom<{ data: any }>(
        this.httpService.post(`/addPushes`, notificationItems, {
          headers: this.baseHeader,
        }),
      );
      // this.logger.debug(
      //   'addPushes  ',
      //   JSON.stringify(data, null, 3),
      // );
    } catch (error) {
      this.logger.error('Error adding batch of notification items:', error);
      throw error;
    }
  }

  async removeTrainingPushNotifications(notificationIds: UserId[]) {
    if (this.nodeEnv === 'testing') {
      this.logger.log('Testing Mode - ServerLessService ignored');
      return;
    }
    if (notificationIds.length === 0) {
      this.logger.debug('Empty notificationId list');
      return;
    }

    try {
      // const { data } =
      await firstValueFrom<{ data: any }>(
        this.httpService.post(
          `/removePushes`,
          { notificationIds },
          {
            headers: this.baseHeader,
          },
        ),
      );
      // this.logger.debug(
      //   'removePushes  ',
      //   JSON.stringify(data, null, 3),
      // );
    } catch (error) {
      this.logger.error('Error adding batch of notification items:', error);
      throw error;
    }
  }

  //   create(createServerLessDto: CreateServerLessDto) {
  //     return 'This action adds a new serverLess';
  //   }
  //   findAll() {
  //     return `This action returns all serverLess`;
  //   }
  //   findOne(id: number) {
  //     return `This action returns a #${id} serverLess`;
  //   }
  //   update(id: number, updateServerLessDto: UpdateServerLessDto) {
  //     return `This action updates a #${id} serverLess`;
  //   }
  //   remove(id: number) {
  //     return `This action removes a #${id} serverLess`;
  //   }
  initVariables() {
    this.nodeEnv = this.configService.getOrThrow<string>('NODE_ENV', {
      infer: true,
    });
    this.xApiKey = this.configService.getOrThrow<string>(
      'SERVERLESS_X_API_KEY',
      {
        infer: true,
      },
    );
    // this.baseUrl = this.configService.getOrThrow<string>(
    //   'SERVERLESS_BASE_URL',
    //   {
    //     infer: true,
    //   },
    // );
    this.baseHeader = {
      'x-api-key': this.xApiKey,
    };
  }
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
// import { firstValueFrom } from 'rxjs';

// @Injectable()
// export class CloudDbService implements OnModuleInit {
//   private nodeEnv: string;
//   private readonly docClient: DynamoDBDocumentClient;
//   private readonly logger = new Logger(CloudDbService.name);
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
//       const headers = {
//         'x-api-key': '12345',
//       };
//       const { data } = await firstValueFrom<{ data: any }>(
//         this.httpService.post(
//           `http://memobox-vercel-edge-functions.vercel.app/api/addNotifications`,
//           [notificationItem],
//           { headers },
//         ),
//       );
//       this.logger.debug(
//         'addOrUpdateTrainingNotification:',
//         JSON.stringify(data, null, 3),
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
//       await this.addOrUpdateTrainingNotification(notificationItem);
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
//     if (notificationItems.length === 0) {
//       this.logger.debug('Empty notificationItems list');
//       return;
//     }
//     // Разбиваем весь массив записей на пачки по 25 элементов, так как это максимум для BatchWriteItem
//     const headers = {
//       'x-api-key': '12345',
//     };

//     try {
//       const { data } = await firstValueFrom<{ data: any }>(
//         this.httpService.post(
//           `http://memobox-vercel-edge-functions.vercel.app/api/addNotifications`,
//           // `http://memobox-vercel-edge-functions-l9x9mmwmc-ratiomarks-projects.vercel.app/api/addNotifications`,
//           notificationItems,
//           { headers },
//         ),
//       );
//       this.logger.debug(
//         'addOrUpdateTrainingNotificationList  ',
//         JSON.stringify(data, null, 3),
//       );
//     } catch (error) {
//       this.logger.error('Error adding batch of notification items:', error);
//       throw error;
//     }
//   }
// }
