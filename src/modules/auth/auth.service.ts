import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { NullableType } from 'joi';
import { User } from '../users/entities/user.entity';
import { LoginResponseType } from 'src/utils/types/login-response.type';
import { JwtService } from '@nestjs/jwt';
import { DeepPartial } from 'typeorm';
import {
  accessTokenPrivateKey,
  refreshTokenPrivateKey,
} from 'src/constraints/jwt.constrant';
import { UserSessionsService } from '../user-sessions/user-sessions.service';
import { UserSession } from '../user-sessions/entities/user-sessions.entity';
import * as bcrypt from 'bcrypt';
import { MailsService } from '../mails/mails.service';
import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { StatusEnum } from '../users/enums/status.enum';
import { ForgotService } from '../forgot/forgot.service';
import { Forgot } from '../forgot/entities/forgot.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userSessionsService: UserSessionsService,
    private readonly jwtService: JwtService,
    private readonly mailsService: MailsService,
    private readonly forgotService: ForgotService,
  ) {}

  async me(id: string) {
    return await this.usersService.findOneByCondition({ id });
  }

  async register(data: DeepPartial<User>): Promise<void> {
    const existUser = await this.usersService.findOneByCondition({
      email: data.email,
    });

    if (existUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: 'Email was used',
        },
        HttpStatus.CONFLICT,
      );
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    await this.usersService.createOne({
      ...data,
      hash,
    });

    await this.mailsService.userRegister({ to: data.email, data: { hash } });
  }

  async confirmEmail(hash: string): Promise<void> {
    const user: NullableType<User> = await this.usersService.findOneByCondition(
      { hash },
    );
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user.hash = null;
    user.status = StatusEnum.ACTIVE;
    await this.usersService.saveOne(user);
  }

  async login(user: User): Promise<LoginResponseType> {
    const userSession = await this.userSessionsService.createOne({
      user: user as User,
    });

    const { accessToken, refreshToken } = await this.getTokensData({
      id: user.id,
      role: user.role,
      userSessionId: userSession.id,
    });

    return {
      accessToken,
      refreshToken,
      user: user,
    };
  }

  async logout(id: string): Promise<void> {
    await this.userSessionsService.deleteOneByCondition({ id });
  }

  async refresh(id: string): Promise<Omit<LoginResponseType, 'user'>> {
    const userSession = await this.userSessionsService.findOneByCondition({
      id,
    });

    if (!userSession) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken } = await this.getTokensData({
      id: userSession.user.id,
      role: userSession.user.role,
      userSessionId: userSession.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<void> {
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'Incorrect password',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAuthenticatedUser(email: string, password: string): Promise<User> {
    const exitUser: NullableType<User> =
      await this.usersService.findOneByCondition({ email });

    if (!exitUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: 'Your email is wrong',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (exitUser.status == StatusEnum.INACTIVE) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: 'Your account is not activated',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.verifyPassword(password, exitUser.password);

    return exitUser;
  }

  private async getTokensData(data: {
    id: User['id'];
    role: User['role'];
    userSessionId: UserSession['id'];
  }) {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          userSessionId: data.userSessionId,
        },
        {
          privateKey: accessTokenPrivateKey,
          expiresIn: '15m',
          algorithm: 'RS256',
        },
      ),
      await this.jwtService.signAsync(
        {
          userSessionId: data.userSessionId,
        },
        {
          privateKey: refreshTokenPrivateKey,
          expiresIn: '365d',
          algorithm: 'RS256',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async forgotPassword(email: string): Promise<void> {
    const user: NullableType<User> = await this.usersService.findOneByCondition(
      { email },
    );

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'Email is not exit',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    await this.forgotService.createOne({ hash, user });

    await this.mailsService.userForgotPassword({
      to: user.email,
      data: { hash },
    });
  }

  async resetPassword(hash: string, newPassword: string): Promise<void> {
    const forgot: NullableType<Forgot> =
      await this.forgotService.findOneByCondition({ hash });

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const user = forgot.user;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);

    await this.forgotService.deleteOneByCondition({ id: forgot.id });

    await this.userSessionsService.deleteOneByCondition({
      user: { id: user.id },
    });

    await this.usersService.saveOne(user);
  }
}
