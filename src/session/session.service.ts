import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, Role, Session, User } from '@prisma/client';
import { NullableType } from '../utils/types/nullable.type';
import { GetBatchResult } from '@prisma/client/runtime/library';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    where: Prisma.SessionWhereUniqueInput,
  ): Promise<NullableType<Session>> {
    return this.prisma.session.findUnique({
      where,
    });
  }

  async findOneWithUser(
    where: Prisma.SessionWhereUniqueInput,
  ): Promise<
    NullableType<
      Session & { user: NullableType<User & { role: NullableType<Role> }> }
    >
  > {
    return this.prisma.session.findUnique({
      where,
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findMany(where: Prisma.SessionWhereInput): Promise<Session[]> {
    return this.prisma.session.findMany({
      where,
    });
  }

  async create(data: { userId: number }) {
    return await this.prisma.session.create({
      data: {
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }

  async softDelete({
    excludeId,
    ...criteria
  }: {
    id?: Session['id'];
    user?: Pick<User, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void | GetBatchResult> {
    console.log('criteria', criteria);
    console.log('excludeId', excludeId);
    console.log('user', criteria.user);
    const updateManyResult = await this.prisma.session.updateMany({
      where: {
        ...criteria,
        id: criteria.id
          ? criteria.id
          : excludeId
          ? { not: { equals: excludeId } }
          : undefined,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    console.log('updateManyResult', updateManyResult);
    return updateManyResult;
  }
}
