import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { IPaginationOptions } from '@/utils/types/pagination-options';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { AuthProviders, Prisma, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import {
  UpdateJsonSavedDataDto,
  UpdateJsonSettingsDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import {
  jsonSavedDataDefault,
  jsonSettingsDefault,
} from '../common/const/json-saved-data-and-settings-default';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT_USER_CREATED } from '@/common/const/events';
import { UserId } from '@/common/types/prisma-entities';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let hashedPassword = createUserDto.password;
    if (hashedPassword) {
      hashedPassword = await this.hashPassword(hashedPassword);
    }

    const { roleId, statusId, photoId, ...restUserData } = createUserDto;
    const userData: Prisma.UserCreateInput = {
      ...restUserData,
      password: hashedPassword,
      dataAndSettingsJson: {
        create: {
          jsonSavedData:
            jsonSavedDataDefault as unknown as Prisma.InputJsonValue,
          jsonSettings: jsonSettingsDefault as unknown as Prisma.InputJsonValue,
        },
      },
    };

    if (photoId) {
      userData.file = { connect: { id: photoId } };
    }
    if (roleId) {
      userData.role = { connect: { id: roleId } };
    }
    if (statusId) {
      userData.status = { connect: { id: statusId } };
    }

    const createdUser = await this.prisma.user.create({ data: userData });
    this.eventEmitter.emit(EVENT_USER_CREATED, {
      email: createdUser.email,
      userId: createdUser.id,
    });
    return new UserEntity({
      ...createdUser,
      provider: createdUser.provider as AuthProviders,
    });
  }

  async createV2(createUserDto: CreateUserDto): Promise<User> {
    let hashedPassword = createUserDto.password;
    if (hashedPassword) {
      hashedPassword = await this.hashPassword(hashedPassword);
    }

    const { roleId, statusId, photoId, ...restUserData } = createUserDto;
    console.log('photoId', photoId);
    console.log('roleId', roleId);
    console.log('restUserData', restUserData);
    const createdUser = await this.prisma.user.create({
      data: {
        ...restUserData,
        password: hashedPassword,
        // file: { connect: { id: photoId ?? undefined } },
        role: { connect: { id: roleId ?? undefined } },
        status: { connect: { id: statusId ?? undefined } },
        dataAndSettingsJson: {
          create: {
            jsonSavedData:
              jsonSavedDataDefault as unknown as Prisma.InputJsonValue,
            jsonSettings:
              jsonSettingsDefault as unknown as Prisma.InputJsonValue,
          },
        },
      },
    });
    // await this.prisma.jsonDataAndSettings.create({
    //   data: {
    //     user: { connect: {  userId: createdUser.id  } },
    //   },
    // });

    return new UserEntity({
      ...createdUser,
      provider: createdUser.provider as AuthProviders,
    });
  }

  async findMany(params: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: Prisma.UserWhereInput = {};
    if (filterOptions?.roles?.length) {
      where.role = {
        id: {
          in: filterOptions.roles.map((role) => role.id),
        },
      };
    }

    const orderBy =
      sortOptions?.map((sort) => ({
        [sort.orderBy]: sort.order,
      })) || [];

    // FIXME: Consider using Prisma's `select` for better performance and to exclude sensitive fields.
    const users = await this.prisma.user.findMany({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      orderBy,
    });

    return users.map(
      (user) =>
        new UserEntity({
          ...user,
          provider: user.provider as AuthProviders,
        }),
    );
  }

  async findOne(params: Prisma.UserFindUniqueArgs): Promise<User> {
    const user = await this.prisma.user.findUnique(params);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserEntity(user);
  }

  async findOneWithJsonData(params: Prisma.UserFindUniqueArgs) {
    const user = await this.prisma.user.findUnique({
      ...params,
      include: { dataAndSettingsJson: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserEntity({
      ...user,
      jsonSavedData: user.dataAndSettingsJson?.jsonSavedData,
      jsonSettings: user.dataAndSettingsJson?.jsonSettings,
    });
  }

  async findOneByEmail(params: {
    where: Prisma.UserWhereUniqueInput;
    include?: Prisma.UserInclude;
  }) {
    // }): Promise<User | null> {
    const user = await this.prisma.user.findUnique(params);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserEntity(user);
  }

  async findOneByEmailWithJsonData(params: Prisma.UserFindUniqueArgs) {
    const user = await this.prisma.user.findUnique({
      ...params,
      include: { dataAndSettingsJson: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserEntity({
      ...user,
      jsonSavedData: user.dataAndSettingsJson?.jsonSavedData,
      jsonSettings: user.dataAndSettingsJson?.jsonSettings,
    });
  }

  async findOneBySocialIdAndProvider(
    socialId: string,
    provider: AuthProviders,
  ) {
    // ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        socialId,
        provider,
      },
      // include: { dataAndSettingsJson: true },
    });
  }

  async updateByUserId(id: UserId, payload: UpdateUserDto): Promise<User> {
    if (payload.password) {
      payload.password = await this.hashPassword(payload.password);
    }

    return this.prisma.user.update({
      where: { id },
      data: payload,
      include: {
        file: true,
      },
    });
  }

  async updateJsonSavedData(id: UserId, payload: UpdateJsonSavedDataDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        dataAndSettingsJson: {
          update: {
            jsonSavedData: payload as unknown as Prisma.InputJsonObject,
          },
        },
      },
      include: {
        dataAndSettingsJson: true,
      },
    });
    return user.dataAndSettingsJson?.jsonSavedData;
  }

  async updateJsonSettings(id: UserId, payload: UpdateJsonSettingsDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        dataAndSettingsJson: {
          update: {
            jsonSettings: payload as unknown as Prisma.InputJsonObject,
          },
        },
      },
      include: {
        dataAndSettingsJson: true,
      },
    });
    return user.dataAndSettingsJson?.jsonSettings;
  }

  async updateByWhere(
    where: Prisma.UserWhereUniqueInput,
    payload: UpdateUserDto,
  ): Promise<User> {
    if (payload.password) {
      payload.password = await this.hashPassword(payload.password);
    }

    return this.prisma.user.update({
      where,
      data: payload,
      include: {
        file: true,
      },
    });
  }

  async softDelete(id: UserId): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
