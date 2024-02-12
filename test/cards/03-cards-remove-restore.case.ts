import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { addDays, addHours, addMinutes, addMonths, addWeeks } from 'date-fns';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';
import { AnswerType } from '@/common/types/frontend/types';
import { ta } from 'date-fns/locale';
import { getFullUrl } from 'test/utils/helpers/getFullUrl';
import { validateInitialCupboardState } from 'test/utils/helpers/validateInitialCupboardState';
import { restoreDb } from 'test/utils/helpers/restoreDb';
import { loginAndGetToken } from 'test/utils/helpers/loginAndGetToken';

// const validateInitialCupboardState = async (
//   app_url_full,
//   userToken,
//   initialShelfId,
//   sortedBoxesIds,
//   isSeedInInitialState,
// ) => {
//   const response = await request(app_url_full)
//     .get('/aggregate/cupboard')
//     .auth(userToken, { type: 'bearer' });
//   const { shelves, commonShelf } = response.body;
//   expect(response.status).toBe(200);
//   expect(shelves).toBeInstanceOf(Array);
//   expect(shelves).toHaveLength(1);
//   expect(shelves[0]).toBeInstanceOf(Object);
//   expect(shelves[0].boxesData).toBeInstanceOf(Array);
//   expect(shelves[0].boxesData).toHaveLength(6);
//   // В данном примере, если commonShelf содержит структуру, идентичную commonShelfInitialSeedState (или более широкую, но включающую в себя все ключи и значения из commonShelfInitialSeedState), тест будет успешно пройден.
//   // Обратите внимание, что если commonShelf содержит дополнительные ключи и значения, не указанные в commonShelfInitialSeedState, тест всё равно будет успешным. Если вам нужно точное соответствие без дополнительных ключей, используйте expect(commonShelf).toEqual(commonShelfInitialSeedState);.
//   expect(commonShelf).toEqual(
//     expect.objectContaining(commonShelfInitialSeedState),
//   );

//   // Возвращаем необходимые данные для дальнейшего использования
//   return {
//     shelfId: shelves[0].id,
//     sortedBoxes: shelves[0].boxesData.map((box) => box.id),
//     commonShelf,
//   };
// };

// FIXME: нет проверок на изменение nextTraining

export default () => {
  describe('Test cards training responses', () => {
    const app_url_full = getFullUrl();
    let userToken;
    let isSeedInInitialState = true;
    let sortedBoxesIds;
    let initialCardIdList;
    let initialCardsCount;
    let initialShelfId;

    beforeAll(async () => {
      userToken = await loginAndGetToken();

      await restoreDb(userToken);

      const aggregateViewResponse = await request(app_url_full)
        .get('/aggregate/view')
        .auth(userToken, { type: 'bearer' });
      initialCardIdList = aggregateViewResponse.body.cards.map(
        (card) => card.id,
      );
      initialCardsCount = aggregateViewResponse.body.cards.length;
      // await dropCards();
    });

    afterAll(async () => {
      await restoreDb(userToken);
    });

    beforeEach(() => {
      if (!isSeedInInitialState) {
        throw new Error('Seed test failed, skipping...');
      }
    });

    const restoreAllCardsByBoxId = async (targetedBoxId: string) => {
      const response = await request(app_url_full)
        .patch('/cards/restore-several-cards')
        .auth(userToken, { type: 'bearer' })
        .send({
          cardIds: initialCardIdList,
          shelfId: initialShelfId,
          boxId: targetedBoxId,
        });
      const { count } = response.body;
      expect(response.status).toBe(200);
      expect(count).toBe(initialCardsCount);
    };

    const checkIfAllCardDeleted = async () => {
      const aggregateViewResponseCheck = await request(app_url_full)
        .get('/aggregate/view')
        .auth(userToken, { type: 'bearer' });
      expect(aggregateViewResponseCheck.body.cards).toHaveLength(0);
    };

    const checkIfAllCardsRestoredToBox = async (targetedBoxId: string) => {
      const aggregateViewResponse = await request(app_url_full)
        .get('/aggregate/view')
        .auth(userToken, { type: 'bearer' });
      const cards = aggregateViewResponse.body.cards;
      expect(cards).toHaveLength(initialCardsCount);
      cards.forEach((card) => {
        expect(card.boxId).toBe(targetedBoxId);
      });
    };

    const deleteAllCardsToTrash = async () => {
      const cardsDeletedResponse = await request(app_url_full)
        .delete('/cards/remove-cards')
        .auth(userToken, { type: 'bearer' })
        .send({ cardIds: initialCardIdList });
      const { count: cardsDeletedCount } = cardsDeletedResponse.body;
      expect(cardsDeletedResponse.status).toBe(200);
      expect(cardsDeletedCount).toBe(initialCardsCount);
    };

    it('should validate initial cupboard state', async () => {
      try {
        const { shelfId, sortedBoxes } =
          await validateInitialCupboardState(userToken);
        initialShelfId = shelfId;
        sortedBoxesIds = sortedBoxes;
      } catch (error) {
        isSeedInInitialState = false; // Обновляем состояние в случае ошибки
        throw new Error(error);
      }
    });

    it('should delete all cards & restore to [new cards]', async () => {
      await deleteAllCardsToTrash();
      await checkIfAllCardDeleted();
      const targetedBoxId = sortedBoxesIds[0];
      await restoreAllCardsByBoxId(targetedBoxId);
      await checkIfAllCardsRestoredToBox(targetedBoxId);
    });

    it('should delete all cards & restore to [learnt cards]', async () => {
      await deleteAllCardsToTrash();
      await checkIfAllCardDeleted();
      const targetedBoxId = sortedBoxesIds[sortedBoxesIds.length - 1];
      await restoreAllCardsByBoxId(targetedBoxId);
      await checkIfAllCardsRestoredToBox(targetedBoxId);
    });

    it('should delete all cards & restore to [box 2]', async () => {
      await deleteAllCardsToTrash();
      await checkIfAllCardDeleted();
      const targetedBoxId = sortedBoxesIds[2];
      await restoreAllCardsByBoxId(targetedBoxId);
      await checkIfAllCardsRestoredToBox(targetedBoxId);
    });

    it('should delete all cards & delete permanently all cards', async () => {
      await deleteAllCardsToTrash();
      await checkIfAllCardDeleted();
      const response = await request(app_url_full)
        .delete('/cards/remove-final-several-cards')
        .auth(userToken, { type: 'bearer' })
        .send({
          cardIds: initialCardIdList,
        });
      const { count } = response.body;
      expect(response.status).toBe(200);
      expect(count).toBe(initialCardsCount);

      const trashResponse = await request(app_url_full)
        .get('/aggregate/trash')
        .auth(userToken, { type: 'bearer' });
      const { cards } = trashResponse.body;
      expect(trashResponse.status).toBe(200);
      expect(cards).toHaveLength(0);

      await restoreDb(userToken);
    });

    it('should delete one card & restore', async () => {
      const targetedCardId = initialCardIdList[0];
      const response = await request(app_url_full)
        .delete(`/cards/${targetedCardId}`)
        .auth(userToken, { type: 'bearer' });

      const card = response.body;
      expect(response.status).toBe(200);
      expect(card.isDeleted).toEqual(true);
      expect(card.deletedAt).not.toBeNull();

      const trashResponse = await request(app_url_full)
        .get('/aggregate/trash')
        .auth(userToken, { type: 'bearer' });
      const cardFromTrash = trashResponse.body.cards[0];
      expect(trashResponse.body.cards).toHaveLength(1);
      expect(trashResponse.status).toBe(200);
      expect(cardFromTrash.id).toBe(targetedCardId);

      const cardRestoredResponse = await request(app_url_full)
        .patch(`/cards/restore/${targetedCardId}`)
        .auth(userToken, { type: 'bearer' })
        .send({ shelfId: initialShelfId, boxId: card.boxId });

      const cardRestored = cardRestoredResponse.body;
      expect(cardRestoredResponse.status).toBe(200);
      expect(cardRestored.isDeleted).toEqual(false);
      expect(cardRestored.deletedAt).toBeNull();
    });

    it('should delete one card & delete permanently', async () => {
      const targetedCardId = initialCardIdList[0];
      const response = await request(app_url_full)
        .delete(`/cards/${targetedCardId}`)
        .auth(userToken, { type: 'bearer' });

      const card = response.body;
      expect(response.status).toBe(200);
      expect(card.isDeleted).toEqual(true);
      expect(card.deletedAt).not.toBeNull();

      const trashResponse = await request(app_url_full)
        .get('/aggregate/trash')
        .auth(userToken, { type: 'bearer' });
      const cardFromTrash = trashResponse.body.cards[0];
      expect(trashResponse.body.cards).toHaveLength(1);
      expect(trashResponse.status).toBe(200);
      expect(cardFromTrash.id).toBe(targetedCardId);

      const cardDeletedPermanentlyResponse = await request(app_url_full)
        .delete(`/cards/final/${targetedCardId}`)
        .auth(userToken, { type: 'bearer' })
        .send({ shelfId: initialShelfId, boxId: card.boxId });
      const deletedPermanentlyCard = cardDeletedPermanentlyResponse.body;
      expect(deletedPermanentlyCard.id).toBe(targetedCardId);

      const trashResponse2 = await request(app_url_full)
        .get('/aggregate/trash')
        .auth(userToken, { type: 'bearer' });
      expect(trashResponse2.body.cards).toHaveLength(0);

      const aggregateViewResponseCheck = await request(app_url_full)
        .get('/aggregate/view')
        .auth(userToken, { type: 'bearer' });
      expect(aggregateViewResponseCheck.body.cards).toHaveLength(
        initialCardsCount - 1,
      );
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
// it('should delete all cards & restore to [box 2]', async () => {
//   await deleteAllCardsToTrash();
//   await checkIfAllCardDeleted();

//   const targetedBoxId = sortedBoxesIds[2];

//   // const cardsRestoredResponse = await request(app_url_full)
//   //   .patch('/cards/restore-several-cards')
//   //   .auth(userToken, { type: 'bearer' })
//   //   .send({
//   //     cardIds: initialCardIdList,
//   //     shelfId: initialShelfId,
//   //     boxId: targetedBoxId,
//   //   });
//   // const { count: cardRestoredCount } = cardsRestoredResponse.body;
//   // expect(cardsRestoredResponse.status).toBe(200);
//   // expect(cardRestoredCount).toBe(initialCardsCount);

//   await restoreAllCardsByBoxId(targetedBoxId);
//   await checkIfAllCardsRestoredToBox(targetedBoxId);
//   // const aggregateViewResponse = await request(app_url_full)
//   //   .get('/aggregate/view')
//   //   .auth(userToken, { type: 'bearer' });
//   // const cards = aggregateViewResponse.body.cards;
//   // expect(cards).toHaveLength(initialCardsCount);
//   // cards.forEach((card) => {
//   //   expect(card.boxId).toBe(targetedBoxId);
//   // });
// });
