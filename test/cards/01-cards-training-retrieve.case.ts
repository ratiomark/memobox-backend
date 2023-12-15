import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';

export default () => {
  describe('Test cards training receiving', () => {
    const app = APP_URL;
    const app_url_full = app + API_PREFIX;
    let userToken;
    let shelvesData;
    let shelfId;
    let newCardsBoxId;
    let isSeedInInitialState = true;
    let sortedBoxesIds;

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

      // Получение данных о полках и коробках
      const shelvesResponse = await request(app_url_full)
        .get('/aggregate/view')
        .auth(userToken, { type: 'bearer' });
      await dropCards();
      shelvesData = shelvesResponse.body.shelvesAndBoxesData;
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
