import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Aggregate {}
export class TimingBlockDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  minutes: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hours: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  days: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weeks: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  months: number;
}
