import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsNotExist } from '@/utils/validators/is-not-exists.validator';
import { FileEntity } from '@/files/entities/file.entity';
import { IsExist } from '@/utils/validators/is-exists.validator';
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';
import { RoleEntity } from '../../roles/entities/role.entity';
import { StatusEntity } from '../../statuses/entities/status.entity';
import { AuthProviders } from '@prisma/client';
import { jsonSavedDataDefault } from '../../common/const/json-saved-data-and-settings-default';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @Validate(IsNotExist, ['USER'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: AuthProviders;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({ type: FileEntity })
  @IsOptional()
  @IsString()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photoId?: string | null;

  @ApiProperty({ type: RoleEntity })
  @IsOptional()
  @IsInt()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  roleId?: number | null;

  @ApiProperty({ type: StatusEntity })
  @IsOptional()
  @IsInt()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  statusId?: number | null;

  hash?: string | null;
}

export class UpdateJsonSavedDataDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  commonShelfCollapsed: boolean;

  @ApiProperty({ example: '2' })
  @IsOptional()
  viewPageCardRowsCount?: string;

  @ApiProperty({ example: jsonSavedDataDefault.viewPageColumns })
  @ValidateNested({ each: true })
  @Type(() => SortColumnObject)
  viewPageColumns: SortColumnObject[];
  // @ApiProperty({ example: 'John' })
  // @IsOptional()
}

export class SortColumnObject {
  @IsNotEmpty()
  value: SortColumnValue;
  @IsNotEmpty()
  content: string;
  @IsBoolean()
  enabled: boolean;
  @IsInt()
  index: number;
}

export type SortColumnValue =
  | 'shelfId'
  | 'createdAt'
  | 'lastTraining'
  | 'nextTraining';
