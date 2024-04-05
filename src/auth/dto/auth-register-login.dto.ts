import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
// import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '@/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsNotExist, ['USER'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @MinLength(1)
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Europe/Moscow' })
  @IsOptional()
  timezone: string = 'UTC';

  // @ApiProperty({ example: 'John' })
  // @IsNotEmpty()
  // firstName: string;

  // @ApiProperty({ example: 'Doe' })
  // @IsNotEmpty()
  // lastName: string;
}
