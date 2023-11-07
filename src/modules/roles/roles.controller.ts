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
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('role')
@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRoles() {
    return await this.rolesService.findAll();
  }
}
