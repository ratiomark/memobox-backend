import { PartialType } from '@nestjs/swagger';
import { CreateShelfDto } from './create-shelf.dto';
import { MissedTrainingValue, Prisma, Shelf } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateShelfDto extends PartialType(CreateShelfDto) {
  // id: Shelf['id']

  @IsOptional()
  title?: string;

  @IsOptional()
  isCollapsed?: boolean;

  @IsOptional()
  missedTrainingValue?: MissedTrainingValue;

  @IsOptional()
  notificationEnabled?: boolean;
}
