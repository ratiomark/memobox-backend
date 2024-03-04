import { AnswerType } from '@/common/types/frontend/types';
import request from 'supertest';
import { getFullUrl } from './helpers/getFullUrl';
import { loginAndGetToken } from './helpers/loginAndGetToken';

export const createTestUtils: (token?: string) => Promise<{
  getCardsByBoxIndex: (boxIndex: any) => Promise<any>;
  getTrainingCardsByBoxIndex: (boxIndex: any) => Promise<any>;
  getServerTime: () => Promise<any>;
  createTrainingResponses: (trainingCards: any, answer: AnswerType) => any[];
  sendTrainingResponses: (trainingResponses: any[]) => Promise<any>;
  checkUpdatedCards: (
    updatedCards: any[],
    serverTime: Date,
    timeFunction: (date: Date | number, amount: number) => Date,
    timeValue: number,
    state: 'wait' | 'train',
  ) => void;
  dropCards: () => Promise<any>;
  restoreDb: () => Promise<any>;
  userToken: string;
  initialShelfId: string;
  sortedBoxesIds: string[];
  app_url_full: string;
}> = async (token?: string) => {
  const userToken = token ? token : await loginAndGetToken();
  const app_url_full = getFullUrl();
  let initialShelfId;
  let sortedBoxesIds;

  try {
    const response = await request(app_url_full)
      .get('/aggregate/cupboard')
      .auth(userToken, { type: 'bearer' });
    const { shelves, commonShelf } = response.body;
    initialShelfId = shelves[0].id;
    sortedBoxesIds = shelves[0].boxesData.map((box) => box.id);
  } catch (error) {
    console.log(error);
  }

  const getCardsByBoxIndex = async (boxIndex) => {
    const cardsResponse = await request(app_url_full)
      .get(
        `/cards/test/get-by-shelfId-and-boxId/${initialShelfId}/${sortedBoxesIds[boxIndex]}`,
      )
      .auth(userToken, { type: 'bearer' });
    return cardsResponse.body;
  };

  const getTrainingCardsByBoxIndex = async (boxIndex) => {
    const cardsResponse = await request(app_url_full)
      .get(`/cards/training/${initialShelfId}/${sortedBoxesIds[boxIndex]}`)
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
    return await request(app_url_full)
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
  const restoreDb = async () => {
    await request(app_url_full)
      .post('/cards/drop')
      .auth(userToken, { type: 'bearer' });
  };

  // afterAll(async () => {
  //   await dropCards();
  // });

  // beforeAll(async () => {
  //   userToken = await loginAndGetToken();
  //   await restoreDb(userToken);
  // });

  // beforeEach(() => {
  //   if (!isSeedInInitialState) {
  //     throw new Error('Seed test failed, skipping...');
  //   }
  // });

  return {
    getCardsByBoxIndex,
    getTrainingCardsByBoxIndex,
    getServerTime,
    createTrainingResponses,
    sendTrainingResponses,
    checkUpdatedCards,
    dropCards,
    userToken,
    initialShelfId,
    sortedBoxesIds,
    restoreDb,
    app_url_full,
  };
};
