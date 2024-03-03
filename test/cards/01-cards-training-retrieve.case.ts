import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';
import { getFullUrl } from 'test/utils/helpers/getFullUrl';
import { validateInitialCupboardState } from 'test/utils/helpers/validateInitialCupboardState';
import { response } from 'express';
import { restoreDb } from 'test/utils/helpers/restoreDb';
import { loginAndGetToken } from 'test/utils/helpers/loginAndGetToken';
import { createTestUtils } from 'test/utils/utils';
import { TestUtils } from 'test/utils/utils copy';

export default () => {
  describe('Test cards training receiving', () => {
    let app_url_full;
    let userToken;
    let restoreDb;
    let isSeedInInitialState = true;
    let initialShelfId;
    let sortedBoxesIds;
    let shelvesData;
    let newCardsBoxId;

    beforeAll(async () => {
      const utils = await createTestUtils();
      app_url_full = utils.app_url_full;
      userToken = utils.userToken;
      initialShelfId = utils.initialShelfId;
      restoreDb = utils.restoreDb;
      initialShelfId = utils.initialShelfId;
      sortedBoxesIds = utils.sortedBoxesIds;
      await restoreDb();

      // Получение данных о полках и коробках
      const shelvesResponse = await request(app_url_full)
        .get('/aggregate/view')
        .auth(userToken, { type: 'bearer' });

      shelvesData = shelvesResponse.body.shelvesAndBoxesData;
    });

    afterAll(async () => {
      await restoreDb();
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
        newCardsBoxId = sortedBoxesIds[0];
      } catch (error) {
        isSeedInInitialState = false; // Обновляем состояние в случае ошибки
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
        expect(card.shelfId).toBe(initialShelfId);
        expect(card.boxId).toBe(newCardsBoxId);
        expect(card.specialType).toBe('new');
        expect(card.state).toBe('train');
        expect(card.nextTraining).toBe(null);
      });
    });

    it('should retrieve [all new cards] from specific shelf', async () => {
      const boxWithNewCards = shelvesData[initialShelfId].boxesItems[0];
      expect(boxWithNewCards.index).toBe(0);
      expect(boxWithNewCards.id).toBe(newCardsBoxId);

      // Получение карточек для тренировки
      const response = await request(app_url_full)
        .get(`/cards/training/${initialShelfId}/${newCardsBoxId}`)
        .auth(userToken, { type: 'bearer' });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(5);
      response.body.forEach((card) => {
        expect(card.shelfId).toBe(initialShelfId);
        expect(card.boxId).toBe(newCardsBoxId);
        expect(card.state).toBe('train');
        expect(card.nextTraining).toBe(null);
      });
    });
    it('should retrieve [all training cards] from the entire shelf', async () => {
      // Получение всех карточек для тренировки
      const response = await request(app_url_full)
        .get(`/cards/training/${initialShelfId}/all`)
        .auth(userToken, { type: 'bearer' });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(30);
      response.body.forEach((card) => {
        expect(card.shelfId).toBe(initialShelfId);
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
        .get(`/cards/training/${initialShelfId}/all`)
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
        expect(card.shelfId).toBe(initialShelfId);
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
        expect(card.shelfId).toBe(initialShelfId);
        expect(card.boxId).not.toBe(newCardsBoxId);
        expect(card.specialType).not.toBe('new');
        expect(card.state).toBe('train');
        expect(card.nextTraining).not.toBe(null);
        expect(new Date(card.nextTraining).toString()).not.toBe('Invalid Date');
      });
    });
  });
};

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
