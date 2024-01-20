import { Box, BoxSpecialType, Card, Shelf } from '@prisma/client';
import { CommonShelfFrontedResponse } from '@/aggregate/entities/types';
import { DataBlock, TimingBlock } from '@/common/types/frontend/types';
import { ShelvesCupboardFrontedResponse } from '@/shelves/entities/shelf.entity';
import { JsonValue } from '@prisma/client/runtime/library';

export interface BoxSchemaFrontend extends Partial<Box> {
  // export interface BoxSchemaFrontend extends Omit<Box, 'userId' | 'shelfId'> {
  data: DataBlock;
}

export interface CupboardSchema {
  commonShelf: CommonShelfFrontedResponse;
  shelves: ShelvesCupboardFrontedResponse[];
}

export interface ShelvesTrashResponse extends Shelf {
  box: Array<{
    card: Card[];
    _count: { card: number };
    specialType: BoxSpecialType;
    index: number;
    deletedAt: Date | null;
    timing: JsonValue;
  }>;
  _count: {
    card: number;
    box: number;
  };
  boxesCount: number;
  cardsCount: number;
}
