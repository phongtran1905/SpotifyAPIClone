import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  USERS_REPOSITORY,
  UsersRepository,
} from 'src/repositories/users.repository';
import { Playlist } from '../playlists/entities/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Playlist])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
