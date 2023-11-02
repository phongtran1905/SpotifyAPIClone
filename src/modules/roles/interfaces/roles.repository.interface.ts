import { IBaseRepository } from 'src/repositories/bases/base.interface.repository';
import { Role } from '../entities/role.entity';

export interface IRolesRepository extends IBaseRepository<Role> {}
