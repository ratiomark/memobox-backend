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
import { validateInitialCupboardState } from 'test/utils/helpers/validateInitialCupboardState';
import { restoreDb } from 'test/utils/helpers/restoreDb';
import { loginAndGetToken } from 'test/utils/helpers/loginAndGetToken';

export default () => {
  describe('Test shelf update order', () => {
    const app_url_full = getFullUrl();
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
        const { shelfId, sortedBoxes } =
          await validateInitialCupboardState(userToken);
        sortedBoxesIds = sortedBoxes;
      } catch (error) {
        isSeedInInitialState = false; // Обновляем состояние в случае ошибки
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
    });

    it('should return cupboard updated', async () => {
      const response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves } = response.body;
      expect(response.status).toBe(200);
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(3);
      expect(shelves[0]).toBeInstanceOf(Object);
      expect(shelves[0].boxesData).toBeInstanceOf(Array);
      expect(shelves[0].title).toEqual(titleSecondTest);
      expect(shelves[1].title).toEqual(titleFirstTest);
      expect(shelves[0].index).toBe(0);
      expect(shelves[1].index).toBe(1);
      expect(shelves[2].index).toBe(2);
    });

    it('should move the first shelf to the end', async () => {
      // Получаем текущий порядок полок
      let response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves } = response.body;

      // Создаем новый порядок, перемещая первую полку в конец
      const newOrder = [...shelves.slice(1), shelves[0]].map(
        (shelf, index) => ({
          id: shelf.id,
          index: index,
        }),
      );

      // Отправляем обновленный порядок
      await request(app_url_full)
        .patch('/shelves/update-order')
        .send(newOrder)
        .auth(userToken, { type: 'bearer' });

      // Проверяем, обновился ли порядок полок
      response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const shelvesUpdate = response.body.shelves;

      // Создаем новый порядок, перемещая первую полку в конец
      const orderUpdated = shelvesUpdate.map((shelf, index) => ({
        id: shelf.id,
        index: index,
      }));

      expect(newOrder).toEqual(orderUpdated);
    });

    it('should reverse the order of shelves', async () => {
      // Получаем текущий порядок полок
      let response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves } = response.body;

      // Создаем новый порядок, перемещая первую полку в конец
      const newOrder = shelves
        .slice()
        .reverse()
        .map((shelf, index) => ({
          id: shelf.id,
          index: index,
        }));

      // Отправляем обновленный порядок
      await request(app_url_full)
        .patch('/shelves/update-order')
        .send(newOrder)
        .auth(userToken, { type: 'bearer' });

      // Проверяем, обновился ли порядок полок
      response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const shelvesUpdate = response.body.shelves;

      // Создаем новый порядок, перемещая первую полку в конец
      const orderUpdated = shelvesUpdate.map((shelf, index) => ({
        id: shelf.id,
        index: index,
      }));

      expect(newOrder).toEqual(orderUpdated);
    });

    it('should swap the first and second shelves', async () => {
      // Получаем текущий порядок полок
      let response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves } = response.body;

      // Создаем новый порядок, перемещая первую полку в конец
      const newOrder = [
        { id: shelves[1].id, index: 0 }, // Поменять местами первую и вторую полки
        { id: shelves[0].id, index: 1 },
        ...shelves.slice(2).map((shelf, index) => ({
          // Оставить остальные полки без изменений
          id: shelf.id,
          index: index + 2,
        })),
      ];

      // Отправляем обновленный порядок
      await request(app_url_full)
        .patch('/shelves/update-order')
        .send(newOrder)
        .auth(userToken, { type: 'bearer' });

      // Проверяем, обновился ли порядок полок
      response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });

      const shelvesUpdate = response.body.shelves;

      // Создаем новый порядок, перемещая первую полку в конец
      const orderUpdated = shelvesUpdate.map((shelf, index) => ({
        id: shelf.id,
        index: index,
      }));

      expect(newOrder).toEqual(orderUpdated);
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
  });
};
