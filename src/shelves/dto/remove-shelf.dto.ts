import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RemoveShelfDto {
  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  index: number;
}
