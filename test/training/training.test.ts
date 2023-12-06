import request from 'supertest';
import {
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
  MAIL_HOST,
  MAIL_PORT,
  API_PREFIX,
} from '../utils/constants';
import { HttpStatus } from '@nestjs/common';
import {
  TEST_boxIdNewCards,
  TEST_shelfId,
  TEST_cardsInNewBox,
} from '../../prisma/mock-data/staticDataFromDb';

describe('Auth user (e2e)', () => {
  const app = APP_URL;
  const app_url_full = app + API_PREFIX;
  const mail = `http://${MAIL_HOST}:${MAIL_PORT}`;
  let userToken;
  let userRefreshToken;
  const newCardIds = TEST_cardsInNewBox.map((card) => card.id);
  // TEST_shelfId;
  // TEST_boxIdNewCards;
  // cosnt cardsInNewCards= TEST_cardsInNewBox;
  // const newUserFirstName = `Tester${Date.now()}`;
  // const newUserLastName = `E2E`;
  // const newUserEmail = `User.${Date.now()}@example.com`;
  // const newUserPassword = `secret`;

  it(`Login: ${API_PREFIX}/auth/email/login (POST)`, () => {
    return request(app_url_full)
      .post('/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();
        expect(body.tokenExpires).toBeDefined();
        expect(body.user.jsonSavedData).toBeDefined();
        expect(body.user.jsonSettings).toBeDefined();
        expect(body.user.email).toBeDefined();
        expect(body.user.hash).not.toBeDefined();
        expect(body.user.password).not.toBeDefined();
        expect(body.user.previousPassword).not.toBeDefined();
        userToken = body.token;
        userRefreshToken = body.refreshToken;
      });
  });

  // it(`Training shelfId with invalid boxId: ${API_PREFIX}/cards/training/:shelfId/:boxId (GET)`, async () => {
  //   await request(app_url_full)
  //     .get(`/cards/training/${TEST_shelfId}/${TEST_shelfId}`)
  //     .auth(userToken, {
  //       type: 'bearer',
  //     })
  //     .expect(200)
  //     .expect(({ body }) => {
  //       expect(body).toEqual([]);
  //     });
  // });
  // it(`Training invalid shelfId & invalid boxId: ${API_PREFIX}/cards/training/:shelfId/:boxId (GET)`, async () => {
  //   // генерирую несуществующий shelfId в формате uuid
  //   const invalidShelfId = 'c097355f' + TEST_shelfId.slice(8);
  //   await request(app_url_full)
  //     .get(`/cards/training/${invalidShelfId}/${invalidShelfId}`)
  //     .auth(userToken, {
  //       type: 'bearer',
  //     })
  //     .expect(200)
  //     .expect(({ body }) => {
  //       expect(body).toEqual([]);
  //     });
  // });
  // it(`Training invalid shelfId: ${API_PREFIX}/cards/training/:shelfId/:boxId (GET)`, async () => {
  //   await request(app_url_full)
  //     .get(`/cards/training/broker_shelf_id/${TEST_boxIdNewCards}`)
  //     .auth(userToken, {
  //       type: 'bearer',
  //     })
  //     .expect(500);
  // });
  // it(`Training invalid boxId: ${API_PREFIX}/cards/training/:shelfId/:boxId (GET)`, async () => {
  //   await request(app_url_full)
  //     .get(`/cards/training/${TEST_shelfId}/broker_box_id`)
  //     .auth(userToken, {
  //       type: 'bearer',
  //     })
  //     .expect(500);
  // });
  it(`Training: ${API_PREFIX}/cards/training/:shelfId/:boxId (GET)`, async () => {
    await request(app_url_full)
      .get(`/cards/training/${TEST_shelfId}/${TEST_boxIdNewCards}`)
      .auth(userToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        // Проверка, что body является массивом
        expect(Array.isArray(body)).toBe(true);

        expect(body).toHaveLength(4);

        body.forEach((card) => {
          expect(card).toMatchObject({
            shelfId: TEST_shelfId,
            boxId: TEST_boxIdNewCards,
            nextTraining: null,
            specialType: 'new',
            boxIndex: 0,
          });
        });
      });
  });
  // training test
  it(`Check cards after training: ${API_PREFIX}/cards/get-by-shelfId-and-boxId/:shelfId/:boxId (GET)`, async () => {
    await request(app_url_full)
      .get(`get-by-shelfId-and-boxId/${TEST_shelfId}/${TEST_boxIdNewCards}`)
      .auth(userToken, {
        type: 'bearer',
      })
      .expect(200)
      .expect(({ body }) => {
        // Проверка, что body является массивом
        expect(Array.isArray(body)).toBe(true);

        // Проверка, что в массиве ровно 4 элемента
        expect(body).toHaveLength(0);
      });
  });
  // it(`Training: ${API_PREFIX}/cards/training/:shelfId/:boxId (GET)`, async () => {
  //   await request(app_url_full)
  //     .get(`/cards/training/${TEST_shelfId}/${TEST_boxIdNewCards}`)
  //     .auth(userToken, {
  //       type: 'bearer',
  //     })
  //     .expect(200)
  //     .expect(({ body }) => {
  //       // Проверка, что body является массивом
  //       expect(Array.isArray(body)).toBe(true);

  //       // Проверка, что в массиве ровно 4 элемента
  //       expect(body).toHaveLength(4);

  //       // Метод expect.arrayContaining используется для проверки, содержит ли массив body все элементы массива TEST_cardsInNewBox, независимо от порядка.
  //       // Метод expect.objectContaining используется для указания, что мы ожидаем наличие объекта с определенными ключами и значениями в массиве.
  //       TEST_cardsInNewBox.forEach((card) => {
  //         expect(body).toEqual(
  //           expect.arrayContaining([expect.objectContaining(card)]),
  //         );
  //       });
  //       // // Проверка, что каждый элемент массива соответствует схеме
  //       // body.forEach((card) => {
  //       //   expect(card).toMatchObject({
  //       //     shelfId: TEST_shelfId,
  //       //     boxId: TEST_boxIdNewCards,
  //       //     nextTraining: null,
  //       //     // Добавьте здесь другие проверки полей, если это необходимо
  //       //   });
  //       //   // Дополнительные проверки, если нужно более детально проверить поля объекта
  //       // });
  //     });
  // });

  // it('Login: /api/v1/auth/email/login (POST)', () => {
  //   return request(app)
  //     .post('/api/v1/auth/email/login')
  //     .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
  //     .expect(200)
  //     .expect(({ body }) => {
  //       expect(body.token).toBeDefined();
  //       expect(body.refreshToken).toBeDefined();
  //       expect(body.tokenExpires).toBeDefined();
  //       expect(body.user.jsonSavedData).toBeDefined();
  //       expect(body.user.jsonSettings).toBeDefined();
  //       expect(body.user.email).toBeDefined();
  //       expect(body.user.hash).not.toBeDefined();
  //       expect(body.user.password).not.toBeDefined();
  //       expect(body.user.previousPassword).not.toBeDefined();
  //     });
  // });

  // it('Do not allow register user with exists email: /api/v1/auth/email/register (POST)', () => {
  //   return request(app)
  //     .post('/api/v1/auth/email/register')
  //     .send({
  //       email: TESTER_EMAIL,
  //       password: TESTER_PASSWORD,
  //       firstName: 'Tester',
  //       lastName: 'E2E',
  //     })
  //     .expect(409);
  //   // .expect(({ body }) => {
  //   //   expect(body.errors.email).toBeDefined();
  //   // });
  // });

  // it('Register new user: /api/v1/auth/email/register (POST)', async () => {
  //   return request(app)
  //     .post('/api/v1/auth/email/register')
  //     .send({
  //       email: newUserEmail,
  //       password: newUserPassword,
  //       firstName: newUserFirstName,
  //       lastName: newUserLastName,
  //     })
  //     .expect(201);
  // });

  // it('Login unconfirmed user: /api/v1/auth/email/login (POST)', () => {
  //   return request(app)
  //     .post('/api/v1/auth/email/login')
  //     .send({ email: newUserEmail, password: newUserPassword })
  //     .expect(200)
  //     .expect(({ body }) => {
  //       expect(body.token).toBeDefined();
  //     });
  // });

  // it('Confirm email: /api/v1/auth/email/confirm (POST)', async () => {
  //   const hash = await request(mail)
  //     .get('/email')
  //     .then(
  //       ({ body }) =>
  //         body
  //           .find(
  //             (letter) =>
  //               letter.to[0].address.toLowerCase() ===
  //                 newUserEmail.toLowerCase() &&
  //               /.*confirm\-email\?hash\=(\w+).*/g.test(letter.text),
  //           )
  //           ?.text.replace(/.*confirm\-email\?hash\=(\w+).*/g, '$1'),
  //     );

  //   return request(app)
  //     .post('/api/v1/auth/email/confirm')
  //     .send({
  //       hash,
  //     })
  //     .expect(HttpStatus.OK);
  // });

  // it('Can not confirm email with same link twice: /api/v1/auth/email/confirm (POST)', async () => {
  //   const hash = await request(mail)
  //     .get('/email')
  //     .then(
  //       ({ body }) =>
  //         body
  //           .find(
  //             (letter) =>
  //               letter.to[0].address.toLowerCase() ===
  //                 newUserEmail.toLowerCase() &&
  //               /.*confirm\-email\?hash\=(\w+).*/g.test(letter.text),
  //           )
  //           ?.text.replace(/.*confirm\-email\?hash\=(\w+).*/g, '$1'),
  //     );

  //   return request(app)
  //     .post('/api/v1/auth/email/confirm')
  //     .send({
  //       hash,
  //     })
  //     .expect(404)
  //     .expect(({ body }) => {
  //       expect(body.message).toBeDefined();
  //       expect(body.message).toBe(
  //         '[P2025]: An operation failed because it depends on one or more records that were required but not found. Record to update not found.',
  //       );
  //     });
  // });

  // it('Login confirmed user: /api/v1/auth/email/login (POST)', () => {
  //   return request(app)
  //     .post('/api/v1/auth/email/login')
  //     .send({ email: newUserEmail, password: newUserPassword })
  //     .expect(200)
  //     .expect(({ body }) => {
  //       expect(body.token).toBeDefined();
  //       expect(body.user.email).toBeDefined();
  //     });
  // });

  // it('Confirmed user retrieve profile: /api/v1/auth/me (GET)', async () => {
  //   const newUserApiToken = await request(app)
  //     .post('/api/v1/auth/email/login')
  //     .send({ email: newUserEmail, password: newUserPassword })
  //     .then(({ body }) => body.token);

  //   await request(app)
  //     .get('/api/v1/auth/me')
  //     .auth(newUserApiToken, {
  //       type: 'bearer',
  //     })
  //     .send()
  //     .expect(({ body }) => {
  //       expect(body.provider).toBeDefined();
  //       expect(body.email).toBeDefined();
  //       expect(body.hash).not.toBeDefined();
  //       expect(body.password).not.toBeDefined();
  //       expect(body.previousPassword).not.toBeDefined();
  //     });
  // });

  // it('Refresh token: /api/v1/auth/refresh (GET)', async () => {
  //   const newUserRefreshToken = await request(app)
  //     .post('/api/v1/auth/email/login')
  //     .send({ email: newUserEmail, password: newUserPassword })
  //     .then(({ body }) => body.refreshToken);

  //   await request(app)
  //     .post('/api/v1/auth/refresh')
  //     .auth(newUserRefreshToken, {
  //       type: 'bearer',
  //     })
  //     .send()
  //     .expect(({ body }) => {
  //       expect(body.token).toBeDefined();
  //       expect(body.refreshToken).toBeDefined();
  //       expect(body.tokenExpires).toBeDefined();
  //     });
  // });

  // it('Refresh Init: /api/v1/auth/refresh-init (POST)', async () => {
  //   const responseBody = await request(app)
  //     .post('/api/v1/auth/email/login')
  //     .send({ email: newUserEmail, password: newUserPassword })
  //     .then(({ body }) => body);

  //   const newUserRefreshToken = responseBody.refreshToken;
  //   const newUserId = responseBody.user.id;

  //   await request(app)
  //     .post('/api/v1/auth/refresh-init')
  //     .auth(newUserRefreshToken, {
  //       type: 'bearer',
  //     })
  //     .send({ userId: newUserId })
  //     .expect(({ body }) => {
  //       expect(body.token).toBeDefined();
  //       expect(body.refreshToken).toBeDefined();
  //       expect(body.tokenExpires).toBeDefined();
  //       expect(body.user.jsonSavedData).toBeDefined();
  //       expect(body.user.jsonSettings).toBeDefined();
  //     });
  // });

  // describe('Profile update:', () => {
  //   // This beforeAll is specific to the nested describe block
  //   const newUserNewName = Date.now().toString();
  //   const newUserNewPassword = 'new-secret';
  //   let newUserApiToken: string;
  //   beforeAll(async () => {
  //     // Code here runs before the tests in the nested describe block
  //     newUserApiToken = await request(app)
  //       .post('/api/v1/auth/email/login')
  //       .send({ email: newUserEmail, password: newUserPassword })
  //       .then(({ body }) => body.token);
  //   });

  //   it('New user update profile(password failure): /api/v1/auth/me (PATCH)', async () => {
  //     await request(app)
  //       .patch('/api/v1/auth/me')
  //       .auth(newUserApiToken, {
  //         type: 'bearer',
  //       })
  //       .send({
  //         firstName: newUserNewName,
  //         password: newUserNewPassword,
  //       })
  //       .expect(422);
  //   });

  //   it('New user update profile(new password and firstName success): /api/v1/auth/me (PATCH)', async () => {
  //     // const newUserNewName = Date.now().toString();
  //     // const newUserNewPassword = 'new-secret';
  //     // const newUserApiToken = await request(app)
  //     //   .post('/api/v1/auth/email/login')
  //     //   .send({ email: newUserEmail, password: newUserPassword })
  //     //   .then(({ body }) => body.token);

  //     await request(app)
  //       .patch('/api/v1/auth/me')
  //       .auth(newUserApiToken, {
  //         type: 'bearer',
  //       })
  //       .send({
  //         firstName: newUserNewName,
  //         password: newUserNewPassword,
  //         oldPassword: newUserPassword,
  //       })
  //       .expect(200);
  //   });

  //   it('New user update profile(new email success):  /api/v1/auth/me (PATCH)', async () => {
  //     // const newUserNewName = Date.now().toString();
  //     // const newUserNewPassword = 'new-secret';
  //     // const newUserApiToken = await request(app)
  //     //   .post('/api/v1/auth/email/login')
  //     //   .send({ email: newUserEmail, password: newUserPassword })
  //     //   .then(({ body }) => body.token);

  //     await request(app)
  //       .post('/api/v1/auth/email/login')
  //       .send({ email: newUserEmail, password: newUserNewPassword })
  //       .expect(200)
  //       .expect(({ body }) => {
  //         expect(body.token).toBeDefined();
  //       });
  //   });

  //   it('New user update profile(password success):  /api/v1/auth/me (PATCH)', async () => {
  //     // const newUserNewName = Date.now().toString();
  //     // const newUserNewPassword = 'new-secret';
  //     // const newUserApiToken = await request(app)
  //     //   .post('/api/v1/auth/email/login')
  //     //   .send({ email: newUserEmail, password: newUserPassword })
  //     //   .then(({ body }) => body.token);

  //     await request(app)
  //       .patch('/api/v1/auth/me')
  //       .auth(newUserApiToken, {
  //         type: 'bearer',
  //       })
  //       .send({ password: newUserPassword, oldPassword: newUserNewPassword })
  //       .expect(200);
  //   });

  //   it('New New user delete profile:  /api/v1/auth/me (DELETE)', async () => {
  //     await request(app)
  //       .delete('/api/v1/auth/me')
  //       .auth(newUserApiToken, {
  //         type: 'bearer',
  //       })
  //       .expect(204);

  //     return request(app)
  //       .post('/api/v1/auth/email/login')
  //       .send({ email: newUserEmail, password: newUserPassword })
  //       .expect(422);
  //   });
  // });
});
