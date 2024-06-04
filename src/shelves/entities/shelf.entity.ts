import { Shelf } from '@prisma/client';
import { CreateBoxDto } from '@/boxes/dto/create-box.dto';
import { DataBlock } from '@/common/types/frontend/types';
import { BoxSchemaFrontend } from '@/user-data-storage/types/fronted-responses';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreateBoxDtoTest,
  DataBlockTest,
} from '@/boxes/dto/create-box-test.dto';
import { IsNumber, ValidateNested } from 'class-validator';

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

export class ShelfFrontedResponseClass {
  @ApiProperty({ type: () => DataBlockTest })
  // @ApiProperty()
  data: DataBlockTest;

  @ApiProperty({ type: () => [CreateBoxDtoTest] })
  @ValidateNested({ each: true })
  boxesData: CreateBoxDtoTest[];
}

// export class CreateBoxDtoClass {
//   @ApiProperty()
//   // Определите свойства CreateBoxDto здесь
//   exampleProperty: string;
// }
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
