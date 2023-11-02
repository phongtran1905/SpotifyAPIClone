import { Injectable } from '@nestjs/common';
import { ABaseRepository } from './bases/base.abstract.repository';
import { Role } from 'src/modules/roles/entities/role.entity';
import { IRolesRepository } from 'src/modules/roles/interfaces/roles.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const ROLES_REPOSITORY = 'roles_repository';
@Injectable()
export class RolesRepository
  extends ABaseRepository<Role>
  implements IRolesRepository
{
  constructor(@InjectRepository(Role) rolesRepository: Repository<Role>) {
    super(rolesRepository);
  }
}
