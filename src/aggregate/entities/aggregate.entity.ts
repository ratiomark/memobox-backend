import { IsNotEmpty, IsNumber } from 'class-validator';

export class Aggregate {}
export class TimingBlockDto {
  @IsNotEmpty()
  @IsNumber()
  minutes: number;

  @IsNotEmpty()
  @IsNumber()
  hours: number;

  @IsNotEmpty()
  @IsNumber()
  days: number;

  @IsNotEmpty()
  @IsNumber()
  weeks: number;

  @IsNotEmpty()
  @IsNumber()
  months: number;
}
