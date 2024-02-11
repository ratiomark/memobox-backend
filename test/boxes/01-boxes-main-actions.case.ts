import request from 'supertest';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';
import { getFullUrl } from 'test/utils/helpers/getFullUrl';
import { validateInitialCupboardState } from 'test/utils/helpers/validateInitialCupboardState';
import { loginAndGetToken } from 'test/utils/helpers/loginAndGetToken';
import { getCupboard } from 'test/utils/helpers/getCupboard';

export default () => {
  describe('Test box main actions', () => {
    const app_url_full = getFullUrl();
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
      const responseBody = await loginAndGetToken(true);
      userToken = responseBody.token;
      userId = responseBody.user.userId;

      // Получение данных о полках и коробках
      const { shelves } = await getCupboard(userToken);
      shelvesData = shelves;
      initialShelfTitle = shelves[0].title;
      shelfId = shelves[0].id;
    });

    beforeEach(() => {
      if (!isSeedInInitialState) {
        throw new Error('Seed test failed, skipping...');
      }
    });

    it('should validate initial cupboard state', async () => {
      try {
        const { sortedBoxes } = await validateInitialCupboardState(userToken);
        sortedBoxesIds = sortedBoxes;
        updatedShelfBoxCount = sortedBoxesIds.length;
      } catch (error) {
        isSeedInInitialState = false; // Обновляем состояние в случае ошибки
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

      const cupboardResponseAfterDeletion = await getCupboard(userToken);
      const { shelves } = cupboardResponseAfterDeletion;
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

      const cupboardResponseAfterRestoring = await getCupboard(userToken);

      const { shelves } = cupboardResponseAfterRestoring;

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
      const response = await getCupboard(userToken);
      const { shelves, commonShelf } = response;
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
      await validateInitialCupboardState(userToken);
    });
  });
};
