import { ApiProperty } from '@nestjs/swagger';
import { AuthProviders, User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '36d29595-a665-4403-8e5f-900bb6ee3b75' })
  id: User['id'];

  @ApiProperty({ example: 'user@example.com', required: false, nullable: true })
  @Expose({ groups: ['ME', 'ADMIN'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password: string;
  // password: string | null;

  // NOTE: do i need this here?
  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  // FIXME: del string from provider types
  @ApiProperty({ example: AuthProviders.EMAIL, enum: AuthProviders })
  @Expose({ groups: ['ME', 'ADMIN'] })
  provider: AuthProviders;

  @ApiProperty({ example: '1234567890', required: false, nullable: true })
  @Expose({ groups: ['ME', 'ADMIN'] })
  @Exclude({ toPlainOnly: true })
  socialId: string | null;

  @ApiProperty({ example: 'John', required: false, nullable: true })
  firstName: string | null;

  @ApiProperty({ example: 'Doe', required: false, nullable: true })
  lastName: string | null;

  @ApiProperty({ example: 1, required: false, nullable: true })
  @Exclude({ toPlainOnly: true })
  photoId: string | null;

  @ApiProperty({ example: 1, required: false, nullable: true })
  @Exclude({ toPlainOnly: true })
  roleId: number | null;

  @ApiProperty({ example: 1, required: false, nullable: true })
  @Exclude({ toPlainOnly: true })
  statusId: number | null;

  @ApiProperty({
    example: '$2a$10$iZD60DpMaubTI1EB.p/YruKGxUP4xO.lll7kDBtnDW2QyhM8lsw1q',
    required: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @ApiProperty({
    example: 'ru',
    required: false,
    nullable: false,
  })
  language: string | null;

  @ApiProperty({
    example: 'Moscow/Europe',
    required: true,
    default: 'UTC',
    nullable: false,
  })
  timezone: string | null;

  @ApiProperty({
    example: 'Israel',
    required: false,
    nullable: true,
  })
  country: string | null;

  @ApiProperty({ example: '2022-10-21T14:48:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2022-10-21T14:48:00.000Z' })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-10-21T14:48:00.000Z',
    required: false,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  deletedAt: Date | null;

  @Exclude({ toPlainOnly: true })
  file: any;
  // @ApiProperty({
  //   example: '2022-10-21T14:48:00.000Z',
  //   required: false,
  //   nullable: true,
  // })
  jsonSavedData: any;
  jsonSettings: any;
}
