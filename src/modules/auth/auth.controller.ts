import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RefreshAuthGuard } from './guards/refresh.guard';
import { RoleEnum } from '../roles/roles.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async me(@Request() request) {
    return await this.authService.me(request.user.id);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const role =
      registerDto.role === RoleEnum.ARTIST
        ? { id: RoleEnum.ARTIST, name: 'Artist' }
        : { id: RoleEnum.USER, name: 'User' };

    return await this.authService.register({ ...registerDto, role });
  }

  @ApiBody({
    type: LoginDto,
    examples: {
      No: {
        value: {
          email: 'tranthino123@gmail.com',
          password: 'tranthino123',
        } as LoginDto,
      },
      Phong: {
        value: {
          email: 'tranphong123@gmail.com',
          password: 'tranphong123',
        } as LoginDto,
      },
      Admin: {
        value: {
          email: 'spotifyadmin123@gmail.com',
          password: 'spotifyadmin123',
        } as LoginDto,
      },
      AlanWalker: {
        value: {
          email: 'alanwalker123@gmail.com',
          password: 'alanwalker123',
        } as LoginDto,
      },
      Rodrigo: {
        value: {
          email: 'olivarodrigo123@gmail.com',
          password: 'olivarodrigo123',
        } as LoginDto,
      },
    },
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Request() request) {
    return await this.authService.login(request.user);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Request() request) {
    await this.authService.logout(request.user.userSessionId);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Request() request) {
    return await this.authService.refresh(request.user.userSessionId);
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(@Body() confirmEmailDto: ConfirmEmailDto) {
    return await this.authService.confirmEmail(confirmEmailDto.hash);
  }

  @Post('forgot')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
  }
}
