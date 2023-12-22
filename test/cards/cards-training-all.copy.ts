import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { addDays, addHours, addMinutes, addMonths, addWeeks } from 'date-fns';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';
import { AnswerType } from '@/common/types/frontend/types';
import { get } from 'http';

describe('Test cards training responses', () => {
  const app = APP_URL;
  const app_url_full = app + API_PREFIX;
  let userToken;
  let userRefreshToken;
  let shelvesData;
  let shelfId;
  let newCardsBoxId;
  let boxWithIndex1boxId;
  let isSeedInInitialState = true;
  let sortedBoxesIds;

  const getCardsByBoxIndex = async (boxIndex) => {
    const cardsResponse = await request(app_url_full)
      .get(
        `/cards/get-by-shelfId-and-boxId/${shelfId}/${sortedBoxesIds[boxIndex]}`,
      )
      .auth(userToken, { type: 'bearer' });
    return cardsResponse.body;
  };

  const getTrainingCardsByBoxIndex = async (boxIndex) => {
    const cardsResponse = await request(app_url_full)
      .get(`/cards/training/${shelfId}/${sortedBoxesIds[boxIndex]}`)
      .auth(userToken, { type: 'bearer' });
    return cardsResponse.body;
  };

  const getServerTime = async () => {
    const serverTimeResponse = await request(app_url_full)
      .get('/aggregate/server-time')
      .auth(userToken, { type: 'bearer' });
    return new Date(serverTimeResponse.body);
  };

  const createTrainingResponses = (trainingCards, answer: AnswerType) => {
    return trainingCards.map((card, index) => ({ ...card, answer }));
  };

  const sendTrainingResponses = async (trainingResponses) => {
    await request(app_url_full)
      .post('/cards/training/answers')
      .send({ responses: trainingResponses })
      .auth(userToken, { type: 'bearer' });
  };

  const checkUpdatedCards = (
    updatedCards: any[],
    serverTime: Date,
    timeFunction: (date: Date | number, amount: number) => Date,
    timeValue: number,
    state: 'wait' | 'train',
  ) => {
    updatedCards.forEach((updatedCard) => {
      expect(updatedCard.state).toBe(state ?? 'wait');

      // Проверка nextTraining с допустимым отклонением в 30 секунд
      const expectedNextTraining = timeFunction(serverTime, timeValue);
      const nextTraining = new Date(updatedCard.nextTraining);
      const timeDifference = Math.abs(
        nextTraining.getTime() - expectedNextTraining.getTime(),
      );
      expect(timeDifference).toBeLessThanOrEqual(30000);
    });
  };

  const dropCards = async () => {
    await request(app_url_full)
      .post('/cards/drop')
      .auth(userToken, { type: 'bearer' });
  };

  afterAll(async () => {
    await dropCards();
  });

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
    await dropCards();
    shelvesData = shelvesResponse.body.shelvesAndBoxesData;
    // shelfId = Object.keys(shelvesData)[0];
    // newCardsBoxId = shelvesData[shelfId].boxesItems.find(
    //   (box) => box.index === 0,
    // ).id;
  });

  beforeEach(() => {
    if (!isSeedInInitialState) {
      throw new Error('Seed test failed, skipping...');
    }
  });

  it('should validate initial cupboard state', async () => {
    try {
      const response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves, commonShelf } = response.body;
      expect(response.status).toBe(200);
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(1);
      expect(shelves[0]).toBeInstanceOf(Object);
      expect(shelves[0].boxesData).toBeInstanceOf(Array);
      expect(shelves[0].boxesData).toHaveLength(6);
      // В данном примере, если commonShelf содержит структуру, идентичную commonShelfInitialSeedState (или более широкую, но включающую в себя все ключи и значения из commonShelfInitialSeedState), тест будет успешно пройден.
      // Обратите внимание, что если commonShelf содержит дополнительные ключи и значения, не указанные в commonShelfInitialSeedState, тест всё равно будет успешным. Если вам нужно точное соответствие без дополнительных ключей, используйте expect(commonShelf).toEqual(commonShelfInitialSeedState);.
      expect(commonShelf).toEqual(
        expect.objectContaining(commonShelfInitialSeedState),
      );
      shelfId = shelves[0].id;
      sortedBoxesIds = shelves[0].boxesData.map((box) => box.id);
      newCardsBoxId = sortedBoxesIds[0];
      boxWithIndex1boxId = sortedBoxesIds[1];
    } catch (error) {
      isSeedInInitialState = false;
      throw new Error(error);
    }
  });
  it('should retrieve [all new cards] from cupboard', async () => {
    const response = await request(app_url_full)
      .get(`/cards/training/all/new`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(5);
    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.boxId).toBe(newCardsBoxId);
      expect(card.specialType).toBe('new');
      expect(card.state).toBe('train');
      expect(card.nextTraining).toBe(null);
    });
  });

  it('should retrieve [all new cards] from specific shelf', async () => {
    const boxWithNewCards = shelvesData[shelfId].boxesItems[0];
    expect(boxWithNewCards.index).toBe(0);
    expect(boxWithNewCards.id).toBe(newCardsBoxId);

    // Получение карточек для тренировки
    const response = await request(app_url_full)
      .get(`/cards/training/${shelfId}/${newCardsBoxId}`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(5);
    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.boxId).toBe(newCardsBoxId);
      expect(card.state).toBe('train');
      expect(card.nextTraining).toBe(null);
    });
  });
  it('should retrieve [all training cards] from the entire shelf', async () => {
    // Получение всех карточек для тренировки
    const response = await request(app_url_full)
      .get(`/cards/training/${shelfId}/all`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(30);
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
  it('should retrieve [all learning cards] from cupboard', async () => {
    const response = await request(app_url_full)
      .get(`/cards/training/all/learning`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(20);
    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.boxId).not.toBe(newCardsBoxId);
      expect(card.specialType).not.toBe('new');
      expect(card.state).toBe('train');
      expect(card.nextTraining).not.toBe(null);
      expect(new Date(card.nextTraining).toString()).not.toBe('Invalid Date');
    });
  });
  it('should retrieve [all learnt cards] from cupboard', async () => {
    const response = await request(app_url_full)
      .get(`/cards/training/all/learnt`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(5);
    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.boxId).not.toBe(newCardsBoxId);
      expect(card.specialType).not.toBe('new');
      expect(card.state).toBe('train');
      expect(card.nextTraining).not.toBe(null);
      expect(new Date(card.nextTraining).toString()).not.toBe('Invalid Date');
    });
  });
  //
  // ============= responses tests ==================
  //
  it('should correctly update [new cards] after training responses', async () => {
    // Получение новых карточек для тренировки
    await dropCards();

    const trainingCardsResponse = await request(app_url_full)
      .get(`/cards/training/all/new`)
      .auth(userToken, { type: 'bearer' });

    const trainingCards = trainingCardsResponse.body;
    const trainingCardIds = trainingCards.map((card) => card.id);

    const trainingResponses = trainingCards.map((card, index) => {
      let answer;
      if (index % 3 === 0) answer = 'bad';
      else if (index % 3 === 1) answer = 'middle';
      else answer = 'good';
      return { ...card, answer };
    });

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    // Проверка обновленных карточек
    const cardsFromNextBox = await getCardsByBoxIndex(1);
    const updatedCards = cardsFromNextBox.filter((card) =>
      trainingCardIds.includes(card.id),
    );

    checkUpdatedCards(updatedCards, serverTime, addMinutes, 5, 'wait');
    // updatedCards.forEach((updatedCard) => {
    //   expect(updatedCard.state).toBe('wait');
    //   expect(updatedCard.boxId).toBe(boxWithIndex1boxId);

    //   // Проверка nextTraining с допустимым отклонением в 30 секунд
    //   const expectedNextTraining = addMinutes(serverTime, 5);
    //   const nextTraining = new Date(updatedCard.nextTraining);
    //   const timeDifference = Math.abs(
    //     nextTraining.getTime() - expectedNextTraining.getTime(),
    //   );
    //   expect(timeDifference).toBeLessThanOrEqual(30000);
    // });
  });
  it('should correctly update cards [in box 1 bad answers] after training responses', async () => {
    await dropCards();
    const answer = 'bad';

    const trainingCards = await getTrainingCardsByBoxIndex(1);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    // Проверка что ничего не попало в новые карточки
    const cardsFromNewBox = await getCardsByBoxIndex(0);

    expect(cardsFromNewBox).toHaveLength(5);

    cardsFromNewBox.forEach((updatedCard) => {
      expect(updatedCard.nextTraining).toBe(null);
    });

    // Проверка что все карточки остались в коробке 1
    const updatedCards = await getCardsByBoxIndex(1);

    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addMinutes, 5, 'wait');
    updatedCards.forEach((updatedCard) => {
      expect(updatedCard.state).toBe('wait');

      // Проверка nextTraining с допустимым отклонением в 30 секунд
      const expectedNextTraining = addMinutes(serverTime, 60);
      const nextTraining = new Date(updatedCard.nextTraining);
      const timeDifference = Math.abs(
        nextTraining.getTime() - expectedNextTraining.getTime(),
      );
      expect(timeDifference).not.toBeLessThanOrEqual(30000);
    });
  });
  it('should correctly update cards [in box 1 middle answers] after training responses', async () => {
    await dropCards();
    const answer = 'middle';

    const trainingCards = await getTrainingCardsByBoxIndex(1);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    // Проверка что ничего не попало в новые карточки
    const cardsFromNewBox = await getCardsByBoxIndex(0);
    expect(cardsFromNewBox).toHaveLength(5);

    cardsFromNewBox.forEach((updatedCard) => {
      expect(updatedCard.nextTraining).toBe(null);
    });

    // Проверка что все карточки остались в коробке 1
    const updatedCards = await getCardsByBoxIndex(1);
    expect(updatedCards).toHaveLength(5);

    checkUpdatedCards(updatedCards, serverTime, addMinutes, 5, 'wait');

    // updatedCards.forEach((updatedCard) => {
    //   expect(updatedCard.state).toBe('wait');

    //   // Проверка nextTraining с допустимым отклонением в 30 секунд
    //   const expectedNextTraining = addMinutes(serverTime, 5);
    //   const nextTraining = new Date(updatedCard.nextTraining);
    //   const timeDifference = Math.abs(
    //     nextTraining.getTime() - expectedNextTraining.getTime(),
    //   );
    //   expect(timeDifference).toBeLessThanOrEqual(30000);
    // });
  });
  2;
  it('should correctly update cards [in box 1 good answers] after training responses', async () => {
    await dropCards();
    const answer = 'good';

    const trainingCards = await getTrainingCardsByBoxIndex(1);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);
    // 7
    //
    // Проверка что все карточки перешли в коробку 2
    const cardsFromBox2 = await getCardsByBoxIndex(2);
    expect(cardsFromBox2).toHaveLength(10);

    const trainCards = cardsFromBox2.filter(
      (card) =>
        card.state === 'train' && new Date(card.nextTraining) < serverTime,
    );

    // Фильтрация карточек, которые еще не готовы к тренировке
    const waitCards = cardsFromBox2.filter(
      (card) =>
        card.state === 'wait' && new Date(card.nextTraining) > serverTime,
    );

    // Проверка количества карточек в каждой категории
    expect(trainCards.length).toBe(5);
    expect(waitCards.length).toBe(5);

    trainCards.forEach((card) => {
      expect(card.state).toBe('train');
    });

    // // Проверка что карточки не остались в коробке 1
    const cardsFromBox1 = await getCardsByBoxIndex(1);
    expect(cardsFromBox1).toHaveLength(0);
    checkUpdatedCards(waitCards, serverTime, addHours, 8, 'wait');
    // waitCards.forEach((updatedCard) => {
    //   expect(updatedCard.state).toBe('wait');

    //   // Проверка nextTraining с допустимым отклонением в 30 секунд
    //   const expectedNextTraining = addHours(serverTime, 8);
    //   const nextTraining = new Date(updatedCard.nextTraining);
    //   const timeDifference = Math.abs(
    //     nextTraining.getTime() - expectedNextTraining.getTime(),
    //   );
    //   expect(timeDifference).toBeLessThanOrEqual(30000);
    // });
  });
  it('should correctly update cards [in box 2 bad answers] after training responses', async () => {
    await dropCards();
    const answer = 'bad';

    const trainingCards = await getTrainingCardsByBoxIndex(2);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    // Проверка что ничего не осталось в коробке 2
    const cardsFromBox2 = await getCardsByBoxIndex(2);
    expect(cardsFromBox2).toHaveLength(0);

    const cardsFromBox1 = await getCardsByBoxIndex(1);
    expect(cardsFromBox1).toHaveLength(10);

    const trainCards = cardsFromBox1.filter(
      (card) =>
        card.state === 'train' && new Date(card.nextTraining) < serverTime,
    );

    // Фильтрация карточек, которые еще не готовы к тренировке
    const updatedCards = cardsFromBox1.filter(
      (card) =>
        card.state === 'wait' && new Date(card.nextTraining) > serverTime,
    );

    // Проверка количества карточек в каждой категории
    expect(trainCards.length).toBe(5);
    expect(updatedCards.length).toBe(5);

    trainCards.forEach((card) => {
      expect(card.state).toBe('train');
    });
    checkUpdatedCards(updatedCards, serverTime, addMinutes, 5, 'wait');
    // updatedCards.forEach((updatedCard) => {
    //   expect(updatedCard.state).toBe('wait');

    //   // Проверка nextTraining с допустимым отклонением в 30 секунд
    //   const expectedNextTraining = addMinutes(serverTime, 5);
    //   const nextTraining = new Date(updatedCard.nextTraining);
    //   const timeDifference = Math.abs(
    //     nextTraining.getTime() - expectedNextTraining.getTime(),
    //   );
    //   expect(timeDifference).toBeLessThanOrEqual(30000);
    // });
  });
  it('should correctly update cards [in box 2 middle answers] after training responses', async () => {
    await dropCards();
    const answer = 'middle';

    const trainingCards = await getTrainingCardsByBoxIndex(2);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    const updatedCards = await getCardsByBoxIndex(2);
    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addHours, 8, 'wait');
    // updatedCards.forEach((updatedCard) => {
    //   expect(updatedCard.state).toBe('wait');

    //   // Проверка nextTraining с допустимым отклонением в 30 секунд
    //   const expectedNextTraining = addHours(serverTime, 8);
    //   const nextTraining = new Date(updatedCard.nextTraining);
    //   const timeDifference = Math.abs(
    //     nextTraining.getTime() - expectedNextTraining.getTime(),
    //   );
    //   expect(timeDifference).toBeLessThanOrEqual(30000);
    // });
  });
  it('should correctly update cards [in box 2 good answers] after training responses', async () => {
    await dropCards();
    const answer = 'good';

    const trainingCards = await getTrainingCardsByBoxIndex(2);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    const cardsFromBox2 = await getCardsByBoxIndex(2);
    expect(cardsFromBox2).toHaveLength(0);

    const cardsFromBox3 = await getCardsByBoxIndex(3);
    expect(cardsFromBox3).toHaveLength(10);

    const trainCards = cardsFromBox3.filter(
      (card) =>
        card.state === 'train' && new Date(card.nextTraining) < serverTime,
    );
    expect(trainCards).toHaveLength(5);
    // Фильтрация карточек, которые еще не готовы к тренировке
    const updatedCards = cardsFromBox3.filter(
      (card) =>
        card.state === 'wait' && new Date(card.nextTraining) > serverTime,
    );
    expect(trainCards).toHaveLength(5);
    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addDays, 1, 'wait');
  });

  it('should correctly update cards [in box 3 bad answers] after training responses', async () => {
    await dropCards();
    const answer = 'bad';

    const trainingCards = await getTrainingCardsByBoxIndex(3);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    // Проверка что ничего не осталось в коробке 2
    const cardsFromBox3 = await getCardsByBoxIndex(3);
    expect(cardsFromBox3).toHaveLength(0);

    const cardsFromBox2 = await getCardsByBoxIndex(2);
    expect(cardsFromBox2).toHaveLength(10);

    const trainCards = cardsFromBox2.filter(
      (card) =>
        card.state === 'train' && new Date(card.nextTraining) < serverTime,
    );

    // Фильтрация карточек, которые еще не готовы к тренировке
    const updatedCards = cardsFromBox2.filter(
      (card) =>
        card.state === 'wait' && new Date(card.nextTraining) > serverTime,
    );

    // Проверка количества карточек в каждой категории
    expect(trainCards.length).toBe(5);
    expect(updatedCards.length).toBe(5);

    trainCards.forEach((card) => {
      expect(card.state).toBe('train');
    });
    checkUpdatedCards(updatedCards, serverTime, addHours, 8, 'wait');
  });
  it('should correctly update cards [in box 3 middle answers] after training responses', async () => {
    await dropCards();
    const answer = 'middle';

    const trainingCards = await getTrainingCardsByBoxIndex(3);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    const updatedCards = await getCardsByBoxIndex(3);
    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addDays, 1, 'wait');
  });
  it('should correctly update cards [in box 3 good answers] after training responses', async () => {
    await dropCards();
    const answer = 'good';

    const trainingCards = await getTrainingCardsByBoxIndex(3);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    const cardsFromBox3 = await getCardsByBoxIndex(3);
    expect(cardsFromBox3).toHaveLength(0);

    const cardsFromBox4 = await getCardsByBoxIndex(4);
    expect(cardsFromBox4).toHaveLength(10);

    const trainCards = cardsFromBox4.filter(
      (card) =>
        card.state === 'train' && new Date(card.nextTraining) < serverTime,
    );
    expect(trainCards).toHaveLength(5);
    // Фильтрация карточек, которые еще не готовы к тренировке
    const updatedCards = cardsFromBox4.filter(
      (card) =>
        card.state === 'wait' && new Date(card.nextTraining) > serverTime,
    );
    expect(trainCards).toHaveLength(5);
    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addWeeks, 1, 'wait');
  });

  it('should correctly update cards [in box 4 bad answers] after training responses', async () => {
    await dropCards();
    const answer = 'bad';

    const trainingCards = await getTrainingCardsByBoxIndex(4);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    // Проверка что ничего не осталось в коробке 2
    const cardsFromBox4 = await getCardsByBoxIndex(4);
    expect(cardsFromBox4).toHaveLength(0);

    const cardsFromBox3 = await getCardsByBoxIndex(3);
    expect(cardsFromBox3).toHaveLength(10);

    const trainCards = cardsFromBox3.filter(
      (card) =>
        card.state === 'train' && new Date(card.nextTraining) < serverTime,
    );

    // Фильтрация карточек, которые еще не готовы к тренировке
    const updatedCards = cardsFromBox3.filter(
      (card) =>
        card.state === 'wait' && new Date(card.nextTraining) > serverTime,
    );

    // Проверка количества карточек в каждой категории
    expect(trainCards.length).toBe(5);
    expect(updatedCards.length).toBe(5);

    trainCards.forEach((card) => {
      expect(card.state).toBe('train');
    });
    checkUpdatedCards(updatedCards, serverTime, addDays, 1, 'wait');
  });
  it('should correctly update cards [in box 4 middle answers] after training responses', async () => {
    await dropCards();
    const answer = 'middle';

    const trainingCards = await getTrainingCardsByBoxIndex(4);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    const updatedCards = await getCardsByBoxIndex(4);
    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addWeeks, 1, 'wait');
  });
  it('should correctly update cards [in box 4 good answers] after training responses', async () => {
    await dropCards();
    const answer = 'good';

    const trainingCards = await getTrainingCardsByBoxIndex(4);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

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
    checkUpdatedCards(updatedCards, serverTime, addMonths, 1, 'wait');
  });

  it('should correctly update cards [in box 5 bad answers] after training responses', async () => {
    await dropCards();
    const answer = 'bad';

    const trainingCards = await getTrainingCardsByBoxIndex(5);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    // Проверка что ничего не осталось в коробке 2
    const cardsFromBox5 = await getCardsByBoxIndex(5);
    expect(cardsFromBox5).toHaveLength(0);

    const cardsFromBox4 = await getCardsByBoxIndex(4);
    expect(cardsFromBox4).toHaveLength(10);

    const trainCards = cardsFromBox4.filter(
      (card) =>
        card.state === 'train' && new Date(card.nextTraining) < serverTime,
    );

    // Фильтрация карточек, которые еще не готовы к тренировке
    const updatedCards = cardsFromBox4.filter(
      (card) =>
        card.state === 'wait' && new Date(card.nextTraining) > serverTime,
    );

    // Проверка количества карточек в каждой категории
    expect(trainCards.length).toBe(5);
    expect(updatedCards.length).toBe(5);

    trainCards.forEach((card) => {
      expect(card.state).toBe('train');
    });
    checkUpdatedCards(updatedCards, serverTime, addWeeks, 1, 'wait');
  });
  it('should correctly update cards [in box 5 middle answers] after training responses', async () => {
    await dropCards();
    const answer = 'middle';

    const trainingCards = await getTrainingCardsByBoxIndex(5);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    const updatedCards = await getCardsByBoxIndex(5);
    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addMonths, 1, 'wait');
  });
  it('should correctly update cards [in box 5 good answers] after training responses', async () => {
    await dropCards();
    const answer = 'good';

    const trainingCards = await getTrainingCardsByBoxIndex(5);
    expect(trainingCards).toHaveLength(5);

    const trainingResponses = createTrainingResponses(trainingCards, answer);

    const serverTime = await getServerTime();

    await sendTrainingResponses(trainingResponses);

    const updatedCards = await getCardsByBoxIndex(5);
    expect(updatedCards).toHaveLength(5);
    checkUpdatedCards(updatedCards, serverTime, addMonths, 1, 'wait');
  });
});

// коробка 0(новые) - 5 карточек (nextTraining = null)
// коробка 1 - 5 карточек (nextTraining = seedTime) - timing = 5 минут
// коробка 2 - 5 карточек (nextTraining = seedTime) - timing = 8 часов
// коробка 3 - 5 карточек (nextTraining = seedTime) - timing = 1 день
// коробка 4 - 5 карточек (nextTraining = seedTime) - timing = 1 неделя
// коробка 5(изученные) - 5 карточек (nextTraining = seedTime) - timing = 1 месяц

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
// it('should retrieve the same cards for "all/new" and "specificShelf/specificBox(new cards)"', async () => {
//   // Получение новых карточек для всего шкафа
//   const allNewCardsResponse = await request(app_url_full)
//     .get(`/cards/training/all/new`)
//     .auth(userToken, { type: 'bearer' });

//   // Получение новых карточек для конкретной полки и коробки
//   const specificShelfBoxResponse = await request(app_url_full)
//     .get(`/cards/training/${shelfId}/${newCardsBoxId}`)
//     .auth(userToken, { type: 'bearer' });

//   expect(allNewCardsResponse.status).toBe(200);
//   expect(specificShelfBoxResponse.status).toBe(200);
//   expect(allNewCardsResponse.body).toEqual(specificShelfBoxResponse.body);
// });
// it('should correctly update new cards after training responses', async () => {
// 	// Получение новых карточек для тренировки
// 	const trainingCardsResponse = await request(app_url_full)
// 		.get(`/cards/training/all/new`)
// 		.auth(userToken, { type: 'bearer' });

// 	const trainingCards = trainingCardsResponse.body;
// 	const trainingCardIds = trainingCards.map(card => card.id);

// 	const trainingResponses = trainingCards.map((card, index) => {
// 		let answer;
// 		if (index % 3 === 0) answer = 'bad';
// 		else if (index % 3 === 1) answer = 'middle';
// 		else answer = 'good';
// 		return { ...card, answer };
// 	});

// 	// ПРОДОЛЖИ ПИСАТЬ ТЕСТ
// }
