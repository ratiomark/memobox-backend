import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { sleep } from '@/utils/common/sleep';
// как я могу сохранить токен из первого теста? Например, во втором тесте я сохраняю все body отедльным запросом, а потом достаю из него токен. Могу ли я поступить похожим способом в первом тесте? Можно ли сохранить данные из теста в переменную и использовать их в другом тесте? Можно ли сохранять данные и одновременно с этим использовать expect?
const testLoopValue = 40;
const sleepValue = 0;
const SECONDS = 1000;
if (sleepValue > 0) {
  jest.setTimeout((testLoopValue + 5) * sleepValue * SECONDS);
}
// Во первых, объясни откуда ты взял вот это:
// expect(response.body).toHaveProperty('cards');
// expect(Array.isArray(response.body.cards)).toBeTruthy();
// Пожалуйста, покажи место в нашей переписке, где ты увидел, что '/cards/training/all/all' возвращает объект в котором есть поле cards.
describe('Test cards training receiving', () => {
  const app = APP_URL;
  const app_url_full = app + API_PREFIX;
  let userToken;
  let userRefreshToken;
  let shelvesData;
  let shelfId;
  let newCardsBoxId;

  beforeAll(async () => {
    // Получение токена пользователя
    const loginResponse = await request(app_url_full)
      .post('/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

    userToken = loginResponse.body.token;
    userRefreshToken = loginResponse.body.refreshToken;

    // Получение данных о полках и коробках
    const shelvesResponse = await request(app_url_full)
      .get('/aggregate/view')
      .auth(userToken, { type: 'bearer' });

    shelvesData = shelvesResponse.body.shelvesAndBoxesData;
    shelfId = Object.keys(shelvesData)[0];
    newCardsBoxId = shelvesData[shelfId].boxesItems.find(
      (box) => box.index === 0,
    ).id;
  });

  it('should retrieve all new cards from cupboard', async () => {
    const response = await request(app_url_full)
      .get(`/cards/training/all/new`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.boxId).toBe(newCardsBoxId);
      expect(card.specialType).toBe('new');
      expect(card.state).toBe('train');
      expect(card.nextTraining).toBe(null);
    });
  });

  it('should retrieve all new cards from specific shelf', async () => {
    const boxWithNewCards = shelvesData[shelfId].boxesItems[0];
    expect(boxWithNewCards.index).toBe(0);
    expect(boxWithNewCards.id).toBe(newCardsBoxId);

    // Получение карточек для тренировки
    const response = await request(app_url_full)
      .get(`/cards/training/${shelfId}/${newCardsBoxId}`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((card) => {
      expect(card.shelfId).toBe(shelfId);
      expect(card.boxId).toBe(newCardsBoxId);
      expect(card.state).toBe('train');
      expect(card.nextTraining).toBe(null);
    });
  });

  it('should retrieve all training cards from the entire shelf', async () => {
    // Получение всех карточек для тренировки
    const response = await request(app_url_full)
      .get(`/cards/training/${shelfId}/all`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

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

  it('should retrieve the same cards for "all/new" and "specificShelf/specificBox(new cards)"', async () => {
    // Получение новых карточек для всего шкафа
    const allNewCardsResponse = await request(app_url_full)
      .get(`/cards/training/all/new`)
      .auth(userToken, { type: 'bearer' });

    // Получение новых карточек для конкретной полки и коробки
    const specificShelfBoxResponse = await request(app_url_full)
      .get(`/cards/training/${shelfId}/${newCardsBoxId}`)
      .auth(userToken, { type: 'bearer' });

    expect(allNewCardsResponse.status).toBe(200);
    expect(specificShelfBoxResponse.status).toBe(200);
    expect(allNewCardsResponse.body).toEqual(specificShelfBoxResponse.body);
  });

  it('should retrieve all learning cards from cupboard', async () => {
    const response = await request(app_url_full)
      .get(`/cards/training/all/learning`)
      .auth(userToken, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
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
