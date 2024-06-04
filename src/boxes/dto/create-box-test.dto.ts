import { TimingBlockDto } from '@/aggregate/entities/aggregate.entity';
import { BoxId, UserId } from '@/common/types/prisma-entities';
import { ApiProperty } from '@nestjs/swagger';
import {
  Box,
  Shelf,
  BoxSpecialType,
  User,
  Prisma,
  ShelfTemplate,
  MissedTrainingValue,
  $Enums,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum BoxSpecialTypeEnum {
  new = 'new',
  none = 'none',
  learned = 'learned',
}

export class DataBlockTest {
  @ApiProperty()
  @IsNumber()
  all: number;

  @ApiProperty()
  @IsNumber()
  train: number;

  @ApiProperty()
  @IsNumber()
  wait: number;
}

export class CreateBoxDtoTest {
  @ApiProperty({})
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  userId: string;
  // userId: User['id'];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shelfId: string;
  // shelfId: Shelf['id'];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @ApiProperty({
    examples: [
      BoxSpecialTypeEnum.new,
      BoxSpecialTypeEnum.none,
      BoxSpecialTypeEnum.learned,
    ],
    enum: BoxSpecialTypeEnum,
    enumName: 'BoxSpecialTypeEnum',
  })
  // @IsEnum(BoxSpecialTypeEnum)
  specialType: BoxSpecialTypeEnum;

  // @ApiProperty()
  @IsOptional()
  missedTrainingValue?: MissedTrainingValue;

  @ApiProperty({ type: () => DataBlockTest })
  data: DataBlockTest;

  @ApiProperty({ type: () => TimingBlockDto })
  @ValidateNested({ each: true })
  @Type(() => TimingBlockDto)
  timing: TimingBlockDto;
}
