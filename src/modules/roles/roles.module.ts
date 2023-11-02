import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import {
  ROLES_REPOSITORY,
  RolesRepository,
} from 'src/repositories/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [
    RolesService,
    {
      provide: ROLES_REPOSITORY,
      useClass: RolesRepository,
    },
  ],
})
export class RolesModule {}
