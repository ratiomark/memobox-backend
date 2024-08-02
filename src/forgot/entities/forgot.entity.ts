import { ApiProperty } from '@nestjs/swagger';
import { Forgot, User } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class ForgotEntity implements Forgot {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({
    example: '2e1d14e7415b25a5c9006947ff6968a717bb50b3eac574e2abecb0a7f04c9c6d',
  })
  hash: string;

  @ApiProperty({ type: UserEntity })
  userId: User['id'] | null;

  @ApiProperty({ example: '2022-10-21T14:48:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2022-10-21T14:48:00.000Z', required: false })
  deletedAt: Date | null;
}
