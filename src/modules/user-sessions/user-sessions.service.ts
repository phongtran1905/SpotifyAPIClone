import { Inject, Injectable } from '@nestjs/common';
import { ABaseService } from 'src/services/base/base.abstract.service';
import { UserSession } from './entities/user-sessions.entity';
import {
  USER_SESSIONS_REPOSITORY,
  UserSessionsRepository,
} from 'src/repositories/user-sessions.repository';

@Injectable()
export class UserSessionsService extends ABaseService<UserSession> {
  constructor(
    @Inject(USER_SESSIONS_REPOSITORY)
    userSessionsRepository: UserSessionsRepository,
  ) {
    super(userSessionsRepository);
  }
}
