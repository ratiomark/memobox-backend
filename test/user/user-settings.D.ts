import request from 'supertest';
import {
  API_PREFIX,
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD,
} from '../utils/constants';
import { sleep } from '@/utils/common/sleep';

const testLoopValue = 40;
const sleepValue = 0;
const SECONDS = 1000;

describe('Test card update time', () => {
  const app = APP_URL;
  const app_url_full = app + API_PREFIX;
  let userToken;
  let userRefreshToken;

  beforeAll(async () => {
    const loginResponse = await request(app_url_full)
      .post('/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });

    userToken = loginResponse.body.token;
    userRefreshToken = loginResponse.body.refreshToken;
  });
});
