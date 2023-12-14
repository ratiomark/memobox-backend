import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { addMinutes } from 'date-fns';

describe('Test cards training receiving', () => {
  const app = APP_URL;
  const app_url_full = app + API_PREFIX;
  let userToken;
  let userRefreshToken;
  let shelvesData;
  let shelfId;
  let newCardsBoxId;
  let isSeedInInitialState = true;

  beforeAll(async () => {
    // Получение токена пользователя
    const loginResponse = await request(app_url_full)
      .post('/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

    userToken = loginResponse.body.token;
    userRefreshToken = loginResponse.body.refreshToken;

    // Получение данных о полках и коробках
    const shelvesResponse = await request(app_url_full)
      .get('/aggregate/view')
      .auth(userToken, { type: 'bearer' });

    shelvesData = shelvesResponse.body.shelvesAndBoxesData;
    shelfId = Object.keys(shelvesData)[0];
    newCardsBoxId = shelvesData[shelfId].boxesItems.find(
      (box) => box.index === 0,
    ).id;
  });

  it('should retrieve all new cards from cupboard', async () => {
    try {
      const response = await request(app_url_full)
        .get(`/cards/training/all/new`)
        .auth(userToken, { type: 'bearer' });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((card) => {
        expect(card.shelfId).toBe(shelfId);
        expect(card.boxId).toBe(newCardsBoxId);
        expect(card.specialType).toBe('new');
        expect(card.state).toBe('train');
        expect(card.nextTraining).toBe(null);
      });
    } catch (error) {
      isSeedInInitialState = false;
      throw new Error('Seed test failed, set correct initial db state');
    }

    // if (expect.getState().currentTestName && expect.hasAssertions() === false) {
    // isSeedInInitialState = false;
    // }
    // if (!isPreviousTestSuccessful) {
    // throw new Error('Previous test failed, skipping...');
    // }
  });

  // afterEach(() => {
  //   if (!isSeedInInitialState) {
  //     throw new Error('Seed test failed, skipping...');
  //   }
  // });

  it('should retrieve all new cards from specific shelf', async () => {
    const boxWithNewCards = shelvesData[shelfId].boxesItems[0];
    expect(boxWithNewCards.index).toBe(0);
    expect(boxWithNewCards.id).toBe(newCardsBoxId);

    // Получение карточек для тренировки
    const response = await request(app_url_full)
      .get(`/cards/training/${shelfId}/${newCardsBoxId}`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.boxId).toBe(newCardsBoxId);
      expect(card.state).toBe('train');
      expect(card.nextTraining).toBe(null);
    });
  });
  it('should retrieve all training cards from the entire shelf', async () => {
    // Получение всех карточек для тренировки
    const response = await request(app_url_full)
      .get(`/cards/training/${shelfId}/all`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.state).toBe('train');
      // Дополнительные проверки по необходимости
    });
  });

  it('should retrieve the same cards for "all/all" and "specificShelf/all"', async () => {
    // Получение карточек для всего шкафа
    const allShelvesResponse = await request(app_url_full)
      .get(`/cards/training/all/all`)
      .auth(userToken, { type: 'bearer' });

    // Получение карточек для конкретной полки
    const specificShelfResponse = await request(app_url_full)
      .get(`/cards/training/${shelfId}/all`)
      .auth(userToken, { type: 'bearer' });

    expect(allShelvesResponse.status).toBe(200);
    expect(specificShelfResponse.status).toBe(200);
    expect(allShelvesResponse.body).toEqual(specificShelfResponse.body);
  });

  it('should retrieve the same cards for "all/new" and "specificShelf/specificBox(new cards)"', async () => {
    // Получение новых карточек для всего шкафа
    const allNewCardsResponse = await request(app_url_full)
      .get(`/cards/training/all/new`)
      .auth(userToken, { type: 'bearer' });

    // Получение новых карточек для конкретной полки и коробки
    const specificShelfBoxResponse = await request(app_url_full)
      .get(`/cards/training/${shelfId}/${newCardsBoxId}`)
      .auth(userToken, { type: 'bearer' });

    expect(allNewCardsResponse.status).toBe(200);
    expect(specificShelfBoxResponse.status).toBe(200);
    expect(allNewCardsResponse.body).toEqual(specificShelfBoxResponse.body);
  });

  it('should retrieve all learning cards from cupboard', async () => {
    const response = await request(app_url_full)
      .get(`/cards/training/all/learning`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.boxId).not.toBe(newCardsBoxId);
      expect(card.specialType).not.toBe('new');
      expect(card.state).toBe('train');
      expect(card.nextTraining).not.toBe(null);
      expect(new Date(card.nextTraining).toString()).not.toBe('Invalid Date');
    });
  });
  // ==================

  it('should correctly update new cards after training responses', async () => {
    // Получение новых карточек для тренировки
    const boxWithIndex1boxId = shelvesData[shelfId].boxesItems.find(
      (box) => box.index === 1,
    ).id;

    const trainingCardsResponse = await request(app_url_full)
      .get(`/cards/training/all/new`)
      .auth(userToken, { type: 'bearer' });

    const trainingCards = trainingCardsResponse.body;
    const trainingCardIds = trainingCards.map((card) => card.id);

    // Формируем ответы пользователя на тренировке
    const trainingResponses = trainingCards.map((card, index) => {
      let answer;
      if (index % 3 === 0) answer = 'bad';
      else if (index % 3 === 1) answer = 'middle';
      else answer = 'good';
      return { ...card, answer };
    });

    const serverTimeResponse = await request(app_url_full)
      .get('/aggregate/server-time')
      .auth(userToken, { type: 'bearer' });
    const serverTime = new Date(serverTimeResponse.body);

    // Отправка ответов на тренировку
    await request(app_url_full)
      .post('/cards/training/answers')
      .send({ responses: trainingResponses })
      .auth(userToken, { type: 'bearer' });

    // Проверка обновленных карточек
    const cardsFromNextBox = await request(app_url_full)
      .get(`/cards/get-by-shelfId-and-boxId/${shelfId}/${boxWithIndex1boxId}`)
      .auth(userToken, { type: 'bearer' });
    const updatedCards = cardsFromNextBox.body.filter((card) =>
      trainingCardIds.includes(card.id),
    );

    updatedCards.forEach((updatedCard) => {
      expect(updatedCard.state).toBe('wait');
      expect(updatedCard.boxId).toBe(boxWithIndex1boxId);

      const expectedNextTraining = addMinutes(serverTime, 5);

      // Проверка nextTraining с допустимым отклонением в 30 секунд
      const nextTraining = new Date(updatedCard.nextTraining);
      expect(nextTraining.getTime()).toBeCloseTo(
        expectedNextTraining.getTime(),
        30 * 1000,
      );
    });
  });
});
// коробка 0(новые) - 5 карточек (nextTraining = null)
// коробка 1 - 5 карточек (nextTraining = seedTime) - timing = 5 минут
// коробка 2 - 5 карточек (nextTraining = seedTime) - timing = 8 часов
// коробка 3 - 5 карточек (nextTraining = seedTime) - timing = 1 день
// коробка 4 - 5 карточек (nextTraining = seedTime) - timing = 3 дня
// коробка 5(изученные) - 5 карточек (nextTraining = seedTime) - timing = 14 дней
// Соответственно, в данный момент в шкафу:
// -5 новых карточек
// -20 карточек на изучении
// -5 изученных карточек
// Все эти карточки должны иметь состояние train, поскольку тест будет запущен после запуска seed
// let hasTestFailed = false;

// beforeEach(() => {
//   if (hasTestFailed) {
//     throw new Error('Previous test failed, skipping...');
//   }
// });

// afterEach(() => {
//   if (expect.getState().currentTestName.failed) {
//     hasTestFailed = true;
//   }
// });

// export function calculateNextTraining(timing: TimingBlock, now: Date) {
//   let nextTraining = now;
//   // Добавляем интервалы из TimingBlock
//   nextTraining = addMinutes(nextTraining, timing.minutes);
//   nextTraining = addHours(nextTraining, timing.hours);
//   nextTraining = addDays(nextTraining, timing.days);
//   nextTraining = addWeeks(nextTraining, timing.weeks);
//   nextTraining = addMonths(nextTraining, timing.months);

//   return nextTraining;
// }
// it('should correctly update new cards after training responses', async () => {
// 	// Получение новых карточек для тренировки
// 	const trainingCardsResponse = await request(app_url_full)
// 		.get(`/cards/training/all/new`)
// 		.auth(userToken, { type: 'bearer' });

// 	const trainingCards = trainingCardsResponse.body;
// 	const trainingCardIds = trainingCards.map(card => card.id);

// 	// Формируем ответы пользователя на тренировке
// 	const trainingResponses = trainingCards.map((card, index) => {
// 		let answer;
// 		if (index % 3 === 0) answer = 'bad';
// 		else if (index % 3 === 1) answer = 'middle';
// 		else answer = 'good';
// 		return { ...card, answer };
// 	});

// 	// ПРОДОЛЖИ ПИСАТЬ ТЕСТ
// }
