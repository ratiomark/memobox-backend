import { ShelvesCupboardFrontedResponse } from '@/shelves/entities/shelf.entity';
import { CupboardSchema } from '@/user-data-storage/types/fronted-responses';
import request from 'supertest';
import { commonShelfInitialSeedState } from 'test/mock/initial-seed-state';
import { getFullUrl } from './getFullUrl';
import { response } from 'express';
import { shelves } from 'prisma/mock-data/staticDataFromDb';
import { getCupboard } from './getCupboard';

type CupboardStateTestResponse = {
  shelfId: string;
  sortedBoxes: string[];
  initialShelf: ShelvesCupboardFrontedResponse;
  commonShelf: any;
};

export const validateInitialCupboardState = async (
  userToken: string,
): Promise<CupboardStateTestResponse> => {
  const { shelves, commonShelf, status } = await getCupboard(userToken);
  expect(status).toBe(200);
  expect(shelves).toBeInstanceOf(Array);
  expect(shelves).toHaveLength(1);
  const initialShelf = shelves[0];
  const boxesData = initialShelf.boxesData;
  expect(initialShelf).toBeInstanceOf(Object);
  expect(boxesData).toBeInstanceOf(Array);
  expect(boxesData).toHaveLength(6);
  // В данном примере, если commonShelf содержит структуру, идентичную commonShelfInitialSeedState (или более широкую, но включающую в себя все ключи и значения из commonShelfInitialSeedState), тест будет успешно пройден.
  // Обратите внимание, что если commonShelf содержит дополнительные ключи и значения, не указанные в commonShelfInitialSeedState, тест всё равно будет успешным. Если вам нужно точное соответствие без дополнительных ключей, используйте expect(commonShelf).toEqual(commonShelfInitialSeedState);.
  expect(commonShelf).toEqual(
    expect.objectContaining(commonShelfInitialSeedState),
  );

  // Возвращаем необходимые данные для дальнейшего использования
  return {
    shelfId: initialShelf.id as string,
    sortedBoxes: boxesData.map((box) => box.id) as string[],
    initialShelf,
    commonShelf,
  };
};
