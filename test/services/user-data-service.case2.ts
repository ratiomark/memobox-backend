import { CupboardClass } from '@/user-data-storage/user-data-storage.service';
import { getFullUrl } from 'test/utils/helpers/getFullUrl';
import request from 'supertest';
import { loginAndGetToken } from 'test/utils/helpers/loginAndGetToken';
import { restoreDb } from 'test/utils/helpers/restoreDb';
import { AnswerType } from '@/common/types/frontend/types';
import {
  diffInMinutes,
  diffInHours,
  diffInFullTime,
} from 'test/utils/timeFormaters';
import { validateInitialCupboardState } from 'test/utils/helpers/validateInitialCupboardState';
import { addMonths, addWeeks } from 'date-fns';
import { createTestUtils } from 'test/utils/utils';

describe('CardsService', () => {
  const app_url_full = getFullUrl();
  let userToken;

  let initialShelfId;
  let isSeedInInitialState = true;
  let sortedBoxesIds;
  let getCardsByBoxIndex;
  let getTrainingCardsByBoxIndex;
  let getServerTime;
  let createTrainingResponses;
  let sendTrainingResponses;
  let checkUpdatedCards;
  let dropCards;
  let restoreDb;

  beforeAll(async () => {
    const utils = await createTestUtils();
    getCardsByBoxIndex = utils.getCardsByBoxIndex;
    getTrainingCardsByBoxIndex = utils.getTrainingCardsByBoxIndex;
    getServerTime = utils.getServerTime;
    createTrainingResponses = utils.createTrainingResponses;
    sendTrainingResponses = utils.sendTrainingResponses;
    checkUpdatedCards = utils.checkUpdatedCards;
    dropCards = utils.dropCards;
    userToken = utils.userToken;
    initialShelfId = utils.initialShelfId;
    restoreDb = utils.restoreDb;
    await restoreDb();
  });

  beforeEach(() => {
    global.console = require('console');
  });

  const getCupboardObject = async () => {
    const response = await request(app_url_full)
      .get(`/aggregate/cupboard-object`)
      .auth(userToken, { type: 'bearer' });
    return response.body;
  };

  afterAll(async () => {
    await dropCards();
  });

  beforeEach(() => {
    if (!isSeedInInitialState) {
      throw new Error('Seed test failed, skipping...');
    }
  });

  it('should validate initial cupboard state', async () => {
    try {
      const { shelfId, sortedBoxes } =
        await validateInitialCupboardState(userToken);
      initialShelfId = shelfId;
      sortedBoxesIds = sortedBoxes;
    } catch (error) {
      isSeedInInitialState = false; // Обновляем состояние в случае ошибки
      throw new Error(error);
    }
  });

  it('should correctly update cards [in box 4 good answers] after training responses', async () => {
    await dropCards();
    const answer = 'good';

    const trainingCards = await getTrainingCardsByBoxIndex(4);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    const updates = await sendTrainingResponses(trainingResponses);
    console.log(updates.body[0].nextTraining);
    console.log(serverTime);
    console.log(updates.body[0].nextTraining);
    console.log(serverTime.toISOString());
    const cardsFromBox4 = await getCardsByBoxIndex(4);
    expect(cardsFromBox4).toHaveLength(0);

    const cardsFromBox5 = await getCardsByBoxIndex(5);
    expect(cardsFromBox5).toHaveLength(10);

    const trainCards = cardsFromBox5.filter(
      (card) =>
        card.state === 'train' && new Date(card.nextTraining) < serverTime,
    );
    expect(trainCards).toHaveLength(5);
    // Фильтрация карточек, которые еще не готовы к тренировке
    const updatedCards = cardsFromBox5.filter(
      (card) =>
        card.state === 'wait' && new Date(card.nextTraining) > serverTime,
    );
    expect(trainCards).toHaveLength(5);
    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addMonthsToDate, 1, 'wait');
  });

  it('calculateNextTrainingTime returns correct ISO string', async () => {
    await dropCards();
    const answer = 'good';
    const now = await getServerTime();

    const trainingCards = await getTrainingCardsByBoxIndex(4);
    expect(trainingCards).toHaveLength(5);
    // 1712105509730;
    // 1709430709730;
    const trainingResponses = createTrainingResponses(trainingCards, answer);
    // console.log(trainingResponses);
    const cupboard = await getCupboardObject();
    const service = new CupboardClass(cupboard);
    const updates = trainingResponses
      .map((card) => {
        return service.getNextTrainingTimeByCardData({ ...card, now });
      })
      .map((card) => ({ ...card, state: 'wait' }));

    // console.log(JSON.stringify(updates, null, 3));
    console.log(now.getTime());
    console.log(new Date(updates[0].nextTraining).getTime());
    console.log(now.getTime() - new Date(updates[0].nextTraining).getTime());
    checkUpdatedCards(updates, now, addMonths, 1, 'wait');
  });

  // it('calculateNextTrainingTime returns correct ISO string', async () => {
  //   const answer = 'good';
  //   const now = await getServerTime();

  //   const trainingCards = await getTrainingCardsByBoxIndex(5);
  //   expect(trainingCards).toHaveLength(5);

  //   const trainingResponses = createTrainingResponses(trainingCards, answer);
  //   // console.log(trainingResponses);
  //   const cupboard = await getCupboardObject();
  //   const service = new CupboardClass(cupboard);
  //   const updates = trainingResponses
  //     .map((card) => {
  //       return service.getNextTrainingTimeByCardData({ ...card, now });
  //     })
  //     .map((card) => ({ ...card, state: 'wait' }));

  //   console.log(JSON.stringify(updates, null, 3));
  //   checkUpdatedCards(updates, now, addMonths, 1, 'wait');
  // });
  // it('calculateNextTrainingTime returns correct ISO string', async () => {
  //   const answer = 'bad';
  //   const now = await getServerTime();

  //   const trainingCards = await getTrainingCardsByBoxIndex(5);
  //   expect(trainingCards).toHaveLength(5);

  //   const trainingResponses = createTrainingResponses(trainingCards, answer);
  //   // console.log(trainingResponses);
  //   const cupboard = await getCupboardObject();
  //   const service = new CupboardClass(cupboard);
  //   const updates = trainingResponses
  //     .map((card) => {
  //       return service.getNextTrainingTimeByCardData({ ...card, now });
  //     })
  //     .map((card) => ({ ...card, state: 'wait' }));

  //   console.log(JSON.stringify(updates, null, 3));
  //   checkUpdatedCards(updates, now, addWeeks, 1, 'wait');
  // });
  // it('calculateNextTrainingTime returns correct ISO string', () => {
  //   const service = new CupboardClass({});
  //   const now = new Date();
  //   const timing = { minutes: 5, hours: 1, days: 1, weeks: 0, months: 1 };

  //   // Вычисляем ожидаемую дату
  //   let expectedDate = addMinutes(now, timing.minutes);
  //   expectedDate = addHours(expectedDate, timing.hours);
  //   expectedDate = addDays(expectedDate, timing.days);
  //   expectedDate = addWeeks(expectedDate, timing.weeks);
  //   expectedDate = addMonths(expectedDate, timing.months);

  //   const result = service.calculateNextTrainingTime(now, timing);

  //   expect(result).toBe(expectedDate.toISOString());
  // });
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       CardsService,
  //       {
  //         provide: PrismaService,
  //         useValue: {
  //           card: {
  //             findMany: jest.fn(),
  //           },
  //         },
  //       },
  //       {
  //         provide: I18nService,
  //         useValue: {
  //           // Мокирование I18nService
  //           translate: jest.fn().mockImplementation((key) => `mocked-${key}`),
  //         },
  //       },
  //       {
  //         provide: NotificationService,
  //         useValue: {
  //           rescheduleNotification: jest.fn(),
  //         },
  //       },
  //     ],
  //   }).compile();

  //   cardsService = module.get<CardsService>(CardsService);
  //   prismaService = module.get<PrismaService>(PrismaService);
  // });

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
});
