import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findUsersWithPagination(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.usersService.findUsersWithPagination(page, limit);
  }

  @Get(':id')
  async findUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.findOneByCondition({ id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateOneByCondition(
      { id },
      { ...updateUserDto },
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.deleteOneByCondition({ id });
  }
}
