import { Shelf } from '@prisma/client';
import { CreateBoxDto } from '@/boxes/dto/create-box.dto';
import { DataBlock } from '@/common/types/frontend/types';
import { BoxSchemaFrontend } from '@/user-data-storage/types/fronted-responses';

// export class ShelfExtended extends Shelf {
export interface ShelfFrontedResponse extends Partial<Shelf> {
  // export interface ShelfFrontedResponse
  //   extends Omit<Shelf, 'createdAt' | 'userId' | 'updatedAt'> {
  data: DataBlock;
  boxesData: CreateBoxDto[];
}

export interface ShelvesCupboardFrontedResponse extends Partial<Shelf> {
  // export interface ShelvesCupboardFrontedResponse
  //   extends Omit<Shelf, 'createdAt' | 'userId' | 'updatedAt'> {
  data: DataBlock;
  boxesData: BoxSchemaFrontend[];
}
// }

// export interface DataBlock {
//   wait: number;
//   all: number;
//   train: number;
// }

// export interface TimingBlock {
//   minutes: number;
//   hours: number;
//   days: number;
//   weeks: number;
//   months: number;
// }
