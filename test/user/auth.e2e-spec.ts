import request from 'supertest';
import {
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
  MAIL_HOST,
  MAIL_PORT,
} from '../utils/constants';
import { HttpStatus } from '@nestjs/common';

describe('Auth user (e2e)', () => {
  const app = APP_URL;
  const mail = `http://${MAIL_HOST}:${MAIL_PORT}`;
  const newUserFirstName = `Tester${Date.now()}`;
  const newUserLastName = `E2E`;
  const newUserEmail = `User.${Date.now()}@example.com`;
  const newUserPassword = `secret`;

  it('Login: /api/v1/auth/email/login (POST)', () => {
    return request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();
        expect(body.tokenExpires).toBeDefined();
        expect(body.user.jsonSavedData).toBeDefined();
        expect(body.user.jsonSettings).toBeDefined();
        expect(body.user.email).toBeDefined();
        expect(body.user.id).toBeDefined();
        expect(body.user.roleId).toBeDefined();
        expect(body.user.hash).not.toBeDefined();
        expect(body.user.password).not.toBeDefined();
        expect(body.user.previousPassword).not.toBeDefined();
      });
  });

  it('Do not allow register user with exists email: /api/v1/auth/email/register (POST)', () => {
    return request(app)
      .post('/api/v1/auth/email/register')
      .send({
        email: TESTER_EMAIL,
        password: TESTER_PASSWORD,
        firstName: 'Tester',
        lastName: 'E2E',
      })
      .expect(409);
    // .expect(({ body }) => {
    //   expect(body.errors.email).toBeDefined();
    // });
  });

  it('Register new user: /api/v1/auth/email/register (POST)', async () => {
    return request(app)
      .post('/api/v1/auth/email/register')
      .send({
        email: newUserEmail,
        password: newUserPassword,
        firstName: newUserFirstName,
        lastName: newUserLastName,
      })
      .expect(201);
  });

  it('Login unconfirmed user: /api/v1/auth/email/login (POST)', () => {
    return request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

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

  it('Login confirmed user: /api/v1/auth/email/login (POST)', () => {
    return request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.email).toBeDefined();
      });
  });

  it('Confirmed user retrieve profile: /api/v1/auth/me (GET)', async () => {
    const newUserApiToken = await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body.token);

    await request(app)
      .get('/api/v1/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send()
      .expect(({ body }) => {
        expect(body.provider).toBeDefined();
        expect(body.email).toBeDefined();
        expect(body.hash).not.toBeDefined();
        expect(body.password).not.toBeDefined();
        expect(body.previousPassword).not.toBeDefined();
      });
  });

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

  it('Refresh Init: /api/v1/auth/refresh-init (POST)', async () => {
    const responseBody = await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body);

    const newUserRefreshToken = responseBody.refreshToken;
    const newUserId = responseBody.user.id;

    await request(app)
      .post('/api/v1/auth/refresh-init')
      .auth(newUserRefreshToken, {
        type: 'bearer',
      })
      .send({ userId: newUserId })
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();
        expect(body.tokenExpires).toBeDefined();
        expect(body.user.jsonSavedData).toBeDefined();
        expect(body.user.jsonSettings).toBeDefined();
      });
  });

  describe('Profile update:', () => {
    // This beforeAll is specific to the nested describe block
    const newUserNewName = Date.now().toString();
    const newUserNewPassword = 'new-secret';
    let newUserApiToken: string;
    beforeAll(async () => {
      // Code here runs before the tests in the nested describe block
      newUserApiToken = await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .then(({ body }) => body.token);
    });

    it('New user update profile(password failure): /api/v1/auth/me (PATCH)', async () => {
      await request(app)
        .patch('/api/v1/auth/me')
        .auth(newUserApiToken, {
          type: 'bearer',
        })
        .send({
          firstName: newUserNewName,
          password: newUserNewPassword,
        })
        .expect(422);
    });

    it('New user update profile(new password and firstName success): /api/v1/auth/me (PATCH)', async () => {
      // const newUserNewName = Date.now().toString();
      // const newUserNewPassword = 'new-secret';
      // const newUserApiToken = await request(app)
      //   .post('/api/v1/auth/email/login')
      //   .send({ email: newUserEmail, password: newUserPassword })
      //   .then(({ body }) => body.token);

      await request(app)
        .patch('/api/v1/auth/me')
        .auth(newUserApiToken, {
          type: 'bearer',
        })
        .send({
          firstName: newUserNewName,
          password: newUserNewPassword,
          oldPassword: newUserPassword,
        })
        .expect(200);
    });

    it('New user update profile(new email success):  /api/v1/auth/me (PATCH)', async () => {
      // const newUserNewName = Date.now().toString();
      // const newUserNewPassword = 'new-secret';
      // const newUserApiToken = await request(app)
      //   .post('/api/v1/auth/email/login')
      //   .send({ email: newUserEmail, password: newUserPassword })
      //   .then(({ body }) => body.token);

      await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserNewPassword })
        .expect(200)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
        });
    });

    it('New user update profile(password success):  /api/v1/auth/me (PATCH)', async () => {
      // const newUserNewName = Date.now().toString();
      // const newUserNewPassword = 'new-secret';
      // const newUserApiToken = await request(app)
      //   .post('/api/v1/auth/email/login')
      //   .send({ email: newUserEmail, password: newUserPassword })
      //   .then(({ body }) => body.token);

      await request(app)
        .patch('/api/v1/auth/me')
        .auth(newUserApiToken, {
          type: 'bearer',
        })
        .send({ password: newUserPassword, oldPassword: newUserNewPassword })
        .expect(200);
    });

    it('New New user delete profile:  /api/v1/auth/me (DELETE)', async () => {
      await request(app)
        .delete('/api/v1/auth/me')
        .auth(newUserApiToken, {
          type: 'bearer',
        })
        .expect(204);

      return request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .expect(422);
    });
  });
});
