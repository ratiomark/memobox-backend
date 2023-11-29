// import request from 'supertest';
// import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';
// // как я могу сохранить токен из первого теста? Например, во втором тесте я сохраняю все body отедльным запросом, а потом достаю из него токен. Могу ли я поступить похожим способом в первом тесте? Можно ли сохранить данные из теста в переменную и использовать их в другом тесте? Можно ли сохранять данные и одновременно с этим использовать expect?
// describe('Settings user (e2e)', () => {
//   const app = APP_URL;

//   it('Login: /api/v1/auth/email/login (POST)', () => {
//     return request(app)
//       .post('/api/v1/auth/email/login')
//       .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
//       .expect(200)
//       .expect(({ body }) => {
//         expect(body.token).toBeDefined();
//         expect(body.refreshToken).toBeDefined();
//         expect(body.tokenExpires).toBeDefined();
//         expect(body.user.jsonSavedData).toBeDefined();
//         expect(body.user.jsonSettings).toBeDefined();
//         expect(body.user.email).toBeDefined();
//         expect(body.user.hash).not.toBeDefined();
//         expect(body.user.password).not.toBeDefined();
//         expect(body.user.previousPassword).not.toBeDefined();
//       });
//   });

//   it('Refresh Init: /api/v1/auth/refresh-init (POST)', async () => {
//     const responseBody = await request(app)
//       .post('/api/v1/auth/email/login')
//       .send({ email: newUserEmail, password: newUserPassword })
//       .then(({ body }) => body);

//     const newUserRefreshToken = responseBody.refreshToken;
//     const newUserId = responseBody.user.id;

//     await request(app)
//       .post('/api/v1/auth/refresh-init')
//       .auth(newUserRefreshToken, {
//         type: 'bearer',
//       })
//       .send({ userId: newUserId })
//       .expect(({ body }) => {
//         expect(body.token).toBeDefined();
//         expect(body.refreshToken).toBeDefined();
//         expect(body.tokenExpires).toBeDefined();
//         expect(body.user.jsonSavedData).toBeDefined();
//         expect(body.user.jsonSettings).toBeDefined();
//       });
//   });

//   describe('Profile update:', () => {
//     // This beforeAll is specific to the nested describe block
//     const newUserNewName = Date.now().toString();
//     const newUserNewPassword = 'new-secret';
//     let newUserApiToken: string;
//     beforeAll(async () => {
//       // Code here runs before the tests in the nested describe block
//       newUserApiToken = await request(app)
//         .post('/api/v1/auth/email/login')
//         .send({ email: newUserEmail, password: newUserPassword })
//         .then(({ body }) => body.token);
//     });

//     it('New user update profile(password failure): /api/v1/auth/me (PATCH)', async () => {
//       await request(app)
//         .patch('/api/v1/auth/me')
//         .auth(newUserApiToken, {
//           type: 'bearer',
//         })
//         .send({
//           firstName: newUserNewName,
//           password: newUserNewPassword,
//         })
//         .expect(422);
//     });

//     it('New user update profile(new password and firstName success): /api/v1/auth/me (PATCH)', async () => {
//       // const newUserNewName = Date.now().toString();
//       // const newUserNewPassword = 'new-secret';
//       // const newUserApiToken = await request(app)
//       //   .post('/api/v1/auth/email/login')
//       //   .send({ email: newUserEmail, password: newUserPassword })
//       //   .then(({ body }) => body.token);

//       await request(app)
//         .patch('/api/v1/auth/me')
//         .auth(newUserApiToken, {
//           type: 'bearer',
//         })
//         .send({
//           firstName: newUserNewName,
//           password: newUserNewPassword,
//           oldPassword: newUserPassword,
//         })
//         .expect(200);
//     });

//     it('New user update profile(new email success):  /api/v1/auth/me (PATCH)', async () => {
//       // const newUserNewName = Date.now().toString();
//       // const newUserNewPassword = 'new-secret';
//       // const newUserApiToken = await request(app)
//       //   .post('/api/v1/auth/email/login')
//       //   .send({ email: newUserEmail, password: newUserPassword })
//       //   .then(({ body }) => body.token);

//       await request(app)
//         .post('/api/v1/auth/email/login')
//         .send({ email: newUserEmail, password: newUserNewPassword })
//         .expect(200)
//         .expect(({ body }) => {
//           expect(body.token).toBeDefined();
//         });
//     });

//     it('New user update profile(password success):  /api/v1/auth/me (PATCH)', async () => {
//       // const newUserNewName = Date.now().toString();
//       // const newUserNewPassword = 'new-secret';
//       // const newUserApiToken = await request(app)
//       //   .post('/api/v1/auth/email/login')
//       //   .send({ email: newUserEmail, password: newUserPassword })
//       //   .then(({ body }) => body.token);

//       await request(app)
//         .patch('/api/v1/auth/me')
//         .auth(newUserApiToken, {
//           type: 'bearer',
//         })
//         .send({ password: newUserPassword, oldPassword: newUserNewPassword })
//         .expect(200);
//     });

//     it('New New user delete profile:  /api/v1/auth/me (DELETE)', async () => {
//       await request(app)
//         .delete('/api/v1/auth/me')
//         .auth(newUserApiToken, {
//           type: 'bearer',
//         })
//         .expect(204);

//       return request(app)
//         .post('/api/v1/auth/email/login')
//         .send({ email: newUserEmail, password: newUserPassword })
//         .expect(422);
//     });
//   });
// });
