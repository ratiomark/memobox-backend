import { PartialType } from '@nestjs/swagger';
import { CreateShelfDto } from './create-shelf.dto';
import { MissedTrainingValue, Prisma, Shelf } from '@prisma/client';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TimingBlockDto } from '@/aggregate/entities/aggregate.entity';
import { Type } from 'class-transformer';
class UpdateBoxListDto {
  // id: Shelf['id']
  @IsNumber()
  index: number;

  @IsString()
  id: string;

  @ValidateNested({ each: true })
  @Type(() => TimingBlockDto)
  timing: TimingBlockDto;
}

export class ShelfUpdateBoxesListDto {
  @IsString()
  shelfId: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateBoxListDto)
  boxesList: UpdateBoxListDto[];
}
// export class CreateSettingShelfTemplateDto {
//   // @IsNotEmptyObject()
//   // @IsObject()
//   @ValidateNested({ each: true })
//   @Type(() => TimingBlockDto)
//   shelfTemplate: TimingBlockDto[];
// }
