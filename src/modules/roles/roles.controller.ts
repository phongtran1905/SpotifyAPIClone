import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleEnum } from './roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';

@ApiTags('role')
@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard('access-token'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  async getRoles() {
    return await this.rolesService.findAll();
  }
}
