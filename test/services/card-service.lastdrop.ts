import { AppModule } from '@/app.module';
import { CardsService } from '@/cards/cards.service';
import { UpdateCardDto } from '@/cards/dto/update-card.dto';
import { NotificationService } from '@/notification/notification.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Card } from '@prisma/client';
import request from 'supertest';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'nestjs-prisma';
import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from 'test/utils/constants';
import { TEST_prisma } from 'test/utils/prisma';
import { INestApplication, Logger } from '@nestjs/common';

describe('CardsService', () => {
  let cardsService: CardsService;
  let prismaService: PrismaService;
  const userId = 'some-user-id';

  let app: INestApplication;
  let httpServer;
  const prisma = TEST_prisma;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    // app.
    app.useLogger(new Logger());
    httpServer = await app.getHttpServer();
    // const url = await app.getUrl();
    // console.log(url);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
    console.log('отключился!!!!!');
  });

  it('Login: /api/v1/auth/email/login (POST)', async () => {
    const response = await request(httpServer)
      .post('/api/v1/auth/email/register')
      .send({ email: TESTER_EMAIL + 'a', password: TESTER_PASSWORD })
      .expect(201);
    console.log(response);
    // const cards = await prisma.card.findMany({});
    // console.log(cards);
    // console.log(cards.length);

    // return request(APP_URL)
    //   .post('/api/v1/auth/email/login')
    //   .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
    //   .expect(200)
    //   .expect(({ body }) => {
    //     expect(body.token).toBeDefined();
    //     expect(body.refreshToken).toBeDefined();
    //     expect(body.tokenExpires).toBeDefined();
    //     expect(body.user.jsonSavedData).toBeDefined();
    //     expect(body.user.jsonSettings).toBeDefined();
    //     expect(body.user.email).toBeDefined();
    //     expect(body.user.hash).not.toBeDefined();
    //     expect(body.user.password).not.toBeDefined();
    //     expect(body.user.previousPassword).not.toBeDefined();
    //   });
  });
});
// import { CardsService } from '@/cards/cards.service';
// import { UpdateCardDto } from '@/cards/dto/update-card.dto';
// import { NotificationService } from '@/notification/notification.service';
// import { Test, TestingModule } from '@nestjs/testing';
// import { Card } from '@prisma/client';
// import { I18nService } from 'nestjs-i18n';
// import { PrismaService } from 'nestjs-prisma';

// describe('CardsService', () => {
//   let cardsService: CardsService;
//   let prismaService: PrismaService;
//   const userId = 'some-user-id';

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CardsService,
//         {
//           provide: PrismaService,
//           useValue: {
//             card: {
//               findMany: jest.fn(),
//             },
//           },
//         },
//         {
//           provide: I18nService,
//           useValue: {
//             // Мокирование I18nService
//             translate: jest.fn().mockImplementation((key) => `mocked-${key}`),
//           },
//         },
//         {
//           provide: NotificationService,
//           useValue: {
//             rescheduleNotification: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     cardsService = module.get<CardsService>(CardsService);
//     prismaService = module.get<PrismaService>(PrismaService);
//   });

//   it('getNotificationTime должен правильно вычислять время уведомления, нет карточек', async () => {
//     const mockCards = [] as Card[];
//     jest.spyOn(prismaService.card, 'findMany').mockResolvedValue(mockCards);

//     // const expectedNotificationTime = new Date('2022-01-02T12:00:00Z');
//     const notificationTime = await cardsService.getNotificationTime(userId);

//     expect(notificationTime).toEqual(null);
//   });
//   it('getNotificationTime должен правильно вычислять время уведомления, меньше 10 карточек', async () => {
//     const mockCards = [
//       { nextTraining: new Date('2022-01-01T10:00:00Z') },
//       { nextTraining: new Date('2022-01-02T12:00:00Z') },
//       // Другие моковые данные...
//     ] as Card[];
//     jest.spyOn(prismaService.card, 'findMany').mockResolvedValue(mockCards);

//     // const expectedNotificationTime = new Date('2022-01-02T12:00:00Z');
//     const notificationTime = await cardsService.getNotificationTime(userId);

//     expect(notificationTime).toEqual(null);
//   });

//   it('getNotificationTime должен правильно вычислять время уведомления', async () => {
//     const maxDate = new Date('2022-05-02T12:00:00Z');
//     const mockCards = [
//       { nextTraining: new Date('2022-01-01T10:00:00Z') },
//       { nextTraining: new Date('2022-01-02T12:00:00Z') },
//       { nextTraining: new Date('2022-01-08T12:00:00Z') },
//       { nextTraining: new Date('2022-01-02T12:00:00Z') },
//       { nextTraining: new Date('2022-01-03T12:00:00Z') },
//       { nextTraining: new Date('2022-01-02T12:00:00Z') },
//       { nextTraining: new Date('2022-01-02T12:00:00Z') },
//       { nextTraining: new Date('2022-03-02T12:00:00Z') },
//       { nextTraining: new Date('2022-04-02T12:00:00Z') },
//       { nextTraining: maxDate },
//     ] as Card[];
//     jest.spyOn(prismaService.card, 'findMany').mockResolvedValue(mockCards);

//     const expectedNotificationTime = maxDate;
//     const notificationTime = await cardsService.getNotificationTime(userId);

//     expect(notificationTime).toEqual(expectedNotificationTime);
//   });

//   it('getNotificationTime должен правильно вычислять время уведомления', async () => {
//     const maxDate = new Date('2022-01-02T23:00:00Z');
//     const mockCards = [
//       { nextTraining: new Date('2022-01-01T10:00:00Z') },
//       { nextTraining: new Date('2022-01-02T12:00:00Z') },
//       { nextTraining: new Date('2022-01-02T14:00:00Z') },
//       { nextTraining: new Date('2022-01-02T16:00:00Z') },
//       { nextTraining: new Date('2022-01-02T12:00:00Z') },
//       { nextTraining: new Date('2022-01-02T18:00:00Z') },
//       { nextTraining: new Date('2022-01-02T19:00:00Z') },
//       { nextTraining: new Date('2022-01-02T20:00:00Z') },
//       { nextTraining: new Date('2022-01-02T21:00:00Z') },
//       { nextTraining: new Date('2022-01-02T22:00:00Z') },
//       { nextTraining: maxDate },
//       // Другие моковые данные...
//     ] as Card[];
//     jest.spyOn(prismaService.card, 'findMany').mockResolvedValue(mockCards);

//     const expectedNotificationTime = maxDate;
//     const notificationTime = await cardsService.getNotificationTime(userId);

//     expect(notificationTime).toEqual(expectedNotificationTime);
//   });
// });

// describe('CardsService', () => {
//   let cardsService: CardsService;
//   let prismaService: PrismaService;
//   let notificationService: NotificationService;
//   const card: Card = {
//     answer: 'answer',
//     question: 'question',
//     boxId: 'some-box-id',
//     shelfId: 'some-shelf-id',
//     userId: 'some-user-id',
//     id: 'some-card-id',
//     lastTraining: new Date('2023-01-01T10:00:00Z'),
//     nextTraining: new Date('2024-01-01T10:00:00Z'),
//     isDeleted: false,
//     createdAt: new Date('2022-01-01T10:00:00Z'),
//     updatedAt: new Date('2023-01-01T10:00:00Z'),
//     deletedAt: null,
//   };
//   const updateCardDto = {
//     answer: 'answerUpdated',
//     question: 'questionUpdated',
//   } as unknown as UpdateCardDto;
//   const cardUpdated: Card = {
//     ...card,
//     answer: 'answerUpdated',
//     question: 'questionUpdated',
//     lastTraining: new Date(),
//     updatedAt: new Date(),
//   };
//   const expectedUpdateArg = {
//     data: updateCardDto,
//     where: { id: card.id },
//     include: { box: { select: { index: true, specialType: true } } },
//   };
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CardsService,
//         {
//           provide: PrismaService,
//           useValue: {
//             card: {
//               update: jest.fn().mockResolvedValue(cardUpdated),
//             },
//           },
//         },
//         {
//           provide: NotificationService,
//           useValue: {
//             rescheduleNotification: jest.fn(),
//           },
//         },
//         {
//           provide: I18nService,
//           useValue: {
//             // Мокирование I18nService
//             translate: jest.fn().mockImplementation((key) => `mocked-${key}`),
//           },
//         },
//       ],
//     }).compile();

//     cardsService = module.get<CardsService>(CardsService);
//     prismaService = module.get<PrismaService>(PrismaService);
//     notificationService = module.get<NotificationService>(NotificationService);
//   });

//   it('должен корректно обновлять карточку и перепланировать уведомление', async () => {
//     const expectedNotificationTime = new Date('2023-01-01T10:00:00Z');

//     jest.spyOn(prismaService.card, 'update').mockResolvedValue(card);
//     jest
//       .spyOn(cardsService, 'getNotificationTime')
//       .mockResolvedValue(expectedNotificationTime);

//     await cardsService.update(card.id, updateCardDto);

//     expect(prismaService.card.update).toHaveBeenCalledWith(expectedUpdateArg);
//     expect(notificationService.rescheduleNotification).toHaveBeenCalledWith(
//       card.userId,
//       expectedNotificationTime,
//     );
//   });
//   it('должен корректно обновлять карточку и перепланировать уведомление', async () => {
//     const expectedNotificationTime = null;

//     jest.spyOn(prismaService.card, 'update').mockResolvedValue(card);
//     jest
//       .spyOn(cardsService, 'getNotificationTime')
//       .mockResolvedValue(expectedNotificationTime);

//     await cardsService.update(card.id, updateCardDto);

//     expect(prismaService.card.update).toHaveBeenCalledWith(expectedUpdateArg);
//     expect(notificationService.rescheduleNotification).not.toHaveBeenCalled();
//   });
// });
