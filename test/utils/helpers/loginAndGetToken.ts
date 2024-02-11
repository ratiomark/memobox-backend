import request from 'supertest';
import { getFullUrl } from './getFullUrl';
import { TESTER_EMAIL, TESTER_PASSWORD } from '../constants';

export const loginAndGetToken = async (returnBody = false) => {
  const response = await request(getFullUrl())
    .post('/auth/email/login')
    .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });
  if (returnBody) {
    return response.body;
  }
  return response.body.token;
};
