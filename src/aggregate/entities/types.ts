import { Box, Card, Shelf } from '@prisma/client';
import { DataBlock } from '@/common/types/frontend/types';

export interface BoxIncCards extends Box {
  card: Card[];
}

export interface ShelfIncBoxes extends Shelf {
  box: Box[];
}

export interface ShelfIncBoxesIncCards extends Shelf {
  box: Box[];
  card: Card[];
}

export interface ShelfIncBoxesWithCards extends Shelf {
  box: BoxIncCards[];
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

export interface CommonShelfFrontedResponse {
  isCollapsed?: boolean;
  new: { all: number };
  learning: DataBlock;
  learnt: DataBlock;
  data: DataBlock;
}

// BoxSchemaFrontend[]
