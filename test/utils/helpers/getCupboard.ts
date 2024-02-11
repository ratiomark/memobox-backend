import { CupboardSchema } from '@/user-data-storage/types/fronted-responses';
import request from 'supertest';
import { getFullUrl } from './getFullUrl';

export const getCupboard = async (
  userToken: string,
): Promise<CupboardSchema & { status: any }> => {
  const response = await request(getFullUrl())
    .get('/aggregate/cupboard')
    .auth(userToken, { type: 'bearer' });
  const cupboard = response.body as CupboardSchema;
  return { ...cupboard, status: response.status };
};
