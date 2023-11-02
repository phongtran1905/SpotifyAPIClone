import { Inject, Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { ABaseService } from 'src/services/base/base.abstract.service';
import {
  ROLES_REPOSITORY,
  RolesRepository,
} from 'src/repositories/roles.repository';

@Injectable()
export class RolesService extends ABaseService<Role> {
  constructor(@Inject(ROLES_REPOSITORY) rolesRepository: RolesRepository) {
    super(rolesRepository);
  }
}
