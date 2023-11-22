import { Box } from '@prisma/client';
import { CommonShelfFrontedResponse } from '@/aggregate/entities/types';
import { DataBlock } from '@/common/types/frontend/types';
import { ShelvesCupboardFrontedResponse } from '@/shelves/entities/shelf.entity';

export interface BoxSchemaFrontend extends Partial<Box> {
  // export interface BoxSchemaFrontend extends Omit<Box, 'userId' | 'shelfId'> {
  data: DataBlock;
}

export interface CupboardSchema {
  commonShelf: CommonShelfFrontedResponse;
  shelves: ShelvesCupboardFrontedResponse[];
}
