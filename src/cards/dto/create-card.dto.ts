import { Shelf } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCardDto {
  @IsOptional()
  question?: string;

  @IsOptional()
  answer?: string;

  @IsNotEmpty()
  shelfId: Shelf['id'];

  @IsNotEmpty()
  boxId: Shelf['id'];
}
