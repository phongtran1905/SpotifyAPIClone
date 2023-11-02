import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBody({
    type: LoginDto,
    examples: {
      user1: {
        value: {
          email: 'tranthino123@gmail.com',
          password: 'tranthino123',
        } as LoginDto,
      },
      user2: {
        value: {
          email: 'tranphong123@gmail.com',
          password: 'tranphong123',
        } as LoginDto,
      },
      user3: {
        value: {
          email: 'myadmin123@gmail.com',
          password: 'myadmin123',
        } as LoginDto,
      },
    },
  })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Request() request) {
    return await this.authService.login(request.user);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('access-token'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Request() request) {
    await this.authService.logout(request.user.userSessionId);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('refresh-token'))
  @HttpCode(HttpStatus.OK)
  async refresh(@Request() request) {
    try {
      return await this.authService.refresh(request.user.userSessionId);
    } catch (error) {
      throw error;
    }
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(@Body() confirmEmailDto: ConfirmEmailDto) {
    try {
      return await this.authService.confirmEmail(confirmEmailDto.hash);
    } catch (error) {
      throw error;
    }
  }

  @Post('forgot')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      return await this.authService.forgotPassword(forgotPasswordDto.email);
    } catch (error) {
      throw error;
    }
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return await this.authService.resetPassword(
        resetPasswordDto.hash,
        resetPasswordDto.password,
      );
    } catch (error) {
      throw error;
    }
  }
}
