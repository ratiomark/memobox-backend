import { Box, Card, Prisma } from '@prisma/client';
import { TimingBlock } from 'src/aggregate/entities/settings-types';
import { DataBlock } from 'src/common/types/frontend/types';
// import { DataBlock, TimingBlock } from 'src/shelves/entities/shelf.entity';

// export class BoxExtended extends Box {}
// export interface BoxWithCards extends Box {
//   card: Card[];
// }

interface BoxBaseSchema {
  id: string;
  index: number;
}

export interface NewCardsBox extends BoxBaseSchema {
  specialType: 'new';
  data: {
    all: number;
  };
}

export interface RegularAndLearntCardsBox extends BoxBaseSchema {
  specialType: 'none' | 'learnt';
  data: DataBlock;
  timing: TimingBlock | Prisma.JsonValue;
  // missedTrainingValue?: MissedTrainingValue;
}

export interface BoxCoordinates {
  x: number;
  y: number;
}

// export interface LearntCardBox extends BoxBaseSchema {
// 	specialType: 'learnt',
// 	data: DataBlock
// 	timing: TimingBlock
// }

export type BoxSchema = NewCardsBox | RegularAndLearntCardsBox;
// | LearntCardBox
