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
    let userId;
    let isSeedInInitialState = true;
    let sortedBoxesIds;
    let initialShelfTitle;
    const initialShelfBoxCountFreeze = 6;
    let updatedShelfBoxCount;
    let indexToDelete = 1;
    let indexToRestore = 2;
    let boxIdDeleted;

    beforeAll(async () => {
      // Получение токена пользователя
      const loginResponse = await request(app_url_full)
        .post('/auth/email/login')
        .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

      userToken = loginResponse.body.token;
      userId = loginResponse.body.user.userId;

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

    it(`should delete box [index ${indexToDelete}]`, async () => {
      boxIdDeleted = sortedBoxesIds[indexToDelete];
      const response = await request(app_url_full)
        .delete(`/boxes/${sortedBoxesIds[indexToDelete]}`)
        .send({ index: indexToDelete, shelfId })
        .auth(userToken, { type: 'bearer' });

      const boxesUpdated = response.body;
      expect(response.status).toBe(200);
      expect(boxesUpdated).toBeInstanceOf(Array);

      updatedShelfBoxCount = updatedShelfBoxCount - 1;
      expect(boxesUpdated).toHaveLength(updatedShelfBoxCount);

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

    it(`should restore box to [index ${indexToRestore}]`, async () => {
      const response = await request(app_url_full)
        .patch(`/boxes/restore/${boxIdDeleted}`)
        .send({
          index: indexToRestore,
          shelfId,
        })
        .auth(userToken, { type: 'bearer' });

      expect(response.status).toBe(200);
      const boxRestored = response.body;
      expect(boxRestored).toBeInstanceOf(Object);
      expect(boxRestored.index).toEqual(indexToRestore);
      expect(boxRestored.specialType).toEqual('none');
      expect(boxRestored.isDeleted).toBe(false);
      expect(boxRestored.deletedAt).toBeNull();
      updatedShelfBoxCount = updatedShelfBoxCount + 1;

      const cupboardResponseAfterRestoring = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });

      const { shelves } = cupboardResponseAfterRestoring.body;

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

    it('should validate cupboard state after deleting and restoring box', async () => {
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

      indexToDelete = 4;
      indexToRestore = 1;
    });

    it(`should delete box [index ${indexToDelete}]`, async () => {
      boxIdDeleted = sortedBoxesIds[indexToDelete];
      const response = await request(app_url_full)
        .delete(`/boxes/${sortedBoxesIds[indexToDelete]}`)
        .send({ index: indexToDelete, shelfId })
        .auth(userToken, { type: 'bearer' });

      const boxesUpdated = response.body;
      expect(response.status).toBe(200);
      expect(boxesUpdated).toBeInstanceOf(Array);

      updatedShelfBoxCount = updatedShelfBoxCount - 1;
      expect(boxesUpdated).toHaveLength(updatedShelfBoxCount);

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

    it(`should restore box to [index ${indexToRestore}]`, async () => {
      const response = await request(app_url_full)
        .patch(`/boxes/restore/${boxIdDeleted}`)
        .send({
          index: indexToRestore,
          shelfId,
        })
        .auth(userToken, { type: 'bearer' });

      expect(response.status).toBe(200);
      const boxRestored = response.body;
      expect(boxRestored).toBeInstanceOf(Object);
      expect(boxRestored.index).toEqual(indexToRestore);
      expect(boxRestored.specialType).toEqual('none');
      expect(boxRestored.isDeleted).toBe(false);
      expect(boxRestored.deletedAt).toBeNull();
      updatedShelfBoxCount = updatedShelfBoxCount + 1;

      const cupboardResponseAfterRestoring = await request(app_url_full)
        .get('/aggregate/cupboard')
        .auth(userToken, { type: 'bearer' });

      const { shelves } = cupboardResponseAfterRestoring.body;

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

    it('should validate cupboard state after deleting and restoring box', async () => {
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
  });
};
