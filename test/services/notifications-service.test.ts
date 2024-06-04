import { TimeSleepSettings } from '@/aggregate/entities/settings-types';
import { NotificationService } from '@/notification/notification.service';
import { SettingsService } from '@/settings/settings.service';
import { generalTimeSleepDataDefault } from '../../prisma/mock-data/user-settings-templates';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { utcToZonedTime } from 'date-fns-tz';
import { getDay } from 'date-fns';
// import { DynamoDbService } from '@/aws/dynamo-db.service';
import { RedisService } from '@/redis/redis.service';
import { PrismaService } from 'nestjs-prisma';
import { ServerLessService } from '@/server-less/server-less.service';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { NotificationDataProcessorService } from '@/notification/notification-data-processor.service';
// Март 2024 года
// понедельник - 4, 11, 18, 25
// вторник - 5, 12, 19, 26
// среда - 6, 13, 20, 27
// четверг - 7, 14, 21, 28
// пятница - 1, 8, 15, 22, 29
// суббота - 2, 9, 16, 23, 30
// восскресенье - 3, 10, 17, 24, 31
describe('NotificationProcessorService', () => {
  let notificationService: NotificationDataProcessorService;
  let mockEventEmitter: Partial<EventEmitter2>;
  let mockSettingsService: Partial<SettingsService>;
  // let mockDynamoService: Partial<DynamoDbService>;
  let mockRedisService: Partial<RedisService>;
  let mockPrismaService: Partial<PrismaService>;
  let serverless: Partial<ServerLessService>;
  let configService: Partial<ConfigService<AllConfigType>>;

  beforeEach(async () => {
    mockEventEmitter = {};
    mockSettingsService = {
      // здесь мокируем методы, если они используются в вашем сервисе
    };
    // mockDynamoService = {};
    serverless = {};
    configService = {};
    mockRedisService = {
      // getUserNotificationData: jest.fn().mockResolvedValue({
      //   email: 'email@example.com',
      //   language: 'en',
      // }),
      saveUserNotificationData: jest.fn(),
    };

    const module = await Test.createTestingModule({
      // Не забудьте добавить свой сервис и все его зависимости
      providers: [
        NotificationDataProcessorService,
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
        {
          provide: SettingsService,
          useValue: mockSettingsService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        // {
        //   provide: DynamoDbService,
        //   useValue: mockDynamoService,
        // },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
        {
          provide: ServerLessService,
          useValue: serverless,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    notificationService = module.get<NotificationDataProcessorService>(
      NotificationDataProcessorService,
    );
    jest
      .spyOn(notificationService, 'getUserNotificationData')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async (userId: string) => ({
        email: 'email@example.com',
        language: 'en',
        name: 'Test name',
      }));
  });

  // describe('getNotificationTimeAdjusted with different dayByDaySleepPeriods for April 2024 - v1', () => {
  //   const baseTimeSleepSettings: TimeSleepSettings = {
  //     isTimeSleepEnabled: true,
  //     isDayByDayOptionEnabled: true,
  //     generalSleepPeriod: {
  //       startTime: '22:00',
  //       durationMinutes: 480,
  //     },
  //     dayByDaySleepPeriods: {
  //       monday: [{ startTime: '23:00', durationMinutes: 480 }],
  //       tuesday: [
  //         { startTime: '22:30', durationMinutes: 300 },
  //         { startTime: '04:00', durationMinutes: 240 },
  //       ],
  //       wednesday: [],
  //       thursday: [{ startTime: '21:30', durationMinutes: 540 }],
  //       friday: [{ startTime: '00:30', durationMinutes: 390 }],
  //       saturday: [
  //         { startTime: '23:59', durationMinutes: 360 },
  //         { startTime: '11:00', durationMinutes: 60 },
  //       ],
  //       sunday: [{ startTime: '20:00', durationMinutes: 660 }],
  //     },
  //   };

  //   it('should handle sleep period on Monday', () => {
  //     // sunday: [{ startTime: '20:00', durationMinutes: 660 }],
  //     // monday: [{ startTime: '23:00', durationMinutes: 480 }],
  //     // tuesday: [
  //     //   { startTime: '22:30', durationMinutes: 300 },
  //     //   { startTime: '04:00', durationMinutes: 240 },
  //     // ],
  //     const notificationTimeLocal = new Date('2024-04-08T23:30:00'); // Monday
  //     // 1. Для понедельника есть один период сна, начинающийся в 23:00
  //     // 2. Время уведомления попадает в период сна понедельника
  //     // 3. Возвращается время окончания периода сна понедельника
  //     const expectedAdjustedTime = new Date('2024-04-09T07:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle multiple sleep periods on Tuesday', () => {
  //     // monday: [{ startTime: '23:00', durationMinutes: 480 }],
  //     // tuesday: [
  //     //   { startTime: '22:30', durationMinutes: 300 },
  //     //   { startTime: '04:00', durationMinutes: 240 },
  //     // ],
  //     // wednesday: [],
  //     const notificationTimeLocal = new Date('2024-04-09T04:30:00'); // Tuesday
  //     // 1. Для вторника есть два периода сна
  //     // 2. Время уведомления попадает во второй период сна вторника
  //     // 3. Возвращается время окончания второго периода сна вторника
  //     const expectedAdjustedTime = new Date('2024-04-09T08:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle no sleep periods on Wednesday', () => {
  //     // tuesday: [
  //     //   { startTime: '22:30', durationMinutes: 300 },
  //     //   { startTime: '04:00', durationMinutes: 240 },
  //     // ],
  //     // wednesday: [],
  //     // thursday: [{ startTime: '21:30', durationMinutes: 540 }],
  //     const notificationTimeLocal = new Date('2024-04-10T12:00:00'); // Wednesday
  //     // 1. Для среды нет периодов сна
  //     // 2. Проверяется последний период сна вторника
  //     // 3. Время уведомления не попадает в период сна вторника
  //     // 4. Возвращается исходное время уведомления
  //     const expectedAdjustedTime = new Date('2024-04-10T12:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle sleep period on Thursday with before sleep offset', () => {
  //     // wednesday: [],
  //     // thursday: [{ startTime: '21:30', durationMinutes: 540 }],
  //     // friday: [{ startTime: '00:30', durationMinutes: 390 }],
  //     const notificationTimeLocal = new Date('2024-04-11T21:00:00'); // Thursday
  //     // 1. Для четверга есть один период сна, начинающийся в 21:30
  //     // 2. Время уведомления с учетом смещения до сна попадает в период сна четверга
  //     // 3. Возвращается время окончания периода сна четверга
  //     const expectedAdjustedTime = new Date('2024-04-12T06:30:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //         30,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle sleep period on Friday ending after midnight', () => {
  //     // thursday: [{ startTime: '21:30', durationMinutes: 540 }],
  //     // friday: [{ startTime: '00:30', durationMinutes: 390 }],
  //     // saturday: [
  //     //   { startTime: '23:59', durationMinutes: 360 },
  //     //   { startTime: '11:00', durationMinutes: 60 },
  //     // ],
  //     const notificationTimeLocal = new Date('2024-04-12T07:00:00'); // Friday
  //     // 1. Для пятницы есть один период сна, заканчивающийся после полуночи субботы
  //     // 2. Время уведомления попадает в период сна пятницы
  //     // 3. Возвращается время окончания периода сна пятницы
  //     const expectedAdjustedTime = new Date('2024-04-12T07:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle multiple sleep periods on Saturday', () => {
  //     // friday: [{ startTime: '00:30', durationMinutes: 390 }],
  //     // saturday: [
  //     //   { startTime: '23:59', durationMinutes: 360 },
  //     //   { startTime: '11:00', durationMinutes: 60 },
  //     // ],
  //     // sunday: [{ startTime: '20:00', durationMinutes: 660 }],
  //     const notificationTimeLocal = new Date('2024-04-14T00:30:00'); // Saturday
  //     // 1. Для субботы есть два периода сна
  //     // 2. Время уведомления попадает в первый период сна субботы
  //     // 3. Возвращается время окончания первого периода сна субботы
  //     const expectedAdjustedTime = new Date('2024-04-14T05:59:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle sleep period on Sunday with after sleep offset', () => {
  //     // saturday: [
  //     //   { startTime: '23:59', durationMinutes: 360 },
  //     //   { startTime: '11:00', durationMinutes: 60 },
  //     // ],
  //     // sunday: [{ startTime: '20:00', durationMinutes: 660 }],
  //     // monday: [{ startTime: '23:00', durationMinutes: 480 }],
  //     const notificationTimeLocal = new Date('2024-04-14T07:00:00'); // Sunday
  //     // 1. Для воскресенья есть один период сна, начинающийся в 20:00
  //     // 2. Время уведомления не попадает в период сна воскресенья
  //     // 3. Проверяю период сна субботы
  //     // 4. Время уведомления с учетом смещения после сна попадает не попадает в период сна
  //     // 5. Возвращается изначальное время уведомления
  //     const expectedAdjustedTime = new Date('2024-04-14T07:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //         0,
  //         60,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  //   it('should handle sleep period on Sunday with after sleep offset', () => {
  //     // saturday: [
  //     //   { startTime: '23:59', durationMinutes: 360 },
  //     //   { startTime: '11:00', durationMinutes: 60 },
  //     // ],
  //     // sunday: [{ startTime: '20:00', durationMinutes: 660 }],
  //     // monday: [{ startTime: '23:00', durationMinutes: 480 }],
  //     const notificationTimeLocal = new Date('2024-04-14T07:00:00'); // Sunday
  //     // 1. Для воскресенья есть один период сна, начинающийся в 20:00
  //     // 2. Время уведомления не попадает в период сна воскресенья
  //     // 3. Проверяю период сна субботы
  //     // 4. Время уведомления с учетом смещения после сна попадает попадает в период сна
  //     // 5. Возвращается изначальное время окончания сна с учетом смещения
  //     const expectedAdjustedTime = new Date('2024-04-14T07:59:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //         0,
  //         120,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle sleep period on Sunday with before and after sleep offsets', () => {
  //     // saturday: [
  //     //   { startTime: '23:59', durationMinutes: 360 },
  //     //   { startTime: '11:00', durationMinutes: 60 },
  //     // ],
  //     // sunday: [{ startTime: '20:00', durationMinutes: 660 }],
  //     // monday: [{ startTime: '23:00', durationMinutes: 480 }],
  //     const notificationTimeLocal = new Date('2024-04-21T19:30:00'); // Sunday
  //     // 1. Для воскресенья есть один период сна, начинающийся в 20:00
  //     // 2. Время уведомления с учетом смещения до сна попадает в период сна воскресенья
  //     // 3. Возвращается время окончания периода сна воскресенья с учетом смещения после сна
  //     const expectedAdjustedTime = new Date('2024-04-22T08:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //         30,
  //         60,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  // });

  // describe('getNotificationTimeAdjusted with different dayByDaySleepPeriods for April 2024 - v2', () => {
  //   const baseTimeSleepSettings: TimeSleepSettings = {
  //     isTimeSleepEnabled: true,
  //     isDayByDayOptionEnabled: true,
  //     generalSleepPeriod: {
  //       startTime: '22:00',
  //       durationMinutes: 480,
  //     },
  //     dayByDaySleepPeriods: {
  //       monday: [{ startTime: '22:30', durationMinutes: 510 }],
  //       tuesday: [],
  //       wednesday: [
  //         { startTime: '23:00', durationMinutes: 240 },
  //         { startTime: '04:00', durationMinutes: 180 },
  //       ],
  //       thursday: [{ startTime: '20:30', durationMinutes: 630 }],
  //       friday: [{ startTime: '00:00', durationMinutes: 480 }],
  //       saturday: [{ startTime: '23:30', durationMinutes: 540 }],
  //       sunday: [
  //         { startTime: '22:00', durationMinutes: 600 },
  //         { startTime: '09:00', durationMinutes: 60 },
  //       ],
  //     },
  //   };

  //   it('should handle sleep period with start time near midnight on Monday', () => {
  //     // sunday: [
  //     //   { startTime: '22:00', durationMinutes: 600 },
  //     //   { startTime: '09:00', durationMinutes: 60 },
  //     // ],
  //     // monday: [{ startTime: '22:30', durationMinutes: 510 }],
  //     const notificationTimeLocal = new Date('2024-04-08T22:45:00'); // Monday
  //     // 1. Для понедельника есть один период сна, начинающийся в 22:30
  //     // 2. Время уведомления попадает в период сна понедельника
  //     // 3. Возвращается время окончания периода сна понедельника
  //     const expectedAdjustedTime = new Date('2024-04-09T07:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle no sleep periods on Tuesday !!!!!!!!!!', () => {
  //     // monday: [{ startTime: '22:30', durationMinutes: 510 }],
  //     // tuesday: [],
  //     // wednesday: [
  //     //   { startTime: '23:00', durationMinutes: 240 },
  //     //   { startTime: '04:00', durationMinutes: 180 },
  //     // ],
  //     const notificationTimeLocal = new Date('2024-04-09T06:00:00'); // Tuesday
  //     const expectedAdjustedTime = new Date('2024-04-09T07:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  //   it('should handle no sleep periods on Tuesday', () => {
  //     // monday: [{ startTime: '22:30', durationMinutes: 510 }],
  //     // tuesday: [],
  //     // wednesday: [
  //     //   { startTime: '23:00', durationMinutes: 240 },
  //     //   { startTime: '04:00', durationMinutes: 180 },
  //     // ],
  //     const notificationTimeLocal = new Date('2024-04-09T12:00:00'); // Tuesday
  //     // 1. Для вторника нет периодов сна
  //     // 2. Проверяется последний период сна понедельника
  //     // 3. Время уведомления не попадает в период сна понедельника
  //     // 4. Возвращается исходное время уведомления
  //     const expectedAdjustedTime = new Date('2024-04-09T12:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  //   it('should handle multiple sleep periods on Wednesday', () => {
  //     // tuesday: [],
  //     // wednesday: [
  //     //   { startTime: '23:00', durationMinutes: 240 },
  //     //   { startTime: '04:00', durationMinutes: 180 },
  //     // ],
  //     // thursday: [{ startTime: '20:30', durationMinutes: 630 }],
  //     const notificationTimeLocal = new Date('2024-04-10T04:30:00'); // Wednesday
  //     // 1. Для среды есть два периода сна
  //     // 2. Время уведомления попадает во второй период сна среды
  //     // 3. Возвращается время окончания второго периода сна среды
  //     const expectedAdjustedTime = new Date('2024-04-10T07:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  //   // it('should handle multiple sleep periods on Wednesday', () => {
  //   //   // tuesday: [],
  //   //   // wednesday: [
  //   //   //   { startTime: '23:00', durationMinutes: 240 },
  //   //   //   { startTime: '04:00', durationMinutes: 180 },
  //   //   // ],
  //   //   // thursday: [{ startTime: '20:30', durationMinutes: 630 }],
  //   //   const notificationTimeLocal = new Date('2024-04-11T04:30:00'); // Wednesday
  //   //   // 1. Для среды есть два периода сна
  //   //   // 2. Время уведомления попадает во второй период сна среды
  //   //   // 3. Возвращается время окончания второго периода сна среды
  //   //   const expectedAdjustedTime = new Date('2024-04-11T07:00:00');
  //   //   const timeSleepSettings: TimeSleepSettings = {
  //   //     ...baseTimeSleepSettings,
  //   //   };
  //   //   expect(
  //   //     notificationService.getNotificationTimeAdjusted(
  //   //       notificationTimeLocal,
  //   //       timeSleepSettings,
  //   //     ),
  //   //   ).toEqual(expectedAdjustedTime);
  //   // });

  //   it('should handle sleep period with minimum duration on Thursday', () => {
  //     // wednesday: [
  //     //   { startTime: '23:00', durationMinutes: 240 },
  //     //   { startTime: '04:00', durationMinutes: 180 },
  //     // ],
  //     // thursday: [{ startTime: '20:30', durationMinutes: 630 }],
  //     // friday: [{ startTime: '00:00', durationMinutes: 480 }],
  //     const notificationTimeLocal = new Date('2024-04-11T20:30:00'); // Thursday
  //     // 1. Для четверга есть один период сна с минимальной длительностью 630 минут
  //     // 2. Время уведомления точно совпадает с началом периода сна четверга
  //     // 3. Возвращается время окончания периода сна четверга
  //     const expectedAdjustedTime = new Date('2024-04-12T07:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle sleep period with start time at midnight on Friday', () => {
  //     // thursday: [{ startTime: '20:30', durationMinutes: 630 }],
  //     // friday: [{ startTime: '00:00', durationMinutes: 480 }],
  //     // saturday: [{ startTime: '23:30', durationMinutes: 540 }],
  //     const notificationTimeLocal = new Date('2024-04-12T00:00:00'); // Friday
  //     // 1. Для пятницы есть один период сна, начинающийся в 00:00
  //     // 2. Время уведомления точно совпадает с началом периода сна пятницы
  //     // 3. Возвращается время окончания периода сна пятницы
  //     const expectedAdjustedTime = new Date('2024-04-12T08:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle sleep period ending after midnight on Saturday', () => {
  //     // friday: [{ startTime: '00:00', durationMinutes: 480 }],
  //     // saturday: [{ startTime: '23:30', durationMinutes: 540 }],
  //     // sunday: [
  //     //   { startTime: '22:00', durationMinutes: 600 },
  //     //   { startTime: '09:00', durationMinutes: 60 },
  //     // ],
  //     const notificationTimeLocal = new Date('2024-04-14T08:00:00'); // Saturday
  //     // 1. Для субботы есть один период сна, заканчивающийся после полуночи воскресенья
  //     // 2. Время уведомления попадает в период сна субботы
  //     // 3. Возвращается время окончания периода сна субботы
  //     const expectedAdjustedTime = new Date('2024-04-14T08:30:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle multiple sleep periods on Sunday', () => {
  //     // saturday: [{ startTime: '23:30', durationMinutes: 540 }],
  //     // sunday: [
  //     //   { startTime: '22:00', durationMinutes: 600 },
  //     //   { startTime: '09:00', durationMinutes: 60 },
  //     // ],
  //     // monday: [{ startTime: '22:30', durationMinutes: 510 }],
  //     const notificationTimeLocal = new Date('2024-04-14T22:30:00'); // Sunday
  //     // 1. Для воскресенья есть два периода сна
  //     // 2. Время уведомления попадает в первый период сна воскресенья
  //     // 3. Возвращается время окончания первого периода сна воскресенья
  //     const expectedAdjustedTime = new Date('2024-04-15T08:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  //   it('should handle sleep period on Sunday with maximum after sleep offset and minimum gap', () => {
  //     // НЕПРАВИЛЬНАЯ логика
  //     // saturday: [{ startTime: '23:30', durationMinutes: 540 }],
  //     // sunday: [
  //     //   { startTime: '22:00', durationMinutes: 600 },
  //     //   { startTime: '09:00', durationMinutes: 60 },
  //     // ],
  //     // monday: [{ startTime: '22:30', durationMinutes: 510 }],
  //     const notificationTimeLocal = new Date('2024-04-14T08:00:00'); // Sunday
  //     // 1. Для субботы есть один период сна, заканчивающийся в воскресенье в 08:30
  //     // 2. Время уведомления попадает в период сна субботы
  //     // 3. С учетом максимального смещения после сна, время уведомления попадает в период бодрствования
  //     // 4. Возвращается время окончания периода сна субботы с учетом смещения
  //     const expectedAdjustedTime = new Date('2024-04-14T10:30:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //         0,
  //         120,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  //   it('should handle sleep period with maximum before sleep offset on Tuesday', () => {
  //     // monday: [{ startTime: '22:30', durationMinutes: 510 }],
  //     // tuesday: [],
  //     // wednesday: [
  //     //   { startTime: '23:00', durationMinutes: 240 },
  //     //   { startTime: '04:00', durationMinutes: 180 },
  //     // ],
  //     const notificationTimeLocal = new Date('2024-04-02T22:00:00'); // Tuesday
  //     // 1. Для вторника нет периодов сна
  //     // 2. Проверяется последний период сна понедельника
  //     // 3. Время уведомления не попадает в период сна понедельника
  //     // 4. Возвращается исходное время уведомления
  //     const expectedAdjustedTime = new Date('2024-04-02T22:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //         180,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });

  //   it('should handle sleep period with maximum after sleep offset on Friday', () => {
  //     // thursday: [{ startTime: '20:30', durationMinutes: 630 }],
  //     // friday: [{ startTime: '00:00', durationMinutes: 480 }],
  //     const notificationTimeLocal = new Date('2024-04-12T07:00:00'); // Friday
  //     // 1. Для четверга есть один период сна
  //     // 2. Время уведомления не попадает в период сна пятницы
  //     // 3. Проверяется последний период сна четверга
  //     // 4. Время уведомления с учетом смещения после сна попадает в период сна
  //     // 5. Возвращается время окончания сна четверга с учетом смещения
  //     const expectedAdjustedTime = new Date('2024-04-12T11:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //         0,
  //         180,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  //   it('should handle sleep period with maximum after sleep offset on Thursday', () => {
  //     // ПОЧЕМУ не работает?
  //     // wednesday: [
  //     //   { startTime: '23:00', durationMinutes: 240 },
  //     //   { startTime: '04:00', durationMinutes: 180 },
  //     // ],
  //     // thursday: [{ startTime: '20:30', durationMinutes: 630 }],
  //     // friday: [{ startTime: '00:00', durationMinutes: 480 }],
  //     const notificationTimeLocal = new Date('2024-04-11T07:00:00'); // Thursday
  //     // 1. Для четверга есть один период сна
  //     // 2. Время уведомления не попадает в период сна четверга
  //     // 3. Проверка периода сна среды
  //     // 4. Время уведомления не совпадает с периодом сна среды с учетом смещения
  //     // 5. Возвращается изнчальное время уведомления
  //     const expectedAdjustedTime = new Date('2024-04-11T07:00:00');
  //     const timeSleepSettings: TimeSleepSettings = {
  //       ...baseTimeSleepSettings,
  //     };
  //     expect(
  //       notificationService.getNotificationTimeAdjusted(
  //         notificationTimeLocal,
  //         timeSleepSettings,
  //         0,
  //         180,
  //       ),
  //     ).toEqual(expectedAdjustedTime);
  //   });
  // });

  // march 2024
  // test
  // test
  // test
  describe('getNotificationTimeAdjusted with different dayByDaySleepPeriods for March 2024 intersecting periods', () => {
    const baseTimeSleepSettings: TimeSleepSettings = {
      isTimeSleepEnabled: true,
      isDayByDayOptionEnabled: true,
      generalSleepPeriod: {
        startTime: '22:00',
        durationMinutes: 540,
      },
      dayByDaySleepPeriods: {
        monday: [{ startTime: '23:30', durationMinutes: 450 }],
        // intersecting periods
        tuesday: [
          { startTime: '10:00', durationMinutes: 120 },
          { startTime: '12:00', durationMinutes: 240 },
        ],
        wednesday: [],
        thursday: [{ startTime: '21:00', durationMinutes: 600 }],
        // intersecting periods
        friday: [
          { startTime: '01:00', durationMinutes: 420 },
          { startTime: '05:00', durationMinutes: 360 },
        ],
        saturday: [
          { startTime: '23:00', durationMinutes: 360 },
          { startTime: '10:00', durationMinutes: 120 },
        ],
        sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      },
    };
    // it('should handle sleep period with start time near midnight on Monday', () => {
    //   // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   const notificationTimeLocal = new Date('2024-03-11T23:45:00'); // Monday
    //   // 1. Для понедельника есть один период сна, начинающийся в 23:30
    //   // 2. Время уведомления попадает в период сна понедельника
    //   // 3. Возвращается время окончания периода сна понедельника
    //   const expectedAdjustedTime = new Date('2024-03-12T07:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with start time after midnight on Tuesday', () => {
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   // wednesday: [],
    //   const notificationTimeLocal = new Date('2024-03-12T01:00:00'); // Tuesday
    //   // 1. Для вторника есть два периода сна, первый начинается в 00:30
    //   // 2. Время уведомления попадает в первый период сна вторника
    //   // 3. Возвращается время окончания первого периода сна вторника
    //   const expectedAdjustedTime = new Date('2024-03-12T05:30:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });
    // it('should handle sleep period with start time after midnight on Tuesday', () => {
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   // wednesday: [],
    //   const notificationTimeLocal = new Date('2024-03-12T01:00:00'); // Tuesday
    //   // 1. Для вторника есть два периода сна, первый начинается в 00:30
    //   // 2. Время уведомления попадает в первый период сна вторника
    //   // 3. Возвращается время окончания первого периода сна вторника с учетом смещения
    //   const expectedAdjustedTime = new Date('2024-03-12T07:30:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //       0,
    //       120,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });
    // it('should handle no sleep periods on Wednesday', () => {
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   // wednesday: [],
    //   // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   const notificationTimeLocal = new Date('2024-03-13T12:00:00'); // Wednesday
    //   // 1. Для среды нет периодов сна
    //   // 2. Проверяется последний период сна вторника
    //   // 3. Время уведомления не попадает в период сна вторника
    //   // 4. Возвращается исходное время уведомления
    //   const expectedAdjustedTime = new Date('2024-03-13T12:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });
    it('should handle no sleep periods on tuesday (with after sleep offset)', () => {
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      // wednesday: [],
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      const notificationTimeLocal = new Date('2024-03-14T16:00:00'); // tuesday
      // 1. Для среды нет периодов сна
      // 2. Проверяется последний период сна вторника
      // 3. Время уведомления не попадает в период сна вторника
      // 4. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-14T16:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          0,
          90,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with minimum duration on Thursday', () => {
      // wednesday: [],
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      const notificationTimeLocal = new Date('2024-03-14T21:00:00'); // Thursday
      // 1. Для четверга есть один период сна с минимальной длительностью 600 минут
      // 2. Время уведомления точно совпадает с началом периода сна четверга
      // 3. Возвращается время окончания периода сна четверга
      const expectedAdjustedTime = new Date('2024-03-15T07:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period ending after midnight on Friday', () => {
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      // saturday: [
      //   { startTime: '23:00', durationMinutes: 360 },
      //   { startTime: '10:00', durationMinutes: 120 },
      // ],
      const notificationTimeLocal = new Date('2024-03-15T08:00:00'); // Friday
      // 1. Для пятницы есть один период сна, заканчивающийся после полуночи
      // 2. Время уведомления не попадает в период сна пятницы
      // 3. Время уведомления после пробуждения в пятницу
      // 4. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-15T11:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle multiple sleep periods on Saturday', () => {
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      // saturday: [
      //   { startTime: '23:00', durationMinutes: 360 },
      //   { startTime: '10:00', durationMinutes: 120 },
      // ],
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      const notificationTimeLocal = new Date('2024-03-16T23:30:00'); // Saturday
      // 1. Для субботы есть два периода сна
      // 2. Время уведомления попадает в первый период сна субботы
      // 3. Возвращается время окончания первого периода сна субботы
      const expectedAdjustedTime = new Date('2024-03-17T05:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle maximum sleep duration on Sunday', () => {
      // saturday: [
      //   { startTime: '23:00', durationMinutes: 360 },
      //   { startTime: '10:00', durationMinutes: 120 },
      // ],
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      // monday: [{ startTime: '23:30', durationMinutes: 450 }],
      const notificationTimeLocal = new Date('2024-03-17T22:00:00'); // Sunday
      // 1. Для воскресенья есть один период сна с максимальной длительностью 720 минут
      // 2. Время уведомления попадает в период сна воскресенья
      // 3. Возвращается время окончания периода сна воскресенья
      const expectedAdjustedTime = new Date('2024-03-18T08:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    // it('should handle sleep period with maximum before sleep offset on Tuesday', () => {
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   // wednesday: [],
    //   const notificationTimeLocal = new Date('2024-03-12T18:00:00'); // Tuesday
    //   // 1. Для вторника есть два периода сна
    //   // 2. Время уведомления с учетом максимального смещения до сна попадает во второй период сна вторника
    //   // 3. Возвращается время окончания второго периода сна вторника
    //   const expectedAdjustedTime = new Date('2024-03-12T22:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //       180,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    it('should handle sleep period with maximum after sleep offset on Friday', () => {
      // wednesday: [],
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      const notificationTimeLocal = new Date('2024-03-15T07:00:00'); // Friday
      // 1. Для пятница есть один период сна
      // 2. Время уведомления равно времени окончания периода сна четверга
      // 3. С учетом максимального смещения после сна, время уведомления попадает в период бодрствования
      // 4. Возвращается время уведомления с учетом смещения
      const expectedAdjustedTime = new Date('2024-03-15T14:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          0,
          180,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with both maximum before and after sleep offsets on Monday', () => {
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      // monday: [{ startTime: '23:30', durationMinutes: 450 }],
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      const notificationTimeLocal = new Date('2024-03-11T22:30:00'); // Monday
      // 1. Для понедельника есть один период сна
      // 2. Время уведомления с учетом максимального смещения до сна попадает в период сна понедельника
      // 3. Возвращается время окончания периода сна понедельника с учетом максимального смещения после сна
      const expectedAdjustedTime = new Date('2024-03-12T10:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          180,
          180,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with minimum gap between sleep periods on Saturday', () => {
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      // saturday: [
      //   { startTime: '23:00', durationMinutes: 360 },
      //   { startTime: '10:00', durationMinutes: 120 },
      // ],
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      const notificationTimeLocal = new Date('2024-03-16T05:00:00'); // Saturday
      // 1. Для субботы есть два периода сна с минимальным перерывом в 2 часа между ними
      // 2. Время уведомления равно времени окончания первого периода сна субботы
      // 3. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-16T05:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    //
    //
    //
    //
    //
    //
    //
    // it('should handle sleep period with start time near midnight on Monday', () => {
    //   // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   // tuesday: [
    //   //    { startTime: '00:30', durationMinutes: 300 },
    //   //    { startTime: '19:00', durationMinutes: 180 },
    //   //  ],
    //   const notificationTimeLocal = new Date('2024-03-11T23:45:00'); //Monday
    //   // 1. Для понедельника есть один период сна, начинающийся в 23:30
    //   // 2. Время уведомления попадает в период сна понедельника
    //   // 3. Возвращается время окончания периода сна понедельника
    //   const expectedAdjustedTime = new Date('2024-03-12T07:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with start time after midnight on Tuesday', () => {
    //   //  tuesday: [
    //   //		{ startTime: '00:30', durationMinutes: 300 },
    //   // 		{ startTime: '19:00', durationMinutes: 180 },
    //   //  ],
    //   //  wednesday: [],
    //   //  thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   const notificationTimeLocal = new Date('2024-03-13T01:00:00'); // wednesday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это среда, я исправил ожидаемое значение
    //   const expectedAdjustedTime = new Date('2024-03-13T01:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle no sleep periods on Wednesday', () => {
    //   //  wednesday: [],
    //   //  thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   const notificationTimeLocal = new Date('2024-03-14T12:00:00'); // thursday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это thursday, хотя время правильное
    //   const expectedAdjustedTime = new Date('2024-03-14T12:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with minimum duration on Thursday', () => {
    //   // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   // friday: [{ startTime: '01:00', durationMinutes: 420 }],
    //   const notificationTimeLocal = new Date('2024-03-15T21:00:00'); // friday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это friday, я исправил ожидаемое значение
    //   const expectedAdjustedTime = new Date('2024-03-15T21:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period ending after midnight on Friday', () => {
    //   // friday: [{ startTime: '01:00', durationMinutes: 420 }],
    //   // saturday: [
    //   //     { startTime: '23:00', durationMinutes: 360 },
    //   //     { startTime: '10:00', durationMinutes: 120 },
    //   //   ],
    //   const notificationTimeLocal = new Date('2024-03-16T08:00:00'); // saturday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это saturday, хотя время правильное
    //   const expectedAdjustedTime = new Date('2024-03-16T08:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle multiple sleep periods on Saturday', () => {
    //   // saturday: [
    //   //     { startTime: '23:00', durationMinutes: 360 },
    //   //     { startTime: '10:00', durationMinutes: 120 },
    //   //   ],
    //   // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   const notificationTimeLocal = new Date('2024-03-17T23:30:00'); // sunday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это sunday, я исправил ожидаемое значение
    //   const expectedAdjustedTime = new Date('2024-03-18T08:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle maximum sleep duration on Sunday', () => {
    //   // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
    //   const notificationTimeLocal = new Date('2024-03-18T08:00:00');
    //   // 1. Для воскресенья есть один период сна с максимальной длительностью 720 минут
    //   // 2. Время уведомления попадает в период сна воскресенья
    //   // 3. Возвращается время окончания периода сна воскресенья
    //   const expectedAdjustedTime = new Date('2024-03-18T08:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with maximum before sleep offset on Tuesday', () => {
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   const notificationTimeLocal = new Date('2024-03-13T18:00:00');
    //   // 1. Для вторника есть два периода сна
    //   // 2. Время уведомления с учетом максимального смещения до сна попадает во второй период сна вторника
    //   // 3. Возвращается время окончания второго периода сна вторника
    //   const expectedAdjustedTime = new Date('2024-03-13T22:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //       180,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with maximum after sleep offset on Thursday', () => {
    //   // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   const notificationTimeLocal = new Date('2024-03-16T07:00:00');
    //   // 1. Для четверга есть один период сна
    //   // 2. Время уведомления равно времени окончания периода сна четверга
    //   // 3. С учетом максимального смещения после сна, время уведомления попадает в период бодрствования
    //   // 4. Возвращается время уведомления с учетом смещения
    //   const expectedAdjustedTime = new Date('2024-03-16T10:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //       0,
    //       180,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with both maximum before and after sleep offsets on Monday', () => {
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   const notificationTimeLocal = new Date('2024-03-11T22:30:00');
    //   // 1. Для понедельника есть один период сна
    //   // 2. Время уведомления с учетом максимального смещения до сна попадает в период сна понедельника
    //   // 3. Возвращается время окончания периода сна понедельника с учетом максимального смещения после сна
    //   const expectedAdjustedTime = new Date('2024-03-12T10:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //       180,
    //       180,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with minimum gap between sleep periods on Saturday', () => {
    //   // saturday: [
    //   //   { startTime: '23:00', durationMinutes: 360 },
    //   //   { startTime: '10:00', durationMinutes: 120 },
    //   // ],
    //   const notificationTimeLocal = new Date('2024-03-17T05:00:00');
    //   // 1. Для субботы есть два периода сна с минимальным перерывом в 2 часа между ними
    //   // 2. Время уведомления равно времени окончания первого периода сна субботы
    //   // 3. Возвращается исходное время уведомления
    //   const expectedAdjustedTime = new Date('2024-03-17T05:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with notification time between sleep periods on Tuesday', () => {
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   const notificationTimeLocal = new Date('2024-03-13T12:00:00');
    //   // 1. Для вторника есть два периода сна
    //   // 2. Время уведомления не попадает ни в один из периодов сна вторника
    //   // 3. Проверяется последний период сна понедельника
    //   // 4. Время уведомления не попадает в период сна понедельника
    //   // 5. Возвращается исходное время уведомления
    //   const expectedAdjustedTime = new Date('2024-03-13T12:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });
  });
  // test
  // test
  // test

  describe('getNotificationTimeAdjusted with different dayByDaySleepPeriods for March 2024', () => {
    const baseTimeSleepSettings: TimeSleepSettings = {
      isTimeSleepEnabled: true,
      isDayByDayOptionEnabled: true,
      generalSleepPeriod: {
        startTime: '22:00',
        durationMinutes: 540,
      },
      dayByDaySleepPeriods: {
        monday: [{ startTime: '23:30', durationMinutes: 450 }],
        tuesday: [
          { startTime: '00:30', durationMinutes: 300 },
          { startTime: '19:00', durationMinutes: 180 },
        ],
        wednesday: [],
        thursday: [{ startTime: '21:00', durationMinutes: 600 }],
        friday: [{ startTime: '01:00', durationMinutes: 420 }],
        saturday: [
          { startTime: '23:00', durationMinutes: 360 },
          { startTime: '10:00', durationMinutes: 120 },
        ],
        sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      },
    };
    it('should handle sleep period with start time near midnight on Monday', () => {
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      // monday: [{ startTime: '23:30', durationMinutes: 450 }],
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      const notificationTimeLocal = new Date('2024-03-11T23:45:00'); // Monday
      // 1. Для понедельника есть один период сна, начинающийся в 23:30
      // 2. Время уведомления попадает в период сна понедельника
      // 3. Возвращается время окончания периода сна понедельника
      const expectedAdjustedTime = new Date('2024-03-12T07:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with start time after midnight on Tuesday', () => {
      // monday: [{ startTime: '23:30', durationMinutes: 450 }],
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      // wednesday: [],
      const notificationTimeLocal = new Date('2024-03-12T01:00:00'); // Tuesday
      // 1. Для вторника есть два периода сна, первый начинается в 00:30
      // 2. Время уведомления попадает в первый период сна вторника
      // 3. Возвращается время окончания первого периода сна вторника
      const expectedAdjustedTime = new Date('2024-03-12T05:30:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with start time after midnight on Tuesday', () => {
      // monday: [{ startTime: '23:30', durationMinutes: 450 }],
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      // wednesday: [],
      const notificationTimeLocal = new Date('2024-03-12T01:00:00'); // Tuesday
      // 1. Для вторника есть два периода сна, первый начинается в 00:30
      // 2. Время уведомления попадает в первый период сна вторника
      // 3. Возвращается время окончания первого периода сна вторника с учетом смещения
      const expectedAdjustedTime = new Date('2024-03-12T07:30:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          0,
          120,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle no sleep periods on Wednesday', () => {
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      // wednesday: [],
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      const notificationTimeLocal = new Date('2024-03-13T12:00:00'); // Wednesday
      // 1. Для среды нет периодов сна
      // 2. Проверяется последний период сна вторника
      // 3. Время уведомления не попадает в период сна вторника
      // 4. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-13T12:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle no sleep periods on Wednesday (with after sleep offset)', () => {
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      // wednesday: [],
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      const notificationTimeLocal = new Date('2024-03-13T12:00:00'); // Wednesday
      // 1. Для среды нет периодов сна
      // 2. Проверяется последний период сна вторника
      // 3. Время уведомления не попадает в период сна вторника
      // 4. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-13T12:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          0,
          90,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with minimum duration on Thursday', () => {
      // wednesday: [],
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      const notificationTimeLocal = new Date('2024-03-14T21:00:00'); // Thursday
      // 1. Для четверга есть один период сна с минимальной длительностью 600 минут
      // 2. Время уведомления точно совпадает с началом периода сна четверга
      // 3. Возвращается время окончания периода сна четверга
      const expectedAdjustedTime = new Date('2024-03-15T07:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period ending after midnight on Friday', () => {
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      // saturday: [
      //   { startTime: '23:00', durationMinutes: 360 },
      //   { startTime: '10:00', durationMinutes: 120 },
      // ],
      const notificationTimeLocal = new Date('2024-03-15T08:00:00'); // Friday
      // 1. Для пятницы есть один период сна, заканчивающийся после полуночи
      // 2. Время уведомления не попадает в период сна пятницы
      // 3. Время уведомления после пробуждения в пятницу
      // 4. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-15T08:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle multiple sleep periods on Saturday', () => {
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      // saturday: [
      //   { startTime: '23:00', durationMinutes: 360 },
      //   { startTime: '10:00', durationMinutes: 120 },
      // ],
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      const notificationTimeLocal = new Date('2024-03-16T23:30:00'); // Saturday
      // 1. Для субботы есть два периода сна
      // 2. Время уведомления попадает в первый период сна субботы
      // 3. Возвращается время окончания первого периода сна субботы
      const expectedAdjustedTime = new Date('2024-03-17T05:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle maximum sleep duration on Sunday', () => {
      // saturday: [
      //   { startTime: '23:00', durationMinutes: 360 },
      //   { startTime: '10:00', durationMinutes: 120 },
      // ],
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      // monday: [{ startTime: '23:30', durationMinutes: 450 }],
      const notificationTimeLocal = new Date('2024-03-17T22:00:00'); // Sunday
      // 1. Для воскресенья есть один период сна с максимальной длительностью 720 минут
      // 2. Время уведомления попадает в период сна воскресенья
      // 3. Возвращается время окончания периода сна воскресенья
      const expectedAdjustedTime = new Date('2024-03-18T08:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with maximum before sleep offset on Tuesday', () => {
      // monday: [{ startTime: '23:30', durationMinutes: 450 }],
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      // wednesday: [],
      const notificationTimeLocal = new Date('2024-03-12T18:00:00'); // Tuesday
      // 1. Для вторника есть два периода сна
      // 2. Время уведомления с учетом максимального смещения до сна попадает во второй период сна вторника
      // 3. Возвращается время окончания второго периода сна вторника
      const expectedAdjustedTime = new Date('2024-03-12T22:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          180,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with maximum after sleep offset on Friday', () => {
      // wednesday: [],
      // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      const notificationTimeLocal = new Date('2024-03-15T07:00:00'); // Friday
      // 1. Для пятница есть один период сна
      // 2. Время уведомления равно времени окончания периода сна четверга
      // 3. С учетом максимального смещения после сна, время уведомления попадает в период бодрствования
      // 4. Возвращается время уведомления с учетом смещения
      const expectedAdjustedTime = new Date('2024-03-15T11:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          0,
          180,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with both maximum before and after sleep offsets on Monday', () => {
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      // monday: [{ startTime: '23:30', durationMinutes: 450 }],
      // tuesday: [
      //   { startTime: '00:30', durationMinutes: 300 },
      //   { startTime: '19:00', durationMinutes: 180 },
      // ],
      const notificationTimeLocal = new Date('2024-03-11T22:30:00'); // Monday
      // 1. Для понедельника есть один период сна
      // 2. Время уведомления с учетом максимального смещения до сна попадает в период сна понедельника
      // 3. Возвращается время окончания периода сна понедельника с учетом максимального смещения после сна
      const expectedAdjustedTime = new Date('2024-03-12T10:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          180,
          180,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with minimum gap between sleep periods on Saturday', () => {
      // friday: [{ startTime: '01:00', durationMinutes: 420 }],
      // saturday: [
      //   { startTime: '23:00', durationMinutes: 360 },
      //   { startTime: '10:00', durationMinutes: 120 },
      // ],
      // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
      const notificationTimeLocal = new Date('2024-03-16T05:00:00'); // Saturday
      // 1. Для субботы есть два периода сна с минимальным перерывом в 2 часа между ними
      // 2. Время уведомления равно времени окончания первого периода сна субботы
      // 3. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-16T05:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    //
    //
    //
    //
    //
    //
    //
    // it('should handle sleep period with start time near midnight on Monday', () => {
    //   // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   // tuesday: [
    //   //    { startTime: '00:30', durationMinutes: 300 },
    //   //    { startTime: '19:00', durationMinutes: 180 },
    //   //  ],
    //   const notificationTimeLocal = new Date('2024-03-11T23:45:00'); //Monday
    //   // 1. Для понедельника есть один период сна, начинающийся в 23:30
    //   // 2. Время уведомления попадает в период сна понедельника
    //   // 3. Возвращается время окончания периода сна понедельника
    //   const expectedAdjustedTime = new Date('2024-03-12T07:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with start time after midnight on Tuesday', () => {
    //   //  tuesday: [
    //   //		{ startTime: '00:30', durationMinutes: 300 },
    //   // 		{ startTime: '19:00', durationMinutes: 180 },
    //   //  ],
    //   //  wednesday: [],
    //   //  thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   const notificationTimeLocal = new Date('2024-03-13T01:00:00'); // wednesday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это среда, я исправил ожидаемое значение
    //   const expectedAdjustedTime = new Date('2024-03-13T01:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle no sleep periods on Wednesday', () => {
    //   //  wednesday: [],
    //   //  thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   const notificationTimeLocal = new Date('2024-03-14T12:00:00'); // thursday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это thursday, хотя время правильное
    //   const expectedAdjustedTime = new Date('2024-03-14T12:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with minimum duration on Thursday', () => {
    //   // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   // friday: [{ startTime: '01:00', durationMinutes: 420 }],
    //   const notificationTimeLocal = new Date('2024-03-15T21:00:00'); // friday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это friday, я исправил ожидаемое значение
    //   const expectedAdjustedTime = new Date('2024-03-15T21:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period ending after midnight on Friday', () => {
    //   // friday: [{ startTime: '01:00', durationMinutes: 420 }],
    //   // saturday: [
    //   //     { startTime: '23:00', durationMinutes: 360 },
    //   //     { startTime: '10:00', durationMinutes: 120 },
    //   //   ],
    //   const notificationTimeLocal = new Date('2024-03-16T08:00:00'); // saturday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это saturday, хотя время правильное
    //   const expectedAdjustedTime = new Date('2024-03-16T08:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle multiple sleep periods on Saturday', () => {
    //   // saturday: [
    //   //     { startTime: '23:00', durationMinutes: 360 },
    //   //     { startTime: '10:00', durationMinutes: 120 },
    //   //   ],
    //   // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   const notificationTimeLocal = new Date('2024-03-17T23:30:00'); // sunday
    //   // НЕПРАВИЛЬНАЯ ЛОГИКА, потому что это sunday, я исправил ожидаемое значение
    //   const expectedAdjustedTime = new Date('2024-03-18T08:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle maximum sleep duration on Sunday', () => {
    //   // sunday: [{ startTime: '20:00', durationMinutes: 720 }],
    //   const notificationTimeLocal = new Date('2024-03-18T08:00:00');
    //   // 1. Для воскресенья есть один период сна с максимальной длительностью 720 минут
    //   // 2. Время уведомления попадает в период сна воскресенья
    //   // 3. Возвращается время окончания периода сна воскресенья
    //   const expectedAdjustedTime = new Date('2024-03-18T08:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with maximum before sleep offset on Tuesday', () => {
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   const notificationTimeLocal = new Date('2024-03-13T18:00:00');
    //   // 1. Для вторника есть два периода сна
    //   // 2. Время уведомления с учетом максимального смещения до сна попадает во второй период сна вторника
    //   // 3. Возвращается время окончания второго периода сна вторника
    //   const expectedAdjustedTime = new Date('2024-03-13T22:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //       180,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with maximum after sleep offset on Thursday', () => {
    //   // thursday: [{ startTime: '21:00', durationMinutes: 600 }],
    //   const notificationTimeLocal = new Date('2024-03-16T07:00:00');
    //   // 1. Для четверга есть один период сна
    //   // 2. Время уведомления равно времени окончания периода сна четверга
    //   // 3. С учетом максимального смещения после сна, время уведомления попадает в период бодрствования
    //   // 4. Возвращается время уведомления с учетом смещения
    //   const expectedAdjustedTime = new Date('2024-03-16T10:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //       0,
    //       180,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with both maximum before and after sleep offsets on Monday', () => {
    //   // monday: [{ startTime: '23:30', durationMinutes: 450 }],
    //   const notificationTimeLocal = new Date('2024-03-11T22:30:00');
    //   // 1. Для понедельника есть один период сна
    //   // 2. Время уведомления с учетом максимального смещения до сна попадает в период сна понедельника
    //   // 3. Возвращается время окончания периода сна понедельника с учетом максимального смещения после сна
    //   const expectedAdjustedTime = new Date('2024-03-12T10:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //       180,
    //       180,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with minimum gap between sleep periods on Saturday', () => {
    //   // saturday: [
    //   //   { startTime: '23:00', durationMinutes: 360 },
    //   //   { startTime: '10:00', durationMinutes: 120 },
    //   // ],
    //   const notificationTimeLocal = new Date('2024-03-17T05:00:00');
    //   // 1. Для субботы есть два периода сна с минимальным перерывом в 2 часа между ними
    //   // 2. Время уведомления равно времени окончания первого периода сна субботы
    //   // 3. Возвращается исходное время уведомления
    //   const expectedAdjustedTime = new Date('2024-03-17T05:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });

    // it('should handle sleep period with notification time between sleep periods on Tuesday', () => {
    //   // tuesday: [
    //   //   { startTime: '00:30', durationMinutes: 300 },
    //   //   { startTime: '19:00', durationMinutes: 180 },
    //   // ],
    //   const notificationTimeLocal = new Date('2024-03-13T12:00:00');
    //   // 1. Для вторника есть два периода сна
    //   // 2. Время уведомления не попадает ни в один из периодов сна вторника
    //   // 3. Проверяется последний период сна понедельника
    //   // 4. Время уведомления не попадает в период сна понедельника
    //   // 5. Возвращается исходное время уведомления
    //   const expectedAdjustedTime = new Date('2024-03-13T12:00:00');
    //   const timeSleepSettings: TimeSleepSettings = {
    //     ...baseTimeSleepSettings,
    //   };
    //   expect(
    //     notificationService.getNotificationTimeAdjusted(
    //       notificationTimeLocal,
    //       timeSleepSettings,
    //     ),
    //   ).toEqual(expectedAdjustedTime);
    // });
  });
  // march 2024
  // dayByDayTimeSleepData v2 - checked
  // dayByDayTimeSleepData v2 - checked
  // dayByDayTimeSleepData v2 - checked
  describe('getNotificationTimeAdjusted with generalSleepPeriod', () => {
    const baseTimeSleepSettings: TimeSleepSettings = {
      isTimeSleepEnabled: true,
      isDayByDayOptionEnabled: true,
      generalSleepPeriod: {
        startTime: '22:00',
        durationMinutes: 540, // 9 hours
      },
      dayByDaySleepPeriods: {
        monday: [{ startTime: '22:00', durationMinutes: 480 }],
        tuesday: [{ startTime: '22:00', durationMinutes: 480 }],
        wednesday: [{ startTime: '22:00', durationMinutes: 480 }],
        thursday: [],
        friday: [
          { startTime: '02:00', durationMinutes: 480 },
          { startTime: '20:00', durationMinutes: 120 },
        ],
        saturday: [{ startTime: '22:00', durationMinutes: 480 }],
        sunday: [{ startTime: '22:00', durationMinutes: 480 }],
      },
    };
    it('should handle sleep period with duration 30 minutes', () => {
      // sunday
      const notificationTimeLocal = new Date('2024-03-10T22:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      const expectedAdjustedTime = new Date('2024-03-11T06:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with start time close to midnight', () => {
      // monday: [{ startTime: '22:00', durationMinutes: 480 }],
      // tuesday: [{ startTime: '22:00', durationMinutes: 480 }],
      // wednesday: [{ startTime: '22:00', durationMinutes: 480 }],
      const notificationTimeLocal = new Date('2024-03-12T23:59:00'); // tuesday(вторник)
      // next day after wake up
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      const expectedAdjustedTime = new Date('2024-03-13T06:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with start time close to midnight', () => {
      // thursday
      const notificationTimeLocal = new Date('2024-03-14T23:59:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      const expectedAdjustedTime = new Date('2024-03-14T23:59:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with start time close to midnight', () => {
      // thursday
      const notificationTimeLocal = new Date('2024-03-14T05:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      const expectedAdjustedTime = new Date('2024-03-14T06:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with start time close to midnight', () => {
      // thursday
      const notificationTimeLocal = new Date('2024-03-14T06:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      const expectedAdjustedTime = new Date('2024-03-14T06:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with start time close to midnight', () => {
      // friday
      const notificationTimeLocal = new Date('2024-03-15T02:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      const expectedAdjustedTime = new Date('2024-03-15T10:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with start time close to midnight', () => {
      // thursday: [],
      // friday: [
      //   { startTime: '02:00', durationMinutes: 480 },
      //   { startTime: '20:00', durationMinutes: 120 },
      // ],
      // saturday: [{ startTime: '22:00', durationMinutes: 480 }],
      const notificationTimeLocal = new Date('2024-03-15T20:00:00'); // friday
      // current day after wake up, 2 period of sleep
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      const expectedAdjustedTime = new Date('2024-03-15T22:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with no sleep on Thursday', () => {
      // wednesday: [{ startTime: '22:00', durationMinutes: 480 }],
      // thursday: [],
      // friday: [
      //   { startTime: '02:00', durationMinutes: 480 },
      //   { startTime: '20:00', durationMinutes: 120 },
      // ],
      const notificationTimeLocal = new Date('2024-03-14T23:59:00'); // Thursday
      // 1. Для четверга нет периода сна
      // 2. Проверяется последний период сна среды
      // 3. Время уведомления не попадает в период сна среды
      // 4. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-14T23:59:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with multiple sleep periods on Friday', () => {
      // thursday: [],
      // friday: [
      //   { startTime: '02:00', durationMinutes: 480 },
      //   { startTime: '20:00', durationMinutes: 120 },
      // ],
      // saturday: [{ startTime: '22:00', durationMinutes: 480 }],
      const notificationTimeLocal = new Date('2024-03-15T03:00:00'); // Friday
      // 1. Для пятницы есть два периода сна
      // 2. Время уведомления попадает в первый период сна
      // 3. Возвращается время окончания первого периода сна
      const expectedAdjustedTime = new Date('2024-03-15T10:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with notification time between sleep periods on Friday', () => {
      // thursday: [],
      // friday: [
      //   { startTime: '02:00', durationMinutes: 480 },
      //   { startTime: '20:00', durationMinutes: 120 },
      // ],
      // saturday: [{ startTime: '22:00', durationMinutes: 480 }],
      const notificationTimeLocal = new Date('2024-03-15T15:00:00'); // Friday
      // 1. Для пятницы есть два периода сна
      // 2. Время уведомления не попадает ни в один из периодов сна
      // 3. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-15T15:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with notification time before sleep on Saturday', () => {
      // friday: [
      //   { startTime: '02:00', durationMinutes: 480 },
      //   { startTime: '20:00', durationMinutes: 120 },
      // ],
      // saturday: [{ startTime: '22:00', durationMinutes: 480 }],
      // sunday: [{ startTime: '22:00', durationMinutes: 480 }],
      const notificationTimeLocal = new Date('2024-03-16T20:00:00'); // Saturday
      // 1. Для субботы есть один период сна
      // 2. Время уведомления не попадает в период сна субботы
      // 3. Проверяется последний период сна пятницы
      // 4. Время уведомления не попадает в период сна пятницы
      // 5. Возвращается исходное время уведомления
      const expectedAdjustedTime = new Date('2024-03-16T20:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with notification time during sleep on Sunday', () => {
      // saturday: [{ startTime: '22:00', durationMinutes: 480 }],
      // sunday: [{ startTime: '22:00', durationMinutes: 480 }],
      // monday: [{ startTime: '22:00', durationMinutes: 480 }],
      const notificationTimeLocal = new Date('2024-03-17T23:00:00'); // Sunday
      // 1. Для воскресенья есть один период сна
      // 2. Время уведомления попадает в период сна воскресенья
      // 3. Возвращается время окончания периода сна воскресенья
      const expectedAdjustedTime = new Date('2024-03-18T06:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with before sleep offset on Tuesday', () => {
      // monday: [{ startTime: '22:00', durationMinutes: 480 }],
      // tuesday: [{ startTime: '22:00', durationMinutes: 480 }],
      // wednesday: [{ startTime: '22:00', durationMinutes: 480 }],
      const notificationTimeLocal = new Date('2024-03-12T21:30:00'); // Tuesday
      // 1. Для вторника есть один период сна
      // 2. Время уведомления с учетом смещения попадает в период сна вторника
      // 3. Возвращается время окончания периода сна вторника
      const expectedAdjustedTime = new Date('2024-03-13T06:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          30,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with after sleep offset on Wednesday', () => {
      // tuesday: [{ startTime: '22:00', durationMinutes: 480 }],
      // wednesday: [{ startTime: '22:00', durationMinutes: 480 }],
      // thursday: [],
      const notificationTimeLocal = new Date('2024-03-14T06:00:00'); // Wednesday
      // 1. Для среды есть один период сна
      // 2. Время уведомления равно времени окончания периода сна среды
      // 3. С учетом смещения после сна, время уведомления попадает в период бодрствования
      // 4. Возвращается время уведомления с учетом смещения
      const expectedAdjustedTime = new Date('2024-03-14T06:30:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          0,
          30,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with both before and after sleep offsets on Monday', () => {
      // sunday: [{ startTime: '22:00', durationMinutes: 480 }],
      // monday: [{ startTime: '22:00', durationMinutes: 480 }],
      // tuesday: [{ startTime: '22:00', durationMinutes: 480 }],
      const notificationTimeLocal = new Date('2024-03-11T21:30:00'); // Monday
      // 1. Для понедельника есть один период сна
      // 2. Время уведомления с учетом смещения до сна попадает в период сна понедельника
      // 3. Возвращается время окончания периода сна понедельника с учетом смещения после сна
      const expectedAdjustedTime = new Date('2024-03-12T06:30:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          30,
          30,
        ),
      ).toEqual(expectedAdjustedTime);
    });
  });
  // dayByDayTimeSleepData v2 - checked
  // dayByDayTimeSleepData v2 - checked
  // dayByDayTimeSleepData v2 - checked
  // general
  // general
  // general
  describe('getNotificationTimeAdjusted with generalSleepPeriod', () => {
    const baseTimeSleepSettings: TimeSleepSettings = {
      isTimeSleepEnabled: true,
      isDayByDayOptionEnabled: false,
      generalSleepPeriod: {
        startTime: '22:00',
        // wake up time is 7:00
        durationMinutes: 540, // 9 hours
      },
      dayByDaySleepPeriods: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    };
    it('should handle sleep period with duration 30 minutes', () => {
      const notificationTimeLocal = new Date('2024-03-10T22:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '22:00',
          durationMinutes: 30,
        },
      };
      const expectedAdjustedTime = new Date('2024-03-10T22:30:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with start time close to midnight', () => {
      const notificationTimeLocal = new Date('2024-03-10T23:59:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '23:59',
          durationMinutes: 480, // 8 hours
        },
      };
      const expectedAdjustedTime = new Date('2024-03-11T07:59:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle notification time with large before sleep offset', () => {
      const notificationTimeLocal = new Date('2024-03-10T19:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '22:00',
          durationMinutes: 540, // 9 hours
        },
      };
      const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          180, // 3 hours
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle notification time with large after sleep offset', () => {
      const notificationTimeLocal = new Date('2024-03-11T07:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '22:00',
          durationMinutes: 540, // 9 hours
        },
      };
      const expectedAdjustedTime = new Date('2024-03-11T10:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          0,
          180, // 3 hours
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with end time equal to start time', () => {
      const notificationTimeLocal = new Date('2024-03-10T22:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '22:00',
          durationMinutes: 1440, // 24 hours
        },
      };
      const expectedAdjustedTime = new Date('2024-03-11T22:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with start time and end time on different days', () => {
      const notificationTimeLocal = new Date('2024-03-11T02:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '22:00',
          durationMinutes: 300, // 5 hours
        },
      };
      const expectedAdjustedTime = new Date('2024-03-11T03:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with start time and notification time on different days', () => {
      const notificationTimeLocal = new Date('2024-03-10T02:00:00');
      const expectedAdjustedTime = new Date('2024-03-10T07:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with end time on the next day', () => {
      const notificationTimeLocal = new Date('2024-03-11T01:00:00');
      const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should return the same notification time if it is within the wakeup period', () => {
      // wake up time is 7:00
      const notificationTimeLocal = new Date('2024-03-10T12:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
        ),
      ).toEqual(notificationTimeLocal);
    });

    it('should adjust the notification time to the sleep start time if it is before the sleep start time on the same day', () => {
      const notificationTimeLocal = new Date('2024-03-10T21:30:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
        ),
      ).toEqual(notificationTimeLocal);
    });

    it('should adjust the notification time to the next day sleep start time if it is after the sleep end time', () => {
      // wake up time is 7:00
      const notificationTimeLocal = new Date('2024-03-11T08:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
        ),
      ).toEqual(notificationTimeLocal);
    });

    it('should handle notification time exactly at the sleep start time', () => {
      const notificationTimeLocal = new Date('2024-03-10T22:00:00');
      const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle notification time exactly at the sleep end time', () => {
      const notificationTimeLocal = new Date('2024-03-11T07:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
        ),
      ).toEqual(notificationTimeLocal);
    });

    it('should handle notification time with custom before sleep offset 30 min', () => {
      const notificationTimeLocal = new Date('2024-03-10T21:30:00');
      // before sleep offset is 30 minutes so the notification time should be adjusted to 7:00
      const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
          30,
          0,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle notification time with custom before sleep offset 180 min', () => {
      const notificationTimeLocal = new Date('2024-03-10T21:30:00');
      // before sleep offset is 30 minutes so the notification time should be adjusted to 7:00
      const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
          180,
          0,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle notification time with custom before sleep offset 180 min', () => {
      const notificationTimeLocal = new Date('2024-03-10T07:30:00');
      // before sleep offset is 30 minutes so the notification time should be adjusted to 7:00
      const expectedAdjustedTime = new Date('2024-03-10T07:30:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
          180,
          0,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle notification time with custom sleep offset 180 min both', () => {
      const notificationTimeLocal = new Date('2024-03-10T07:30:00');
      // before sleep offset is 30 minutes so the notification time should be adjusted to 7:00
      const expectedAdjustedTime = new Date('2024-03-10T10:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
          180,
          180,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle notification time with custom after sleep offset 30 min', () => {
      const notificationTimeLocal = new Date('2024-03-11T07:00:00');
      // wake up time is 7:00, after sleep offset is 30 minutes so the notification time should be adjusted to 7:30
      const expectedAdjustedTime = new Date('2024-03-11T07:30:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
          0,
          30,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle notification time with custom sleep offsets 30 min both', () => {
      const notificationTimeLocal = new Date('2024-03-11T07:00:00');
      // wake up time is 7:00, after sleep offset is 30 minutes so the notification time should be adjusted to 7:30
      const expectedAdjustedTime = new Date('2024-03-11T07:30:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
          30,
          30,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle notification time with custom sleep offsets 30 min 180 min', () => {
      const notificationTimeLocal = new Date('2024-03-11T07:00:00');
      // wake up time is 7:00, after sleep offset is 30 minutes so the notification time should be adjusted to 7:30
      const expectedAdjustedTime = new Date('2024-03-11T10:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          baseTimeSleepSettings,
          30,
          180,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with start time at midnight', () => {
      const notificationTimeLocal = new Date('2024-03-10T23:30:00');
      // before sleep start time
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '00:00',
          durationMinutes: 480, // 8 hours
        },
      };
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(notificationTimeLocal);
    });

    it('should handle sleep period with zero duration', () => {
      const notificationTimeLocal = new Date('2024-03-10T22:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '22:00',
          durationMinutes: 60,
        },
      };
      const expectedAdjustedTime = new Date('2024-03-10T23:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });

    it('should handle sleep period with duration 16 hours', () => {
      const notificationTimeLocal = new Date('2024-03-10T12:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '20:00',
          // wake up time is 12:00
          durationMinutes: 960, // 16 hours
        },
      };
      const expectedAdjustedTime = new Date('2024-03-10T12:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
        ),
      ).toEqual(expectedAdjustedTime);
    });
    it('should handle sleep period with duration 16 hours', () => {
      const notificationTimeLocal = new Date('2024-03-10T12:00:00');
      const timeSleepSettings: TimeSleepSettings = {
        ...baseTimeSleepSettings,
        generalSleepPeriod: {
          startTime: '20:00',
          // wake up time is 12:00
          durationMinutes: 960, // 16 hours
        },
      };
      const expectedAdjustedTime = new Date('2024-03-10T13:00:00');
      expect(
        notificationService.getNotificationTimeAdjusted(
          notificationTimeLocal,
          timeSleepSettings,
          0,
          60,
        ),
      ).toEqual(expectedAdjustedTime);
    });
  });
  // general
  // general
  // general
});
// generalTimeSleepData - checked
// generalTimeSleepData - checked
// generalTimeSleepData - checked
// dayByDayTimeSleepData v1 - checked
// dayByDayTimeSleepData v1 - checked
// dayByDayTimeSleepData v1 - checked
// describe('getNotificationTimeAdjusted with isDayByDayOptionEnabled - dayByDayTimeSleepData v1', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 8, minutes: 0 },
//       down: { hours: 23, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       tuesday: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 21, minutes: 0 },
//       },
//       wednesday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//       thursday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//       friday: {
//         up: { hours: 7, minutes: 0 },
//         down: { hours: 22, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 30 },
//         down: { hours: 2, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 9, minutes: 30 },
//         down: { hours: 0, minutes: 30 },
//       },
//     },
//   };

//   it('should adjust notification time when it is before wakeup time on Monday', () => {
//     //  monday: {
//     //   up: { hours: 7, minutes: 30 },
//     //   down: { hours: 22, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-11T06:45:00'); // Monday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-11T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust notification time when it is after fall asleep time on Tuesday', () => {
//     //  tuesday: {
//     //   up: { hours: 6, minutes: 0 },
//     //   down: { hours: 21, minutes: 0 },
//     // },
//     //  wednesday: {
//     //   up: { hours: 9, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-12T21:30:00'); // Tuesday
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-13T09:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time when sleep time ends at midnight on Wednesday', () => {
//     //  wednesday: {
//     //   up: { hours: 9, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-13T23:45:00'); // Wednesday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-14T08:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time when it is within wakeup period on Thursday', () => {
//     // thursday: {
//     //   up: { hours: 8, minutes: 30 },
//     //   down: { hours: 23, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-14T10:15:00'); // Thursday
//     // current day not wait
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should adjust notification time when it is after fall asleep time on Friday', () => {
//     //  friday: {
//     //   up: { hours: 7, minutes: 0 },
//     //   down: { hours: 22, minutes: 0 },
//     // },
//     //  saturday: {
//     //   up: { hours: 10, minutes: 30 },
//     //   down: { hours: 2, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-15T22:30:00'); // Friday
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-16T10:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time when sleep time starts after midnight on Saturday', () => {
//     //  saturday: {
//     //   up: { hours: 10, minutes: 30 },
//     //   down: { hours: 2, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-16T01:15:00'); // Saturday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-16T10:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust notification time when it is before wakeup time on Sunday', () => {
//     //  sunday: {
//     //   up: { hours: 9, minutes: 30 },
//     //   down: { hours: 0, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-17T08:45:00'); // Sunday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-17T09:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle transition from Sunday to Monday when notification time is after fall asleep time', () => {
//     //  sunday: {
//     //   up: { hours: 9, minutes: 30 },
//     //   down: { hours: 0, minutes: 30 },
//     // },
//     //  monday: {
//     //   up: { hours: 7, minutes: 30 },
//     //   down: { hours: 22, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-18T01:00:00'); // Monday (transitioned from Sunday)
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-18T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });
// dayByDayTimeSleepData v1 - checked
// dayByDayTimeSleepData v1 - checked
// dayByDayTimeSleepData v1 - checked
// dayByDayTimeSleepData v2 - checked
// dayByDayTimeSleepData v2 - checked
// dayByDayTimeSleepData v2 - checked
// describe('getNotificationTimeAdjusted with isDayByDayOptionEnabled - dayByDayTimeSleepData v2', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 21, minutes: 30 },
//       },
//       tuesday: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 23, minutes: 0 },
//       },
//       wednesday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       thursday: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 21, minutes: 0 },
//       },
//       friday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 0 },
//         down: { hours: 1, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//     },
//   };

//   it('should adjust notification time based on day-by-day sleep settings', () => {
//     //  monday: {
//     //   up: { hours: 6, minutes: 30 },
//     //   down: { hours: 21, minutes: 30 },
//     // }
//     const notificationTimeLocal = new Date('2024-03-11T05:45:00'); // Monday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-11T06:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle transition between days of the week', () => {
//     //  sunday: {
//     //   up: { hours: 8, minutes: 30 },
//     //   down: { hours: 23, minutes: 30 },
//     // },
//     // monday: {
//     //   up: { hours: 6, minutes: 30 },
//     //   down: { hours: 21, minutes: 30 },
//     // }
//     const notificationTimeLocal = new Date('2024-03-11T00:15:00'); // Monday (transitioned from Sunday)
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-11T06:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle sleep time at midnight for specific days', () => {
//     //  friday: {
//     //   up: { hours: 9, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     // saturday: {
//     //   up: { hours: 10, minutes: 0 },
//     //   down: { hours: 1, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-15T23:30:00'); // Friday
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-16T10:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time within wakeup period for specific day', () => {
//     // thursday: {
//     //   up: { hours: 6, minutes: 0 },
//     //   down: { hours: 21, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-14T07:30:00'); // Thursday
//     // current day not wait
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should adjust notification time to next day wakeup time if it is after fall asleep time for specific day', () => {
//     //  tuesday: {
//     //     up: { hours: 8, minutes: 0 },
//     //     down: { hours: 23, minutes: 0 },
//     //   },
//     //   wednesday: {
//     //     up: { hours: 7, minutes: 30 },
//     //     down: { hours: 22, minutes: 30 },
//     //   },
//     const notificationTimeLocal = new Date('2024-03-12T23:15:00'); // Tuesday
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-13T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time at day boundary', () => {
//     //  tuesday: {
//     //     up: { hours: 8, minutes: 0 },
//     //     down: { hours: 23, minutes: 0 },
//     //   },
//     //   wednesday: {
//     //     up: { hours: 7, minutes: 30 },
//     //     down: { hours: 22, minutes: 30 },
//     //   },
//     const notificationTimeLocal = new Date('2024-03-13T00:00:00'); // Wednesday (transitioned from Tuesday)
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-13T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time before wakeup time for specific day', () => {
//     // friday: {
//     //   up: { hours: 9, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-15T08:15:00'); // Friday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-15T09:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time after fall asleep time for specific day', () => {
//     // saturday: {
//     //   up: { hours: 10, minutes: 0 },
//     //   down: { hours: 1, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-16T02:45:00'); // Saturday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-16T10:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });
// dayByDayTimeSleepData v2 - checked
// dayByDayTimeSleepData v2 - checked
// dayByDayTimeSleepData v2 - checked
// dayByDayTimeSleepData v3 - not checked
// dayByDayTimeSleepData v3 - not checked
// dayByDayTimeSleepData v3 - not checked
// describe('getNotificationTimeAdjusted with isDayByDayOptionEnabled - dayByDayTimeSleepData v3', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 8, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 7, minutes: 0 },
//         down: { hours: 23, minutes: 0 },
//       },
//       tuesday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       wednesday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 0, minutes: 0 },
//       },
//       thursday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//       friday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 1, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 0 },
//         down: { hours: 2, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//     },
//   };

//   it('should adjust notification time when it is before wakeup time on Monday', () => {
//     //  monday: {
//     //   up: { hours: 7, minutes: 0 },
//     //   down: { hours: 23, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-11T06:30:00'); // Monday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time within wakeup period on Tuesday', () => {
//     //  tuesday: {
//     //   up: { hours: 6, minutes: 30 },
//     //   down: { hours: 22, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-12T12:00:00'); // Tuesday
//     // current day not wait
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should adjust notification time when it is after fall asleep time on Wednesday', () => {
//     //  wednesday: {
//     //   up: { hours: 8, minutes: 30 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     //  thursday: {
//     //   up: { hours: 7, minutes: 30 },
//     //   down: { hours: 23, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-13T23:45:00'); // Wednesday
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-14T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time at day boundary on Friday', () => {
//     //  friday: {
//     //   up: { hours: 9, minutes: 0 },
//     //   down: { hours: 1, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-15T00:30:00'); // Friday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-15T09:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust notification time when it is after fall asleep time on Saturday', () => {
//     //  saturday: {
//     //   up: { hours: 10, minutes: 0 },
//     //   down: { hours: 2, minutes: 0 },
//     // },
//     //  sunday: {
//     //   up: { hours: 8, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-16T02:30:00'); // Saturday
//     // current day after wake up
//     const expectedAdjustedTime = new Date('2024-03-16T10:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust notification time when it is after fall asleep time on Saturday', () => {
//     //  saturday: {
//     //   up: { hours: 10, minutes: 0 },
//     //   down: { hours: 2, minutes: 0 },
//     // },
//     //  sunday: {
//     //   up: { hours: 8, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-16T02:30:00'); // Saturday
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-17T08:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle transition from Sunday to Monday when notification time is after fall asleep time', () => {
//     //  sunday: {
//     //   up: { hours: 8, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     //  monday: {
//     //   up: { hours: 7, minutes: 0 },
//     //   down: { hours: 23, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-18T00:15:00'); // Monday (transitioned from Sunday)
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-18T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });
// dayByDayTimeSleepData v3 - not checked
// dayByDayTimeSleepData v3 - not checked
// dayByDayTimeSleepData v3 - not checked
// });
// describe('getNotificationTimeAdjusted with isDayByDayOptionEnabled', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 21, minutes: 30 },
//       },
//       tuesday: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 23, minutes: 0 },
//       },
//       wednesday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       thursday: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 21, minutes: 0 },
//       },
//       friday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 0 },
//         down: { hours: 1, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//     },
//   };

//   it('should adjust notification time based on day-by-day sleep settings', () => {
//     const notificationTimeLocal = new Date('2024-03-11T06:00:00'); // Monday
//     const expectedAdjustedTime = new Date('2024-03-11T06:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle transition between days of the week', () => {
//     const notificationTimeLocal = new Date('2024-03-10T23:30:00'); // Sunday to Monday
//     const expectedAdjustedTime = new Date('2024-03-11T06:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle sleep time at midnight for specific days', () => {
//     const notificationTimeLocal = new Date('2024-03-16T00:30:00'); // Saturday
//     const expectedAdjustedTime = new Date('2024-03-16T10:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });

//
//
//
//

// GPT
// describe('getNotificationTimeAdjusted with isDayByDayOptionEnabled and Sleep Time Offsets', () => {
//   const beforeSleepMinutes = 30;
//   const afterSleepMinutes = 30;
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 21, minutes: 30 },
//       },
//       tuesday: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 23, minutes: 0 },
//       },
//       wednesday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       thursday: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 21, minutes: 0 },
//       },
//       friday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 0 },
//         down: { hours: 1, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//     },
//   };

//   it('should adjust notification time for early morning before wake-up time with offset', () => {
//     const notificationTimeLocal = new Date('2024-03-11T06:00:00'); // Monday
//     const expectedAdjustedTime = new Date('2024-03-11T07:00:00'); // Adjusted for afterSleepMinutes
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle transition between days of the week with sleep offsets', () => {
//     const notificationTimeLocal = new Date('2024-03-10T23:00:00'); // Sunday to Monday
//     const expectedAdjustedTime = new Date('2024-03-11T07:00:00'); // Adjusted for afterSleepMinutes
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust for sleep time at midnight with offsets', () => {
//     const notificationTimeLocal = new Date('2024-03-16T00:30:00'); // Saturday
//     const expectedAdjustedTime = new Date('2024-03-16T10:30:00'); // Adjusted for afterSleepMinutes
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('notification time within wakeup period should remain unchanged with offsets', () => {
//     const notificationTimeLocal = new Date('2024-03-14T08:00:00'); // Thursday
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should adjust notification time to next day wakeup time if after fall asleep time', () => {
//     const notificationTimeLocal = new Date('2024-03-12T23:00:00'); // Tuesday
//     const expectedAdjustedTime = new Date('2024-03-13T08:00:00'); // Adjusted for afterSleepMinutes
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time at day boundary with offsets', () => {
//     const notificationTimeLocal = new Date('2024-03-13T00:00:00'); // Tuesday to Wednesday
//     const expectedAdjustedTime = new Date('2024-03-13T08:00:00'); // Adjusted for afterSleepMinutes
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust notification time before wakeup time for specific day with offset', () => {
//     const notificationTimeLocal = new Date('2024-03-15T08:00:00'); // Friday
//     const expectedAdjustedTime = new Date('2024-03-15T09:30:00'); // Considering beforeSleepMinutes
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust notification time after fall asleep time for specific day with offsets', () => {
//     const notificationTimeLocal = new Date('2024-03-17T01:00:00'); // Saturday
//     const expectedAdjustedTime = new Date('2024-03-17T08:30:00'); // Adjusted for afterSleepMinutes
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });

// CLOUD  beforeSleepMinutes = 30 afterSleepMinutes = 30;
// describe('getNotificationTimeAdjusted with isDayByDayOptionEnabled', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 21, minutes: 30 },
//       },
//       tuesday: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 23, minutes: 0 },
//       },
//       wednesday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       thursday: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 21, minutes: 0 },
//       },
//       friday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 0 },
//         down: { hours: 1, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//     },
//   };

//   const beforeSleepMinutes = 30;
//   const afterSleepMinutes = 30;

//   it('should adjust notification time based on day-by-day sleep settings', () => {
//     const notificationTimeLocal = new Date('2024-03-11T06:00:00'); // Monday
//     const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle transition between days of the week', () => {
//     const notificationTimeLocal = new Date('2024-03-10T23:00:00'); // Sunday to Monday
//     const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle sleep time at midnight for specific days', () => {
//     const notificationTimeLocal = new Date('2024-03-16T00:30:00'); // Saturday
//     const expectedAdjustedTime = new Date('2024-03-16T10:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time within wakeup period for specific day', () => {
//     const notificationTimeLocal = new Date('2024-03-14T08:30:00'); // Thursday
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should adjust notification time to next day wakeup time if it is after fall asleep time for specific day', () => {
//     //  tuesday: {
//     //     up: { hours: 8, minutes: 0 },
//     //     down: { hours: 23, minutes: 0 },
//     //   },
//     //   wednesday: {
//     //     up: { hours: 7, minutes: 30 },
//     //     down: { hours: 22, minutes: 30 },
//     //   },
//     const notificationTimeLocal = new Date('2024-03-12T23:00:00'); // Tuesday
//     const expectedAdjustedTime = new Date('2024-03-13T08:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time at day boundary', () => {
//     const notificationTimeLocal = new Date('2024-03-13T00:00:00'); // Tuesday(12 march) to Wednesday(13 march)
//     const expectedAdjustedTime = new Date('2024-03-13T08:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time before wakeup time for specific day', () => {
//     const notificationTimeLocal = new Date('2024-03-15T08:30:00'); // Friday
//     const expectedAdjustedTime = new Date('2024-03-15T09:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time after fall asleep time for specific day', () => {
//     // saturday: {
//     //   up: { hours: 10, minutes: 0 },
//     //   down: { hours: 1, minutes: 0 },
//     // },
//     // sunday: {
//     //   up: { hours: 8, minutes: 30 },
//     //   down: { hours: 23, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-17T01:00:00'); // Saturday
//     // next day after wake up
//     const expectedAdjustedTime = new Date('2024-03-17T09:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//         beforeSleepMinutes,
//         afterSleepMinutes,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });

// CLOUD new test monday - 0
// describe('getNotificationTimeAdjusted with isDayByDayOptionEnabled', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 21, minutes: 30 },
//       },
//       tuesday: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 23, minutes: 0 },
//       },
//       wednesday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       thursday: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 21, minutes: 0 },
//       },
//       friday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 0 },
//         down: { hours: 1, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//     },
//   };

//   it('should adjust notification time based on day-by-day sleep settings', () => {
//     //  monday: {
//     //   up: { hours: 6, minutes: 30 },
//     //   down: { hours: 21, minutes: 30 },
//     // }
//     const notificationTimeLocal = new Date('2024-03-11T06:00:00'); // Monday
//     // const notificationTimeLocal = new Date('2024-03-17T01:30:00'); // Saturday
//     const dayOfWeekNumber = getDay(notificationTimeLocal);
//     console.log('00000000000000000000000');
//     console.log('dayOfWeekNumber   ', dayOfWeekNumber);
//     const currentDay = notificationService.getCurrentDayOfWeek(
//       notificationTimeLocal,
//     );
//     console.log('currentDay', currentDay);
//     const nextDay = notificationService.getNextDayOfWeek(
//       notificationTimeLocal,
//     );
//     console.log('nextDay', nextDay);
//     // const expectedAdjustedTime = new Date('2024-03-17T08:30:00');
//     const expectedAdjustedTime = new Date('2024-03-11T06:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle transition between days of the week', () => {
//     //  sunday: {
//     //   up: { hours: 8, minutes: 30 },
//     //   down: { hours: 23, minutes: 30 },
//     // },
//     // monday: {
//     //   up: { hours: 6, minutes: 30 },
//     //   down: { hours: 21, minutes: 30 },
//     // }
//     const notificationTimeLocal = new Date('2024-03-11T00:30:00'); // Monday (transitioned from Sunday)
//     const expectedAdjustedTime = new Date('2024-03-11T06:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle sleep time at midnight for specific days', () => {
//     //  friday: {
//     //   up: { hours: 9, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-15T23:30:00'); // Friday
//     const expectedAdjustedTime = new Date('2024-03-16T09:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time within wakeup period for specific day', () => {
//     // thursday: {
//     //   up: { hours: 6, minutes: 0 },
//     //   down: { hours: 21, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-14T08:00:00'); // Thursday
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should adjust notification time to next day wakeup time if it is after fall asleep time for specific day', () => {
//     //  tuesday: {
//     //     up: { hours: 8, minutes: 0 },
//     //     down: { hours: 23, minutes: 0 },
//     //   },
//     //   wednesday: {
//     //     up: { hours: 7, minutes: 30 },
//     //     down: { hours: 22, minutes: 30 },
//     //   },
//     const notificationTimeLocal = new Date('2024-03-12T23:30:00'); // Tuesday
//     const expectedAdjustedTime = new Date('2024-03-13T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time at day boundary', () => {
//     //  tuesday: {
//     //     up: { hours: 8, minutes: 0 },
//     //     down: { hours: 23, minutes: 0 },
//     //   },
//     //   wednesday: {
//     //     up: { hours: 7, minutes: 30 },
//     //     down: { hours: 22, minutes: 30 },
//     //   },
//     const notificationTimeLocal = new Date('2024-03-13T00:00:00'); // Wednesday (transitioned from Tuesday)
//     const expectedAdjustedTime = new Date('2024-03-13T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time before wakeup time for specific day', () => {
//     // friday: {
//     //   up: { hours: 9, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-15T08:30:00'); // Friday
//     const expectedAdjustedTime = new Date('2024-03-15T09:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time after fall asleep time for specific day', () => {
//     // saturday: {
//     //   up: { hours: 10, minutes: 0 },
//     //   down: { hours: 1, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-16T01:30:00'); // Saturday
//     const expectedAdjustedTime = new Date('2024-03-16T10:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });
// CLOUD new test monday - 0
// CLOUD new test monday - 0
// CLOUD new test monday - 0
// проверенная база
// проверенная база
// проверенная база
// проверенная база
// проверенная база
// describe('getNotificationTimeAdjusted with isDayByDayOptionEnabled', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 21, minutes: 30 },
//       },
//       tuesday: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 23, minutes: 0 },
//       },
//       wednesday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       thursday: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 21, minutes: 0 },
//       },
//       friday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 0 },
//         down: { hours: 1, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//     },
//   };

//   it('should adjust notification time based on day-by-day sleep settings', () => {
//     //  monday: {
//     //   up: { hours: 6, minutes: 30 },
//     //   down: { hours: 21, minutes: 30 },
//     // }
//     const notificationTimeLocal = new Date('2024-03-11T06:00:00'); // Monday
//     const expectedAdjustedTime = new Date('2024-03-11T06:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle transition between days of the week', () => {
//     //  monday: {
//     //   up: { hours: 6, minutes: 30 },
//     //   down: { hours: 21, minutes: 30 },
//     // }
//     // sunday: {
//     //   up: { hours: 8, minutes: 30 },
//     //   down: { hours: 23, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-10T23:30:00'); // Sunday to Monday
//     const expectedAdjustedTime = new Date('2024-03-11T06:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle sleep time at midnight for specific days', () => {
//     //  saturday: {
//     //   up: { hours: 10, minutes: 0 },
//     //   down: { hours: 1, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-16T00:30:00'); // Saturday
//     const expectedAdjustedTime = new Date('2024-03-16T10:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time within wakeup period for specific day', () => {
//     // thursday: {
//     //   up: { hours: 6, minutes: 0 },
//     //   down: { hours: 21, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-14T08:00:00'); // Thursday
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should adjust notification time to next day wakeup time if it is after fall asleep time for specific day', () => {
//     //  tuesday: {
//     //     up: { hours: 8, minutes: 0 },
//     //     down: { hours: 23, minutes: 0 },
//     //   },
//     //   wednesday: {
//     //     up: { hours: 7, minutes: 30 },
//     //     down: { hours: 22, minutes: 30 },
//     //   },
//     const notificationTimeLocal = new Date('2024-03-12T23:30:00'); // Tuesday
//     const expectedAdjustedTime = new Date('2024-03-13T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time at day boundary', () => {
//     //  tuesday: {
//     //     up: { hours: 8, minutes: 0 },
//     //     down: { hours: 23, minutes: 0 },
//     //   },
//     //   wednesday: {
//     //     up: { hours: 7, minutes: 30 },
//     //     down: { hours: 22, minutes: 30 },
//     //   },
//     const notificationTimeLocal = new Date('2024-03-13T00:00:00'); // Tuesday(12 march) to Wednesday(13 march)
//     const expectedAdjustedTime = new Date('2024-03-13T07:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time before wakeup time for specific day', () => {
//     // friday: {
//     //   up: { hours: 9, minutes: 0 },
//     //   down: { hours: 0, minutes: 0 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-15T08:30:00'); // Friday
//     const expectedAdjustedTime = new Date('2024-03-15T09:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle notification time after fall asleep time for specific day', () => {
//     // saturday: {
//     //   up: { hours: 10, minutes: 0 },
//     //   down: { hours: 1, minutes: 0 },
//     // },
//     // sunday: {
//     //   up: { hours: 8, minutes: 30 },
//     //   down: { hours: 23, minutes: 30 },
//     // },
//     const notificationTimeLocal = new Date('2024-03-17T01:30:00'); // Saturday
//     const dayOfWeekNumber = getDay(notificationTimeLocal);
//     console.log('00000000000000000000000');
//     console.log('dayOfWeekNumber   ', dayOfWeekNumber);
//     const currentDay = notificationService.getCurrentDayOfWeek(
//       notificationTimeLocal,
//     );
//     console.log('currentDay', currentDay);
//     const nextDay = notificationService.getNextDayOfWeek(
//       notificationTimeLocal,
//     );
//     console.log('nextDay', nextDay);
//     const expectedAdjustedTime = new Date('2024-03-17T08:30:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });

// проверенная база
// проверенная база
// проверенная база
// проверенная база
// проверенная база
// проверенная база
// проверенная база
// проверенная база
// проверенная база
// describe('Test methods inside correctNotificationTimeForSleep', () => {
//   it('should check time sleep settings', () => {
//     const timeSleepSettings: TimeSleepSettings = {
//       isTimeSleepEnabled: false,
//       isDayByDayOptionEnabled: false,
//       generalTimeSleepData: generalTimeSleepDataDefault,
//     };

//     let result =
//       notificationService.isTimeSleepSettingsEnabled(timeSleepSettings);
//     expect(result).toEqual(false);

//     timeSleepSettings.isTimeSleepEnabled = true;
//     result =
//       notificationService.isTimeSleepSettingsEnabled(timeSleepSettings);
//     expect(result).toEqual(true);
//   });
// });

// describe('getNotificationTimeAdjusted', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//   };

//   it('should return the same notification time if it is within the wakeup period', () => {
//     const notificationTimeLocal = new Date('2024-03-10T12:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should adjust the notification time to the wakeup time if it is before the wakeup time on the same day', () => {
//     const notificationTimeLocal = new Date('2024-03-10T06:00:00');
//     const expectedAdjustedTime = new Date('2024-03-10T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust the notification time to the next day wakeup time if it is after the fall asleep time', () => {
//     const notificationTimeLocal = new Date('2024-03-10T23:00:00');
//     const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust the notification time to the wakeup time if it is exactly at the fall asleep time', () => {
//     const notificationTimeLocal = new Date('2024-03-10T22:00:00');
//     const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should adjust the notification time to the wakeup time if it is exactly at the wakeup time', () => {
//     const notificationTimeLocal = new Date('2024-03-10T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(notificationTimeLocal);
//   });

//   it('should handle time sleep settings with same wakeup and fall asleep times', () => {
//     const notificationTimeLocal = new Date('2024-03-10T12:00:00');
//     const timeSleepSettings: TimeSleepSettings = {
//       ...baseTimeSleepSettings,
//       generalTimeSleepData: {
//         up: { hours: 7, minutes: 0 },
//         down: { hours: 7, minutes: 0 },
//       },
//     };
//     const expectedAdjustedTime = new Date('2024-03-11T07:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         timeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle time sleep settings with fall asleep time at midnight', () => {
//     const notificationTimeLocal = new Date('2024-03-10T23:30:00');
//     const timeSleepSettings: TimeSleepSettings = {
//       ...baseTimeSleepSettings,
//       generalTimeSleepData: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//     };
//     const expectedAdjustedTime = new Date('2024-03-11T08:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         timeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });

//   it('should handle time sleep settings with wakeup time at midnight', () => {
//     const notificationTimeLocal = new Date('2024-03-10T23:30:00');
//     const timeSleepSettings: TimeSleepSettings = {
//       ...baseTimeSleepSettings,
//       generalTimeSleepData: {
//         up: { hours: 0, minutes: 0 },
//         down: { hours: 22, minutes: 0 },
//       },
//     };
//     const expectedAdjustedTime = new Date('2024-03-11T00:00:00');
//     expect(
//       notificationService.getNotificationTimeAdjusted(
//         notificationTimeLocal,
//         timeSleepSettings,
//       ),
//     ).toEqual(expectedAdjustedTime);
//   });
// });
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база
// проверена база

// describe('adjustSleepIntervalForNotificationTime', () => {

//   it('should return the same sleep interval when notification time is within sleep interval', () => {
//     const notificationTimeLocal = new Date('2024-03-10T23:30:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.adjustSleepIntervalForNotificationTime(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toEqual(sleepInterval);
//   });

//   it('should return the same sleep interval when notification time is before sleep start and same day', () => {
//     const notificationTimeLocal = new Date('2024-03-10T21:30:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.adjustSleepIntervalForNotificationTime(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toEqual(sleepInterval);
//   });

//   it('should return the same sleep interval when notification time is after sleep interval', () => {
//     const notificationTimeLocal = new Date('2024-03-11T08:00:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.adjustSleepIntervalForNotificationTime(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toEqual(sleepInterval);
//   });

//   it('should return the same sleep interval when notification time is equal to sleep start time', () => {
//     const notificationTimeLocal = new Date('2024-03-10T22:00:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.adjustSleepIntervalForNotificationTime(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toEqual(sleepInterval);
//   });

//   it('should return the same sleep interval when notification time is equal to sleep end time', () => {
//     const notificationTimeLocal = new Date('2024-03-11T07:30:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.adjustSleepIntervalForNotificationTime(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toEqual(sleepInterval);
//   });
// });
// describe('isNotificationTimeWithinSleepInterval', () => {
//   it('should return true when notification time is within sleep interval', () => {
//     const notificationTimeLocal = new Date('2024-03-10T23:30:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.isNotificationTimeWithinSleepInterval(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toBe(true);
//   });

//   it('should return false when notification time is before sleep interval', () => {
//     const notificationTimeLocal = new Date('2024-03-10T21:30:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.isNotificationTimeWithinSleepInterval(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toBe(false);
//   });

//   it('should return false when notification time is after sleep interval', () => {
//     const notificationTimeLocal = new Date('2024-03-11T08:00:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.isNotificationTimeWithinSleepInterval(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toBe(false);
//   });

//   it('should return true when notification time is equal to sleep start time', () => {
//     const notificationTimeLocal = new Date('2024-03-10T22:00:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.isNotificationTimeWithinSleepInterval(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toBe(true);
//   });

//   it('should return true when notification time is equal to sleep end time', () => {
//     const notificationTimeLocal = new Date('2024-03-11T07:30:00');
//     const sleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.isNotificationTimeWithinSleepInterval(
//         notificationTimeLocal,
//         sleepInterval,
//       ),
//     ).toBe(true);
//   });
// });

// describe('getSleepInterval with day-by-day settings', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 21, minutes: 30 },
//       },
//       tuesday: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 23, minutes: 0 },
//       },
//       wednesday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//       thursday: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 21, minutes: 0 },
//       },
//       friday: {
//         up: { hours: 9, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//       saturday: {
//         up: { hours: 10, minutes: 0 },
//         down: { hours: 1, minutes: 0 },
//       },
//       sunday: {
//         up: { hours: 8, minutes: 30 },
//         down: { hours: 23, minutes: 30 },
//       },
//     },
//   };

//   it('should return correct sleep interval for Monday', () => {
//     const notificationTimeLocal = new Date('2024-03-11T12:00:00');
//     const expectedSleepInterval = {
//       start: new Date('2024-03-11T21:30:00'),
//       end: new Date('2024-03-12T06:30:00'),
//     };
//     expect(
//       notificationService.getSleepInterval(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedSleepInterval);
//   });

//   it('should return correct sleep interval for Tuesday', () => {
//     const notificationTimeLocal = new Date('2024-03-12T12:00:00');
//     const expectedSleepInterval = {
//       start: new Date('2024-03-12T23:00:00'),
//       end: new Date('2024-03-13T08:00:00'),
//     };
//     expect(
//       notificationService.getSleepInterval(
//         notificationTimeLocal,
//         baseTimeSleepSettings,
//       ),
//     ).toEqual(expectedSleepInterval);
//   });

// Другие тесты для остальных дней недели...

// it('should fall back to general sleep settings if day-by-day settings are missing', () => {
//   const notificationTimeLocal = new Date('2024-03-18T12:00:00');
//   const timeSleepSettingsWithMissingDays: TimeSleepSettings = {
//     ...baseTimeSleepSettings,
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 6, minutes: 30 },
//         down: { hours: 21, minutes: 30 },
//       },
//       // Пропущены настройки для остальных дней
//     },
//   };
//   const expectedSleepInterval = {
//     start: new Date('2024-03-18T22:00:00'),
//     end: new Date('2024-03-19T07:00:00'),
//   };
//   expect(
//     notificationService.getSleepInterval(
//       notificationTimeLocal,
//       timeSleepSettingsWithMissingDays,
//     ),
//   ).toEqual(expectedSleepInterval);
// });

// =========
// =========
// =========
// =========
// =========
// describe('getSleepInterval', () => {
//   const baseTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 0, minutes: 0 },
//       down: { hours: 0, minutes: 0 },
//     },
//   };

//   it('should return correct sleep interval for simple case', () => {
//     const notificationTimeLocal = new Date('2024-03-10T12:00:00');
//     const timeSleepSettings: TimeSleepSettings = {
//       ...baseTimeSleepSettings,
//       generalTimeSleepData: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 0 },
//       },
//     };
//     const expectedSleepInterval = {
//       start: new Date('2024-03-10T22:00:00'),
//       end: new Date('2024-03-11T07:30:00'),
//     };
//     expect(
//       notificationService.getSleepInterval(
//         notificationTimeLocal,
//         timeSleepSettings,
//       ),
//     ).toEqual(expectedSleepInterval);
//   });

//   it('should handle sleep interval crossing midnight', () => {
//     const notificationTimeLocal = new Date('2024-03-10T12:00:00');
//     const timeSleepSettings: TimeSleepSettings = {
//       ...baseTimeSleepSettings,
//       generalTimeSleepData: {
//         up: { hours: 6, minutes: 0 },
//         down: { hours: 23, minutes: 30 },
//       },
//     };
//     const expectedSleepInterval = {
//       start: new Date('2024-03-10T23:30:00'),
//       end: new Date('2024-03-11T06:00:00'),
//     };
//     expect(
//       notificationService.getSleepInterval(
//         notificationTimeLocal,
//         timeSleepSettings,
//       ),
//     ).toEqual(expectedSleepInterval);
//   });

//   it('should handle sleep interval starting at midnight', () => {
//     const notificationTimeLocal = new Date('2024-03-10T12:00:00');
//     const timeSleepSettings: TimeSleepSettings = {
//       ...baseTimeSleepSettings,
//       generalTimeSleepData: {
//         up: { hours: 8, minutes: 0 },
//         down: { hours: 0, minutes: 0 },
//       },
//     };
//     const expectedSleepInterval = {
//       start: new Date('2024-03-10T00:00:00'),
//       end: new Date('2024-03-10T08:00:00'),
//     };
//     expect(
//       notificationService.getSleepInterval(
//         notificationTimeLocal,
//         timeSleepSettings,
//       ),
//     ).toEqual(expectedSleepInterval);
//   });

//   it('should handle sleep interval ending at midnight', () => {
//     const notificationTimeLocal = new Date('2024-03-10T12:00:00');
//     const timeSleepSettings: TimeSleepSettings = {
//       ...baseTimeSleepSettings,
//       generalTimeSleepData: {
//         up: { hours: 0, minutes: 0 },
//         down: { hours: 22, minutes: 30 },
//       },
//     };
//     const expectedSleepInterval = {
//       start: new Date('2024-03-10T22:30:00'),
//       end: new Date('2024-03-11T00:00:00'),
//     };
//     expect(
//       notificationService.getSleepInterval(
//         notificationTimeLocal,
//         timeSleepSettings,
//       ),
//     ).toEqual(expectedSleepInterval);
//   });

//   it('should handle sleep interval with same start and end time', () => {
//     const notificationTimeLocal = new Date('2024-03-10T12:00:00');
//     const timeSleepSettings: TimeSleepSettings = {
//       ...baseTimeSleepSettings,
//       generalTimeSleepData: {
//         up: { hours: 7, minutes: 0 },
//         down: { hours: 7, minutes: 0 },
//       },
//     };
//     const expectedSleepInterval = {
//       start: new Date('2024-03-10T07:00:00'),
//       end: new Date('2024-03-11T07:00:00'),
//     };
//     expect(
//       notificationService.getSleepInterval(
//         notificationTimeLocal,
//         timeSleepSettings,
//       ),
//     ).toEqual(expectedSleepInterval);
//   });
// });
// it('should not change notification time if sleep settings are disabled', () => {
//   const notificationTimeUTC = new Date('2024-03-10T10:00:00Z');
//   const timeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: false,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: generalTimeSleepDataDefault,
//     // Другие поля настроек...
//   };
//   const timeZone = 'Europe/Moscow';

//   const result = notificationService.correctNotificationTimeForSleep(
//     notificationTimeUTC,
//     timeSleepSettings,
//     timeZone,
//   );
//   expect(result).toEqual(notificationTimeUTC);
// });
// =========
// =========
// =========
// =========
// =========
// it('should not change notification time if sleep settings are disabled', () => {
//   const notificationTimeUTC = new Date('2024-03-10T10:00:00Z');
//   const timeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: false,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: generalTimeSleepDataDefault,
//     // Другие поля настроек...
//   };
//   const timeZone = 'Europe/Moscow';

//   const result = notificationService.correctNotificationTimeForSleep(
//     notificationTimeUTC,
//     timeSleepSettings,
//     timeZone,
//   );
//   expect(result).toEqual(notificationTimeUTC);
// });
// it('should not change notification time if it is outside sleep interval (before sleep)', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 23, minutes: 0 },
//     },
//   };
//   const mockTimeZone = 'Europe/Moscow';
// 	const initialNotificationTimeUTC = new Date('2024-03-10T19:30:00Z'); // 22:30 in Moscow
//   const correctedTime = notificationService.correctNotificationTimeForSleep(
//     initialNotificationTimeUTC,
//     mockTimeSleepSettings,
//     mockTimeZone,
//   );
//   expect(correctedTime).toEqual(initialNotificationTimeUTC);
// });

// it('should not change notification time if it is outside sleep interval (after wake up)', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 23, minutes: 0 },
//     },
//   };
//   const mockTimeZone = 'Europe/Moscow';
//   const initialNotificationTimeUTC = new Date('2024-03-11T05:00:00Z'); // 08:00 in Moscow
//   const correctedTime = notificationService.correctNotificationTimeForSleep(
//     initialNotificationTimeUTC,
//     mockTimeSleepSettings,
//     mockTimeZone,
//   );
//   expect(correctedTime).toEqual(initialNotificationTimeUTC);
// });

// it('should correct notification time if it is within sleep interval (midnight)', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 8, minutes: 30 },
//       down: { hours: 22, minutes: 0 },
//     },
//   };
//   const mockTimeZone = 'America/New_York';
//   const initialNotificationTimeUTC = new Date('2024-03-11T05:00:00Z'); // 00:00 in New York
//   const correctedTime = notificationService.correctNotificationTimeForSleep(
//     initialNotificationTimeUTC,
//     mockTimeSleepSettings,
//     mockTimeZone,
//   );
//   const expectedCorrectedTimeUTC = new Date('2024-03-11T13:00:00Z'); // 08:30 + 30 min in New York
//   expect(correctedTime).toEqual(expectedCorrectedTimeUTC);
// });
// it('should correct notification time if it is within sleep interval (midnight)', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 8, minutes: 30 },
//       down: { hours: 22, minutes: 0 },
//     },
//   };
//   const mockTimeZone = 'America/New_York';
//   const initialNotificationTimeUTC = new Date('2024-03-11T05:00:00Z'); // 00:00 in New York
//   const correctedTime =
//     notificationService.correctNotificationTimeForSleepReturnLocal(
//       initialNotificationTimeUTC,
//       mockTimeSleepSettings,
//       mockTimeZone,
//     );
//   const expectedCorrectedTimeUTC = new Date('2024-03-11T13:00:00Z'); // 08:30 + 30 min in New York
//   expect(correctedTime).toEqual(expectedCorrectedTimeUTC);
// });
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// 111111111111111111111111111
// it('should correct notification time if it is within sleep interval (early morning)', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 9, minutes: 0 },
//       down: { hours: 22, minutes: 0 },
//     },
//   };
//   const mockTimeZone = 'Asia/Tokyo';
//   const initialNotificationTimeUTC = new Date('2024-03-10T22:00:00Z'); // 07:00 in Tokyo
//   const correctedTime = notificationService.correctNotificationTimeForSleep(
//     initialNotificationTimeUTC,
//     mockTimeSleepSettings,
//     mockTimeZone,
//   );
//   const expectedCorrectedTimeUTC = new Date('2024-03-11T00:30:00Z'); // 09:30 in Tokyo
//   expect(correctedTime).toEqual(expectedCorrectedTimeUTC);
// });
//
//
//
//
//
//
//
// it('should correct notification time if it is within sleep interval (day by day settings)', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: true,
//     generalTimeSleepData: {
//       up: { hours: 8, minutes: 0 },
//       down: { hours: 23, minutes: 0 },
//     },
//     dayByDayTimeSleepData: {
//       monday: {
//         up: { hours: 7, minutes: 30 },
//         down: { hours: 22, minutes: 30 },
//       },
//     },
//   };
//   const mockTimeZone = 'Europe/London';
//   const initialNotificationTimeUTC = new Date('2024-03-11T06:00:00Z'); // 06:00 in London (Monday)
//   const correctedTime = notificationService.correctNotificationTimeForSleep(
//     initialNotificationTimeUTC,
//     mockTimeSleepSettings,
//     mockTimeZone,
//   );
//   const expectedCorrectedTimeUTC = new Date('2024-03-11T07:00:00Z'); // 07:30 + 30 min in London
//   expect(correctedTime).toEqual(expectedCorrectedTimeUTC);
// });
// it('should correctly determine sleep interval for the given notification time', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 23, minutes: 0 },
//     },
//   };
//   const mockNotificationTimeLocal = new Date('2024-03-10T01:00:00');

//   const sleepInterval = notificationService.getSleepInterval(
//     mockNotificationTimeLocal,
//     mockTimeSleepSettings,
//   );

//   expect(sleepInterval.start.getHours()).toBe(23);
//   expect(sleepInterval.start.getMinutes()).toBe(0);
//   expect(sleepInterval.end.getHours()).toBe(7);
//   expect(sleepInterval.end.getMinutes()).toBe(0);
//   expect(sleepInterval.end.getDate()).toBe(
//     mockNotificationTimeLocal.getDate() + 1,
//   );
// });

// it('should correct the notification time to after the sleep period', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 23, minutes: 0 },
//     },
//   };
//   const mockTimeZone = 'Europe/Moscow';
//   const initialNotificationTimeUTC = new Date('2024-03-10T22:00:00Z');
//   console.log('Initial notification time (UTC):', initialNotificationTimeUTC);

//   const localTimeInMoscow = utcToZonedTime(
//     initialNotificationTimeUTC,
//     mockTimeZone,
//   );
//   console.log('Initial notification time (Moscow):', localTimeInMoscow);

//   const correctedTime = notificationService.correctNotificationTimeForSleep(
//     initialNotificationTimeUTC,
//     mockTimeSleepSettings,
//     mockTimeZone,
//   );
//   console.log('Corrected notification time (UTC):', correctedTime);

//   const correctedTimeInMoscow = utcToZonedTime(correctedTime, mockTimeZone);
//   console.log('Corrected notification time (Moscow):', correctedTimeInMoscow);

//   // ...
// });

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// it('should correct the notification time to after the sleep period', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 23, minutes: 0 },
//     },
//   };
//   const mockTimeZone = 'Europe/Moscow';
//   const initialNotificationTimeUTC = new Date('2024-03-10T22:00:00Z');
//   console.log('Initial notification time (UTC):', initialNotificationTimeUTC);

//   const localTimeInMoscow = utcToZonedTime(
//     initialNotificationTimeUTC,
//     mockTimeZone,
//   );
//   console.log('Initial notification time (Moscow):', localTimeInMoscow);

//   const correctedTime = notificationService.correctNotificationTimeForSleep(
//     initialNotificationTimeUTC,
//     mockTimeSleepSettings,
//     mockTimeZone,
//   );

//   const correctedTimeInMoscow = utcToZonedTime(correctedTime, mockTimeZone);
//   console.log('Corrected notification time (Moscow):', correctedTimeInMoscow);

//   expect(correctedTimeInMoscow.getHours()).toBeGreaterThanOrEqual(7);
//   expect(correctedTimeInMoscow.getMinutes()).toBe(30);
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// it('should correct the notification time to after the sleep period', () => {
//   const mockTimeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: true,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: {
//       up: { hours: 7, minutes: 0 },
//       down: { hours: 23, minutes: 0 },
//     },
//   };
//   const mockTimeZone = 'Europe/Moscow';
//   const initialNotificationTimeUTC = new Date('2024-03-10T22:00:00Z'); // 01:00 in Moscow, within the sleep period
//   const localTimeInMoscow = utcToZonedTime(
//     initialNotificationTimeUTC,
//     mockTimeZone,
//   );
//   console.log(
//     'initialNotificationTimeUTC',
//     initialNotificationTimeUTC.toString(),
//   );
//   console.debug('localTimeInMoscow', localTimeInMoscow.toString());
//   const correctedTime = notificationService.correctNotificationTimeForSleep(
//     initialNotificationTimeUTC,
//     mockTimeSleepSettings,
//     mockTimeZone,
//   );

//   console.log('correctedTime', correctedTime.toString());
//   // Проверяем, что корректированное время выходит за пределы периода сна
//   const correctedTimeInMoscow = utcToZonedTime(correctedTime, mockTimeZone);
// });
// it('should correctly handle time correction when sleep settings are disabled', () => {
//   const notificationTimeUTC = new Date('2024-03-10T15:00:00Z');
//   const timeSleepSettings: TimeSleepSettings = {
//     isTimeSleepEnabled: false,
//     isDayByDayOptionEnabled: false,
//     generalTimeSleepData: generalTimeSleepDataDefault,
//     // Остальные настройки...
//   };
//   const timeZone = 'Europe/Moscow';

//   const correctedTime = service.correctNotificationTimeForSleep(
//     notificationTimeUTC,
//     timeSleepSettings,
//     timeZone,
//   );
//   expect(correctedTime).toEqual(notificationTimeUTC);
// });

// Дополнительные тесты...
// });
// // import { CupboardClass } from '@/user-data-storage/user-data-storage.service';
// // import { getFullUrl } from 'test/utils/helpers/getFullUrl';
// // import request from 'supertest';
// // import { loginAndGetToken } from 'test/utils/helpers/loginAndGetToken';
// // import { restoreDb } from 'test/utils/helpers/restoreDb';
// // import { AnswerType } from '@/common/types/frontend/types';
// // import {
// //   diffInMinutes,
// //   diffInHours,
// //   diffInFullTime,
// // } from 'test/utils/timeFormaters';
// // import { validateInitialCupboardState } from 'test/utils/helpers/validateInitialCupboardState';
// // import { addMonths, addWeeks } from 'date-fns';
// // import { createTestUtils } from 'test/utils/utils';
// import { TimeSleepSettings } from '@/aggregate/entities/settings-types';
// import { NotificationService } from '@/notification/notification.service';
// import { SettingsService } from '@/settings/settings.service';
// import { TestingModule, Test } from '@nestjs/testing';
// import { generalTimeSleepDataDefault } from '../../prisma/mock-data/user-settings-templates';
// import { EventEmitter2 } from '@nestjs/event-emitter';

// describe('NotificationService', () => {
//   let service: NotificationService;

//   beforeEach(async () => {
//     const mockEventEmitter = {
//       // Здесь добавляем моки для методов, которые используются в сервисе
//       emit: jest.fn(),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         NotificationService,
//         {
//           provide: SettingsService,
//           useValue: {
//             // Мок для SettingsService, если он используется внутри NotificationService
//           },
//         },
//         {
//           provide: EventEmitter2,
//           useValue: mockEventEmitter, // Предоставляем мок EventEmitter2
//         },
//       ],
//     }).compile();

//     service = module.get<NotificationService>(NotificationService);
//   });
//   it('should correctly handle time correction when sleep settings are disabled', () => {
//     const notificationTimeUTC = new Date('2024-03-10T15:00:00Z');
//     const timeSleepSettings: TimeSleepSettings = {
//       isTimeSleepEnabled: false,
//       isDayByDayOptionEnabled: false,
//       generalTimeSleepData: generalTimeSleepDataDefault,
//       // Остальные настройки...
//     };
//     const timeZone = 'Europe/Moscow';

//     const correctedTime = service.correctNotificationTimeForSleep(
//       notificationTimeUTC,
//       timeSleepSettings,
//       timeZone,
//     );
//     expect(correctedTime).toEqual(notificationTimeUTC);
//   });

//   // Дополнительные тесты...
// });
