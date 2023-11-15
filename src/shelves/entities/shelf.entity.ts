import { Shelf } from '@prisma/client';
import { BoxSchema } from 'src/boxes/entities/box.entity';

// export class ShelfExtended extends Shelf {
export interface ShelfExtended extends Shelf {
  data: DataBlock;
  boxesData: BoxSchema[];
}
// }

export interface DataBlock {
  wait: number;
  all: number;
  train: number;
}

export interface TimingBlock {
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}
