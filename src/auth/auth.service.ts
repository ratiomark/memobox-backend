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
  RefreshInitResponseType,
} from './types/login-response.type';
import { DevResponseService } from '@/dev-response/dev-response.service';
import { TeapotException } from '@/common/exceptions/teapot-exception';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseType> {
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
    // const dataAndSettingsJson = await this.

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.roleId,
      sessionId: session.id,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
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
        // username: toKebabCase(socialData.name),
        // fullname: socialData.name ?? null,
        // firstName: socialData.firstName ?? null,
        // lastName: socialData.lastName ?? null,
        socialId: socialData.id,
        provider: authProvider,
        roleId: RoleEnum.USER,
        statusId: StatusEnum.ACTIVE,
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

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<void | { hash: string }> {
    this.logger.log('register new user - start');
    // async register(dto: AuthRegisterLoginDto): Promise<User> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    await this.usersService.create({
      ...dto,
      // ...dto,
      email: dto.email.toLowerCase(),
      roleId: RoleEnum.USER,
      statusId: StatusEnum.INACTIVE,
      hash,
    });
    // return userCreated;
    // await this.validateLogin({ email: dto.email, password: dto.password });
    this.logger.log('register new user - end');
    return this.devResponseService.sendResponseIfDev({ hash });
  }

  // await this.mailService.userSignUp({
  //   to: dto.email,
  //   data: {
  //     hash,
  //   },
  // });

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
    const user = await this.usersService.findOneByEmail({ where: { email } });
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

    await this.mailService.forgotPassword({
      to: email,
      data: {
        hash,
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
    return {
      token,
      refreshToken,
      tokenExpires,
      user: {
        jsonSavedData: user.dataAndSettingsJson?.jsonSavedData,
        jsonSettings: user.dataAndSettingsJson?.jsonSettings,
      },
    };
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
