import { Shelf } from '@prisma/client';

export type ShelfOrderRequest = {
  id: Shelf['id'];
  index: Shelf['index'];
}[];
