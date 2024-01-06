import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';
import { boxes } from 'prisma/mock-data/staticDataFromDb';
// return { box, cards };
export default () => {
  describe('Test box main actions', () => {
    const app = APP_URL;
    const app_url_full = app + API_PREFIX;
    let userToken;
    let shelvesData;
    let shelfId;
    let isSeedInInitialState = true;
    let sortedBoxesIds;
    let initialShelfTitle;
    const initialShelfBoxCountFreeze = 6;
    let updatedShelfBoxCount;
    const titleFirstTest = 'shelf_name_test_1';
    const titleSecondTest = 'shelf_name_test_2';

    beforeAll(async () => {
      // Получение токена пользователя
      const loginResponse = await request(app_url_full)
        .post('/auth/email/login')
        .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

      userToken = loginResponse.body.token;

      // Получение данных о полках и коробках
      const cupboardResponse = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      // await dropCards();
      shelvesData = cupboardResponse.body.shelves;
      initialShelfTitle = cupboardResponse.body.shelves[0].title;
      shelfId = cupboardResponse.body.shelves[0].id;
    });

    beforeEach(() => {
      if (!isSeedInInitialState) {
        throw new Error('Seed test failed, skipping...');
      }
    });

    // afterAll(async () => {
    //   const restoreResponse = await request(app_url_full)
    //     .get(`restore-boxes-deleted-by-shelf-id/${shelfId}`)
    //     .auth(userToken, { type: 'bearer' });
    //   // await dropCards();
    //   // @Post('restore-boxes-deleted-by-shelf-id/:shelfId')
    // });

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
        expect(shelves[0].title).toEqual(initialShelfTitle);
        expect(shelves[0].boxesData).toBeInstanceOf(Array);
        expect(shelves[0].boxesData).toHaveLength(initialShelfBoxCountFreeze);
        expect(commonShelf).toEqual(
          expect.objectContaining(commonShelfInitialSeedState),
        );
        updatedShelfBoxCount = shelves[0].boxesData.length;
        sortedBoxesIds = shelves[0].boxesData.map((box) => box.id);
      } catch (error) {
        isSeedInInitialState = false;
        throw new Error(error);
      }
    });

    it(`should delete box [index 1]`, async () => {
      // добавить тест на удаление коробки с индексом 0, не должен рабоать?
      // @Post('restore-boxes-deleted-by-shelf-id/:shelfId')
      const indexToDelete = 1;
      const response = await request(app_url_full)
        .delete(`/boxes/${sortedBoxesIds[indexToDelete]}`)
        .auth(userToken, { type: 'bearer' });

      const { box } = response.body;
      console.log('XXXXXXXXXX');
      console.log(box);
      expect(response.status).toBe(200);
      expect(box).toBeInstanceOf(Object);
      expect(box.index).toBe(indexToDelete);
      expect(box.isDeleted).toBe(true);
      updatedShelfBoxCount = updatedShelfBoxCount - 1;

      const cupboardResponseAfterDeletion = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves } = cupboardResponseAfterDeletion.body;
      expect(shelves[0].boxesData).toHaveLength(updatedShelfBoxCount);
      shelves[0].boxesData.forEach((box, index) => {
        if (index === 0) {
          expect(box.specialType).toEqual('new');
        } else if (index === updatedShelfBoxCount - 1) {
          expect(box.specialType).toEqual('learnt');
        } else {
          expect(box.specialType).toEqual('none');
        }
        expect(box.index).toEqual(index);
      });
    });
    it(`should delete box [index 2]`, async () => {
      // добавить тест на удаление коробки с индексом 0, не должен рабоать?
      // @Post('restore-boxes-deleted-by-shelf-id/:shelfId')
      const indexToDelete = 2;
      const response = await request(app_url_full)
        .delete(`/boxes/${sortedBoxesIds[indexToDelete]}`)
        .auth(userToken, { type: 'bearer' });

      const { box } = response.body;
      expect(response.status).toBe(200);
      expect(box).toBeInstanceOf(Object);
      expect(box.index).toBe(indexToDelete);
      expect(box.isDeleted).toBe(true);
      updatedShelfBoxCount = updatedShelfBoxCount - 1;

      const cupboardResponseAfterDeletion = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves } = cupboardResponseAfterDeletion.body;
      expect(shelves[0].boxesData).toHaveLength(updatedShelfBoxCount);
      shelves[0].boxesData.forEach((box, index) => {
        if (index === 0) {
          expect(box.specialType).toEqual('new');
        } else if (index === updatedShelfBoxCount - 1) {
          expect(box.specialType).toEqual('learnt');
        } else {
          expect(box.specialType).toEqual('none');
        }
        expect(box.index).toEqual(index);
      });
    });

    it('should validate cupboard state after restoring boxes and cards', async () => {
      const restoreResponse = await request(app_url_full)
        .post(`boxes/restore-boxes-deleted-by-shelf-id/${shelfId}`)
        .auth(userToken, { type: 'bearer' });

      const response = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });
      const { shelves, commonShelf } = response.body;
      expect(response.status).toBe(200);
      expect(shelves).toBeInstanceOf(Array);
      expect(shelves).toHaveLength(1);
      expect(shelves[0]).toBeInstanceOf(Object);
      expect(shelves[0].title).toEqual(initialShelfTitle);
      expect(shelves[0].boxesData).toBeInstanceOf(Array);
      expect(shelves[0].boxesData).toHaveLength(initialShelfBoxCountFreeze);
      expect(commonShelf).toEqual(
        expect.objectContaining(commonShelfInitialSeedState),
      );
    });
    // afterAll(async () => {
    //   const restoreResponse = await request(app_url_full)
    //     .get(`restore-boxes-deleted-by-shelf-id/${shelfId}`)
    //     .auth(userToken, { type: 'bearer' });
    //   // await dropCards();
    //   // @Post('restore-boxes-deleted-by-shelf-id/:shelfId')
    // });
    // it('should return cupboard updated', async () => {
    //   const response = await request(app_url_full)
    //     .get('/aggregate/cupboard')
    //     .auth(userToken, { type: 'bearer' });
    //   const { shelves, commonShelf } = response.body;
    //   expect(response.status).toBe(200);
    //   expect(shelves).toBeInstanceOf(Array);
    //   expect(shelves).toHaveLength(2);
    //   expect(shelves[0]).toBeInstanceOf(Object);
    //   expect(shelves[0].boxesData).toBeInstanceOf(Array);
    //   expect(shelves[0].title).toEqual(titleFirstTest);
    //   expect(shelves[0].index).toBe(0);
    // });

    // it(`should create new shelf [${titleSecondTest}]`, async () => {
    //   const response = await request(app_url_full)
    //     .post('/shelves')
    //     .send({ title: titleSecondTest })
    //     .auth(userToken, { type: 'bearer' });

    //   const {
    //     index,
    //     title: titleResponse,
    //     data,
    //     isCollapsed,
    //     boxesData,
    //   } = response.body;
    //   expect(response.status).toBe(201);
    //   expect(boxesData).toBeInstanceOf(Array);
    //   expect(index).toBe(0);
    //   expect(isCollapsed).toBe(true);
    //   expect(titleResponse).toEqual(titleSecondTest);
    //   expect(data).toBeInstanceOf(Object);
    //   expect(data).toEqual(
    //     expect.objectContaining({ wait: 0, all: 0, train: 0 }),
    //   );

    //   const cupboardResponse = await request(app_url_full)
    //     .get('/aggregate/cupboard')
    //     .auth(userToken, { type: 'bearer' });
    //   const { shelves } = cupboardResponse.body;
    //   expect(shelves).toBeInstanceOf(Array);
    //   expect(shelves).toHaveLength(3);
    //   expect(shelves[0].index).toBe(0);
    //   expect(shelves[1].index).toBe(1);
    //   expect(shelves[2].index).toBe(2);
    //   expect(shelves[0].title).toEqual(titleSecondTest);
    //   expect(shelves[1].title).toEqual(titleFirstTest);
    //   expect(shelves[2].title).toEqual(initialShelfTitle);
    // });

    // it('should delete shelf with [index 1]', async () => {
    //   const cupboardResponse = await request(app_url_full)
    //     .get('/aggregate/cupboard')
    //     .auth(userToken, { type: 'bearer' });

    //   shelvesData = cupboardResponse.body.shelves;
    //   const shelfIds = shelvesData.map((shelf) => shelf.id);
    //   const shelfIndexToUse = 1;

    //   const response = await request(app_url_full)
    //     .delete(`/shelves/${shelfIds[shelfIndexToUse]}`)
    //     .send({ index: shelfIndexToUse })
    //     .auth(userToken, { type: 'bearer' });

    //   expect(response.status).toBe(200);

    //   const cupboardResponseAfterDeletion = await request(app_url_full)
    //     .get('/aggregate/cupboard')
    //     .auth(userToken, { type: 'bearer' });

    //   const { shelves } = cupboardResponseAfterDeletion.body;
    //   expect(response.status).toBe(200);
    //   expect(shelves).toBeInstanceOf(Array);
    //   expect(shelves).toHaveLength(2);
    //   expect(shelves[0].index).toBe(0);
    //   expect(shelves[1].index).toBe(1);
    //   expect(shelves[0].title).toEqual(titleSecondTest);
    //   expect(shelves[1].title).toEqual(initialShelfTitle);
    // });

    // it('should delete shelf with [index 0]', async () => {
    //   const cupboardResponse = await request(app_url_full)
    //     .get('/aggregate/cupboard')
    //     .auth(userToken, { type: 'bearer' });
    //   // await dropCards();
    //   shelvesData = cupboardResponse.body.shelves;
    //   const shelfIds = shelvesData.map((shelf) => shelf.id);
    //   const shelfIndexToUse = 0;

    //   const response = await request(app_url_full)
    //     .delete(`/shelves/${shelfIds[shelfIndexToUse]}`)
    //     .send({ index: shelfIndexToUse })
    //     .auth(userToken, { type: 'bearer' });

    //   expect(response.status).toBe(200);

    //   const cupboardResponseAfterDeletion = await request(app_url_full)
    //     .get('/aggregate/cupboard')
    //     .auth(userToken, { type: 'bearer' });

    //   const { shelves } = cupboardResponseAfterDeletion.body;
    //   expect(response.status).toBe(200);
    //   expect(shelves).toBeInstanceOf(Array);
    //   expect(shelves).toHaveLength(1);
    //   expect(shelves[0].index).toBe(0);
    //   expect(shelves[0].title).toEqual(initialShelfTitle);
    // });
  });
};
