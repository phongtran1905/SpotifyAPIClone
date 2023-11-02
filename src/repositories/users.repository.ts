import { User } from 'src/modules/users/entities/user.entity';
import { ABaseRepository } from './bases/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/modules/users/interfaces/users.repository.interface';

export const USERS_REPOSITORY = 'users_repository';
@Injectable()
export class UsersRepository
  extends ABaseRepository<User>
  implements IUsersRepository
{
  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async findManyWithPagination(page: number, limit: number): Promise<User[]> {
    return await this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
