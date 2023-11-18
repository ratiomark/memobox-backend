import { Box, Card, Shelf } from '@prisma/client';

export interface BoxWithCards extends Box {
  card: Card[];
}

export interface ShelfWithBoxes extends Shelf {
  box: Box[];
}

export interface ShelfWithBoxCards extends Shelf {
  box: BoxWithCards[];
}

export type ShelfIdAndIndex = {
  id: Shelf['id'];
  index: number;
};

export type ShelfOrderRequest = ShelfIdAndIndex[];

export interface ShelfWithBoxesData {
  maxIndexBox: number;
  boxesItems: { index: number; id: string }[];
  shelfTitle: string;
  shelfIndex: number;
}

export interface ShelvesDataViewPage {
  [shelfId: Shelf['id']]: ShelfWithBoxesData;
}
