import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepository,
} from 'src/repositories/users.repository';
import { ABaseService } from 'src/services/base/base.abstract.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends ABaseService<User> {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepository,
  ) {
    super(usersRepository);
  }

  async findManyWithPagination(page: number, limit: number): Promise<User[]> {
    return await this.usersRepository.findManyWithPagination(page, limit);
  }
}
