import { IBaseRepository } from 'src/repositories/bases/base.interface.repository';
import { User } from '../entities/user.entity';

export interface IUsersRepository extends IBaseRepository<User> {
  findManyWithPagination(page: number, limit: number): Promise<User[]>;
}
