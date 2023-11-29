import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';

export class CreateShelfDto {
  @ApiProperty({ example: 'biology' })
  @IsNotEmpty()
  // @IsEmail()
  // @Validate(IsNotExist, ['USER'], { message: 'emailAlreadyExists' })
  title: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(6)
  // password?: string;
}
