import request from 'supertest';
import { getFullUrl } from './getFullUrl';

export const restoreDb = async (userToken: string) => {
  await request(getFullUrl())
    .post('/aggregate/restore-db')
    .auth(userToken, { type: 'bearer' });
};
