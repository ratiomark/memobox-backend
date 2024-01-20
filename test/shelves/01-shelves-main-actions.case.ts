import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';
import { generateRandomString } from 'test/utils/getRandomString';

export default () => {
  describe('Test shelf main actions', () => {
    const app = APP_URL;
    const app_url_full = app + API_PREFIX;
    let userToken;
    let shelvesData;
    let isSeedInInitialState = true;
    let sortedBoxesIds;
    let initialShelfTitle;
    const titleFirstTest = generateRandomString();
    const titleSecondTest = generateRandomString();
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

      await request(app_url_full)
        .post('/aggregate/restore-db')
        .auth(userToken, { type: 'bearer' });
      // Получение данных о полках и коробках
      const cupboardResponse = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      // await dropCards();
      shelvesData = cupboardResponse.body.shelves;
      initialShelfTitle = cupboardResponse.body.shelves[0].title;
    });

    afterAll(async () => {});

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

    it(`should create new shelf [${titleFirstTest}]`, async () => {
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

    it(`should create new shelf [${titleSecondTest}]`, async () => {
      const response = await request(app_url_full)
        .post('/shelves')
        .send({ title: titleSecondTest })
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
      expect(titleResponse).toEqual(titleSecondTest);
      expect(data).toBeInstanceOf(Object);
      expect(data).toEqual(
        expect.objectContaining({ wait: 0, all: 0, train: 0 }),
      );

      const cupboardResponse = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves } = cupboardResponse.body;
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(3);
      expect(shelves[0].index).toBe(0);
      expect(shelves[1].index).toBe(1);
      expect(shelves[2].index).toBe(2);
      expect(shelves[0].title).toEqual(titleSecondTest);
      expect(shelves[1].title).toEqual(titleFirstTest);
      expect(shelves[2].title).toEqual(initialShelfTitle);
    });

    it('should delete shelf with [index 1]', async () => {
      const cupboardResponse = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });

      shelvesData = cupboardResponse.body.shelves;
      const shelfIds = shelvesData.map((shelf) => shelf.id);
      const shelfIndexToUse = 1;

      const response = await request(app_url_full)
        .delete(`/shelves/${shelfIds[shelfIndexToUse]}`)
        .send({ index: shelfIndexToUse })
        .auth(userToken, { type: 'bearer' });

      expect(response.status).toBe(200);

      const cupboardResponseAfterDeletion = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });

      const { shelves } = cupboardResponseAfterDeletion.body;
      expect(response.status).toBe(200);
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(2);
      expect(shelves[0].index).toBe(0);
      expect(shelves[1].index).toBe(1);
      expect(shelves[0].title).toEqual(titleSecondTest);
      expect(shelves[1].title).toEqual(initialShelfTitle);
    });

    it('should delete shelf with [index 0]', async () => {
      const cupboardResponse = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      // await dropCards();
      shelvesData = cupboardResponse.body.shelves;
      const shelfIds = shelvesData.map((shelf) => shelf.id);
      const shelfIndexToUse = 0;

      const response = await request(app_url_full)
        .delete(`/shelves/${shelfIds[shelfIndexToUse]}`)
        .send({ index: shelfIndexToUse })
        .auth(userToken, { type: 'bearer' });

      expect(response.status).toBe(200);

      const cupboardResponseAfterDeletion = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });

      const { shelves } = cupboardResponseAfterDeletion.body;
      expect(response.status).toBe(200);
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(1);
      expect(shelves[0].index).toBe(0);
      expect(shelves[0].title).toEqual(initialShelfTitle);
    });

    it('[clearing] should validate initial cupboard state', async () => {
      const loginResponse = await request(app_url_full)
        .post('/auth/email/login')
        .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

      userToken = loginResponse.body.token;

      await request(app_url_full)
        .post('/aggregate/restore-db')
        .auth(userToken, { type: 'bearer' });

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
      expect(commonShelf).toEqual(
        expect.objectContaining(commonShelfInitialSeedState),
      );
    });
  });
};
