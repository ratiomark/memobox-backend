import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';
import { StatusEnum } from '@/statuses/statuses.enum';

@Exclude()
export class UserLoginResponseDto {
  constructor(userEntity: UserEntity) {
    Object.assign(this, userEntity);
    this.emailVerified = userEntity.statusId === StatusEnum.ACTIVE; // Предполагаем, что StatusEnum.ACTIVE существует и означает активный статус пользователя
  }

  @Expose()
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty({ example: 1, required: false, nullable: true })
  roleId: number | null;

  @Expose()
  @ApiProperty({ example: 'user@example.com', required: false, nullable: true })
  email: string | null;

  @Expose()
  @ApiProperty({ example: 'John', required: false, nullable: true })
  firstName: string | null;

  @Expose()
  @ApiProperty()
  emailVerified: boolean;

  @Expose()
  @ApiProperty()
  jsonSavedData: any;

  @Expose()
  @ApiProperty()
  jsonSettings: any;
}

export class PrismaUserLoginResponseDto {
  id: string;
  email: string | null;
  roleId: number | null;
  jsonSavedData: any;
  jsonSettings: any;
  emailVerified: boolean;
  firstName: string | null;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.roleId = user.roleId;
    this.firstName = user.firstName;
    // Преобразуем данные из dataAndSettingsJson
    this.jsonSavedData = user.dataAndSettingsJson?.jsonSavedData;
    this.jsonSettings = user.dataAndSettingsJson?.jsonSettings;
    // Проверяем статус пользователя для верификации email
    this.emailVerified = user.statusId === StatusEnum.ACTIVE;
  }

  // Декораторы ApiProperty можно добавить для документации Swagger, если нужно
}
