import { Module } from '@nestjs/common';
import { UserSessionsService } from './user-sessions.service';
import { UserSessionsController } from './user-sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from './entities/user-sessions.entity';
import {
  USER_SESSIONS_REPOSITORY,
  UserSessionsRepository,
} from 'src/repositories/user-sessions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  controllers: [UserSessionsController],
  providers: [
    UserSessionsService,
    {
      provide: USER_SESSIONS_REPOSITORY,
      useClass: UserSessionsRepository,
    },
  ],
  exports: [UserSessionsService],
})
export class UserSessionsModule {}
