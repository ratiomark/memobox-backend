import {
  Box,
  Shelf,
  BoxSpecialType,
  User,
  Prisma,
  ShelfTemplate,
  MissedTrainingValue,
} from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBoxDto {
  @IsOptional()
  id?: Box['id'];

  @IsNotEmpty()
  userId: User['id'];

  @IsNotEmpty()
  shelfId: Shelf['id'];

  @IsNotEmpty()
  index: number;

  @IsNotEmpty()
  specialType: BoxSpecialType;

  @IsOptional()
  missedTrainingValue?: MissedTrainingValue;

  @IsOptional()
  data?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;

  @IsOptional()
  // timing: Box['timing'] | Prisma.InputJsonValue | null;
  timing?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
