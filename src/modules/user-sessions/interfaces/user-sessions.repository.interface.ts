import { IBaseRepository } from 'src/repositories/bases/base.interface.repository';
import { UserSession } from '../entities/user-sessions.entity';

export interface IUserSessionsRepository extends IBaseRepository<UserSession> {}
