import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';
import { sleep } from '@/utils/common/sleep';
import { generateRandomString } from 'test/utils/getRandomString';
import { getFullUrl } from 'test/utils/helpers/getFullUrl';
import { restoreDb } from 'test/utils/helpers/restoreDb';
import { loginAndGetToken } from 'test/utils/helpers/loginAndGetToken';
// @Patch('restore/:id')
export default () => {
  describe('Test shelf delete/restore', () => {
    const app_url_full = getFullUrl();
    let userToken;
    let shelvesData;
    let isSeedInInitialState = true;
    let sortedBoxesIds;
    let initialShelfTitle;
    const titleFirstTest = generateRandomString();

    beforeAll(async () => {
      // Получение токена пользователя
      const loginResponse = await request(app_url_full)
        .post('/auth/email/login')
        .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

      userToken = await loginAndGetToken();

      await restoreDb(userToken);
      // Получение данных о полках и коробках
      await sleep(3);
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
        expect(commonShelf).toEqual(
          expect.objectContaining(commonShelfInitialSeedState),
        );
        sortedBoxesIds = shelves[0].boxesData.map((box) => box.id);
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

    it(`should remove shelf [${titleFirstTest}]`, async () => {
      let response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const shelfId = response.body.shelves[0].id;

      response = await request(app_url_full)
        .delete(`/shelves/${shelfId}`)
        .send({ index: 0 })
        .auth(userToken, { type: 'bearer' });

      response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves, commonShelf } = response.body;
      expect(response.status).toBe(200);
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(1);
      response = await request(app_url_full)
        .get('/aggregate/trash')
        .auth(userToken, { type: 'bearer' });

      expect(response.body.shelves[0].title).toEqual(titleFirstTest);
      expect(response.body.shelves[0].isDeleted).toEqual(true);
    });

    it(`should restore shelf [${titleFirstTest}]`, async () => {
      let response = await request(app_url_full)
        .get('/aggregate/trash')
        .auth(userToken, { type: 'bearer' });
      const shelfId = response.body.shelves[0].id;

      response = await request(app_url_full)
        .patch(`/shelves/restore/${shelfId}`)
        .auth(userToken, { type: 'bearer' });

      response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });

      const { shelves, commonShelf } = response.body;
      expect(response.status).toBe(200);
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(2);
      expect(shelves[0].title).toEqual(titleFirstTest);
      expect(shelves[0].isDeleted).toBe(false);
      expect(shelves[0].index).toEqual(0);
      expect(shelves[1].index).toEqual(1);
    });

    it('[clearing] should validate initial cupboard state', async () => {
      const loginResponse = await request(app_url_full)
        .post('/auth/email/login')
        .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

      userToken = await loginAndGetToken();

      await restoreDb(userToken);

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

    // it('should correctly update shelves order', async () => {
    //   const response = await request(app_url_full)
    //     .get('/aggregate/cupboard')
    //     .auth(userToken, { type: 'bearer' });
    //   const { shelves, commonShelf } = response.body;
    //   const shelvesDndRepresentation = shelves.map((shelf) => ({
    //     id: shelf.id,
    //     index: shelf.index,
    //   }));

    // 	// это текущий порядок полок. Используй его для создание нового порядка, отправь, потом проверь результаты aggregate/cupboard, соответвуют ли они новому порядку

    // });
  });
};
