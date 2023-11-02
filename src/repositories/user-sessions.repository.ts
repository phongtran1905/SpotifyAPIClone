import { Injectable } from '@nestjs/common';
import { ABaseRepository } from './bases/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSession } from 'src/modules/user-sessions/entities/user-sessions.entity';
import { IUserSessionsRepository } from 'src/modules/user-sessions/interfaces/user-sessions.repository.interface';

export const USER_SESSIONS_REPOSITORY = 'user_sessions_repository';
@Injectable()
export class UserSessionsRepository
  extends ABaseRepository<UserSession>
  implements IUserSessionsRepository
{
  constructor(
    @InjectRepository(UserSession) sessionsRepository: Repository<UserSession>,
  ) {
    super(sessionsRepository);
  }
}
