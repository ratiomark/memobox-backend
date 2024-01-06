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
    let isSeedInInitialState = true;
    let sortedBoxesIds;
    const titleFirstTest = 'Test shelf';
    const titleSecondTest = 'Test shelf';
    // const dropCards = async () => {
    //   await request(app_url_full)
    //     .post('/cards/drop')
    //     .auth(userToken, { type: 'bearer' });
    // };

    // afterAll(async () => {
    //   await dropCards();
    // });

    beforeAll(async () => {
      // Получение токена пользователя
      const loginResponse = await request(app_url_full)
        .post('/auth/email/login')
        .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

      userToken = loginResponse.body.token;

      // Получение данных о полках и коробках
      const shelvesResponse = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      // await dropCards();
      shelvesData = shelvesResponse.body.shelves;
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
        // shelfId = shelves[0].id;
        sortedBoxesIds = shelves[0].boxesData.map((box) => box.id);
        // newCardsBoxId = sortedBoxesIds[0];
      } catch (error) {
        isSeedInInitialState = false;
        throw new Error(error);
      }
    });

    it('should create new shelf', async () => {
      const response = await request(app_url_full)
        .post('/shelves')
        .send({ title: titleFirstTest })
        .auth(userToken, { type: 'bearer' });

      const {
        index,
        title: titleResponse,
        data,
        isCollapsed,
        boxesData,
      } = response.body;
      expect(response.status).toBe(201);
      expect(boxesData).toBeInstanceOf(Array);
      expect(index).toBe(0);
      expect(isCollapsed).toBe(true);
      expect(titleResponse).toEqual(titleFirstTest);
      expect(data).toBeInstanceOf(Object);
      expect(data).toEqual(
        expect.objectContaining({ wait: 0, all: 0, train: 0 }),
      );
    });

    it('should return cupboard updated', async () => {
      const response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves, commonShelf } = response.body;
      expect(response.status).toBe(200);
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(2);
      expect(shelves[0]).toBeInstanceOf(Object);
      expect(shelves[0].boxesData).toBeInstanceOf(Array);
      expect(shelves[0].title).toEqual(titleFirstTest);
      expect(shelves[0].index).toBe(0);
    });

    it('should create new shelf', async () => {
      const response = await request(app_url_full)
        .post('/shelves')
        .send({ title: titleFirstTest })
        .auth(userToken, { type: 'bearer' });

      const {
        index,
        title: titleResponse,
        data,
        isCollapsed,
        boxesData,
      } = response.body;
      expect(response.status).toBe(201);
      expect(boxesData).toBeInstanceOf(Array);
      expect(index).toBe(0);
      expect(isCollapsed).toBe(true);
      expect(titleResponse).toEqual(titleFirstTest);
      expect(data).toBeInstanceOf(Object);
      expect(data).toEqual(
        expect.objectContaining({ wait: 0, all: 0, train: 0 }),
      );
    });
  });
};
