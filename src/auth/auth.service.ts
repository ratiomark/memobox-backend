import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  // UnauthorizedException,х
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthProviders, Session, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import ms from 'ms';
import { AllConfigType } from '@/config/config.type';
import { SessionService } from '@/session/session.service';
import { UsersService } from '@/users/users.service';
import { ForgotService } from '../forgot/forgot.service';
import { MailService } from '../mail/mail.service';
import { RoleEnum } from '../roles/roles.enum';
import { SocialInterface } from '../social/interfaces/social.interface';
import { StatusEnum } from '../statuses/statuses.enum';
import { UserEntity } from '../users/entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import {
  LoginResponseType,
  LoginResponseTypeProd,
  RefreshInitResponseType,
} from './types/login-response.type';
import { DevResponseService } from '@/dev-response/dev-response.service';
import { TeapotException } from '@/common/exceptions/teapot-exception';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Lambda } from 'aws-sdk';
import { LambdaService } from '@/aws/lambda.service';
import { register } from 'module';
import { EMAIL_TYPES } from '@/common/const/email-types';
import { UserLoginResponseDto } from '@/users/dto/user-login-response.dto';
import { classToPlain, instanceToPlain } from 'class-transformer';
import { ServerLessService } from '@/server-less/server-less.service';
// нельзя импортировать из prisma, т.к. ломается билд
// import {
//   jsonSavedDataDefault,
//   jsonSettingsDefault,
// } from 'prisma/mock-data/json-data-and-settings';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly sessionService: SessionService,
    private readonly forgotService: ForgotService,
    private readonly mailService: MailService,
    private readonly devResponseService: DevResponseService,
    private readonly eventEmitter: EventEmitter2,
    // private readonly lambda: LambdaService,
    // private readonly serverless: ServerLessService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseTypeProd> {
    const user = await this.usersService.findOneByEmailWithJsonData({
      where: { email: loginDto.email },
    });
    // const user = await this.usersService.findOneByEmail({
    //   where: { email: loginDto.email },
    //   include: { dataAndSettingsJson: true },
    // });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (user.deletedAt) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'User has been deleted',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (user.provider !== AuthProviders.EMAIL) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: `needLoginViaProvider:${user.provider}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!user.password) {
      throw new HttpException('needResetPassword', HttpStatus.UNAUTHORIZED);
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const session = await this.sessionService.create({ userId: user.id });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.roleId,
      sessionId: session.id,
    });

    const userResponseDto = new UserLoginResponseDto(user);
    return {
      refreshToken,
      token,
      tokenExpires,
      user: userResponseDto, // Преобразуем DTO в простой объект для ответа
    };
    // return {
    //   refreshToken,
    //   token,
    //   tokenExpires,
    //   user: {
    //     // ...user,
    //     id: user.id,
    //     roleId: user.roleId,
    //     jsonSavedData: user.jsonSavedData,
    //     jsonSettings: user.jsonSettings,
    //     email: user.email ?? '???',
    //     firstName: user.firstName ?? '???',
    //     emailVerified: user.statusId === StatusEnum.ACTIVE,
    //     // userData: {
    //     // },
    //   },
    // };
  }

  private async getTokensData(data: {
    id: User['id'];
    role: User['roleId'];
    sessionId: Session['id'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const refreshTokenExpiresIn = this.configService.getOrThrow(
      'auth.refreshExpires',
      {
        infer: true,
      },
    );
    const tokenExpires = Date.now() + ms(tokenExpiresIn);
    const refreshTokenExpires = Date.now() + ms(refreshTokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          // expiresIn: '8d',
          expiresIn: refreshTokenExpires,
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async validateSocialLogin(
    authProvider: AuthProviders,
    socialData: SocialInterface,
  ): Promise<LoginResponseType> {
    let user = await this.usersService.findOneBySocialIdAndProvider(
      socialData.id,
      authProvider,
    );

    const socialEmail = socialData.email?.toLowerCase() ?? null;
    if (!user && socialEmail) {
      user = await this.usersService.findOneByEmail({
        where: { email: socialEmail },
      });
    }

    if (!user) {
      user = await this.usersService.create({
        email: socialEmail,
        firstName: socialData.firstName ?? '',
        // fullname: socialData.name ?? null,
        // firstName: socialData.firstName ?? null,
        // lastName: socialData.lastName ?? null,
        socialId: socialData.id,
        provider: authProvider,
        roleId: RoleEnum.USER,
        statusId: StatusEnum.ACTIVE,
        timezone: 'UTC',
      });
    } else {
      await this.usersService.updateByUserId(user.id, {
        email: user.email ?? socialEmail,
      });
    }

    const session = await this.sessionService.create({ userId: user.id });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.roleId,
      sessionId: session.id,
    });
    // const userResponse = new UserEntity({
    //   ...user,
    //   jsonSavedData: jsonSavedDataDefault,
    //   jsonSettings: jsonSettingsDefault,
    // });
    // const newUser = new UserEntity(...user, )
    // user.jsonSavedData = jsonSavedDataDefault;
    // user.jsonSettings = jsonSettingsDefault;
    return {
      refreshToken,
      token,
      tokenExpires,
      user,
      // user: {
      //   ...user,
      //   // jsonSavedData: user.jsonSavedData,
      //   // jsonSettings: user.jsonSettings,
      //   // email: user.email ?? '???',
      //   // firstName: user.firstName ?? '???',
      //   // userData: {
      //   // },
      // },
    };
  }

  async register(
    dto: AuthRegisterLoginDto,
    // language: string,
  ): Promise<void | { id: string }> {
    this.logger.log('register new user - start');
    const language = dto.language;
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.create({
      ...dto,
      email: dto.email.toLowerCase(),
      roleId: RoleEnum.USER,
      statusId: StatusEnum.INACTIVE,
      hash,
      language,
    });
    // return userCreated;
    // await this.validateLogin({ email: dto.email, password: dto.password });
    const url = `${this.configService.getOrThrow('app.frontendDomain', {
      infer: true,
    })}/confirm-email?hash=${hash}`;

    void this.mailService.sendEmail({
      to: dto.email,
      emailType: EMAIL_TYPES.welcome,
      language,
      data: {
        hash: url,
        name: dto.firstName,
      },
    });

    this.logger.log('register new user - end');
    return { id: user.id };

    // return this.devResponseService.sendResponseIfDev({ hash });
    // }
  }

  async confirmEmail(
    hash: string,
  ): Promise<void | { email_confirmed: boolean }> {
    await this.usersService.updateByWhere(
      { hash },
      {
        hash: null,
        statusId: StatusEnum.ACTIVE,
      },
    );

    return this.devResponseService.sendResponseIfDev({ email_confirmed: true });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOneByEmail({
      where: { email },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    await this.forgotService.create({
      hash,
      user: {
        connect: {
          id: user.id,
        },
      },
    });
    const url = `${this.configService.getOrThrow('app.frontendDomain', {
      infer: true,
    })}/forgot-password?hash=${hash}`;
    // this.logger.debug(JSON.stringify(user, null, 3));
    void this.mailService.sendEmail({
      to: email,
      language: user.language ?? 'en',
      emailType: 'forgotPassword',
      data: {
        hash: url,
        name: user.firstName!,
      },
    });
  }

  async resetPassword(hash: string, newPassword: string): Promise<void> {
    const forgot = await this.forgotService.findOneByHash(hash);

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // TODO: If user was not found
    if (!forgot.user) {
      return;
    }

    const user = forgot.user;

    await this.sessionService.softDelete({
      user: {
        id: user.id,
      },
    });

    await this.usersService.updateByUserId(user.id, { password: newPassword });

    await this.forgotService.softDelete(forgot.id);
  }

  async me(userId: User['id']): Promise<User | null> {
    // async me(userJwtPayload: JwtPayloadType): Promise<User | null> {
    return this.usersService.findOne({
      where: {
        id: userId,
      },
      include: {
        file: true,
      },
    });
  }

  async update(
    userJwtPayload: JwtPayloadType,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.usersService.findOne({
          where: { id: userJwtPayload.id },
        });

        if (!currentUser) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: { user: 'userNotFound' },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const isValidOldPassword = await bcrypt.compare(
          userDto.oldPassword,
          currentUser.password || '',
        );

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: { oldPassword: 'incorrectOldPassword' },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        await this.sessionService.softDelete({
          user: { id: currentUser.id },
          excludeId: userJwtPayload.sessionId,
        });
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: { oldPassword: 'missingOldPassword' },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { oldPassword, ...updateData } = userDto;
      console.log(
        new UserEntity(
          await this.usersService.updateByUserId(userJwtPayload.id, updateData),
        ),
      );
    } catch (error) {
      console.error('Error in update method:', error);
      throw error;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { oldPassword, ...updateData } = userDto;
    return new UserEntity(
      await this.usersService.updateByUserId(userJwtPayload.id, updateData),
    );
  }

  async refreshToken(
    sessionId: number,
  ): Promise<Omit<LoginResponseType, 'user'>> {
    const session = await this.sessionService.findOneWithUser({
      id: sessionId,
    });

    if (!session || !session.user) {
      throw new TeapotException();
      // throw new UnauthorizedException();
    }

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      role: session.user.roleId,
      sessionId: session.id,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
      // user: {
      //   ...session.user,
      // },
    };
  }

  async refreshTokenInit(
    sessionId: number,
    userId: User['id'],
  ): Promise<RefreshInitResponseType> {
    // ): Promise<Omit<LoginResponseType, 'user'>> {
    const [session, user] = await Promise.all([
      this.sessionService.findOneWithUser({
        id: sessionId,
      }),
      this.usersService.findOneWithJsonData({
        where: { id: userId },
      }),
    ]);

    if (!session || !session.user) {
      throw new TeapotException();
    }
    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      role: session.user.roleId,
      sessionId: session.id,
    });

    const userResponseDto = new UserLoginResponseDto(user);
    return {
      refreshToken,
      token,
      tokenExpires,
      user: userResponseDto, // Преобразуем DTO в простой объект для ответа
    };
    // return {
    //   token,
    //   refreshToken,
    //   tokenExpires,
    //   user: {
    //     jsonSavedData: user.dataAndSettingsJson?.jsonSavedData,
    //     jsonSettings: user.dataAndSettingsJson?.jsonSettings,
    //     email: user.email ?? '???',
    //     firstName: user.firstName ?? '???',
    //     // userData: {
    //     // },
    //   },
    //   // user: {
    //   //   jsonSavedData: user.dataAndSettingsJson?.jsonSavedData,
    //   //   jsonSettings: user.dataAndSettingsJson?.jsonSettings,
    //   //   email: user.email ?? '???',
    //   //   firstName: user.firstName ?? '???',
    //   //   // userData: {
    //   //   // },
    //   // },
    // };
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }

  async logout(sessionId: number) {
    // async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.softDelete({
      id: sessionId,
    });
  }
}
