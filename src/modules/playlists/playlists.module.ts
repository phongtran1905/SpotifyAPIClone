import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import {
  PLAYLISTS_REPOSITORY,
  PlaylistsRepository,
} from 'src/repositories/playlists.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { UsersModule } from '../users/users.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), UsersModule, TracksModule],
  controllers: [PlaylistsController],
  providers: [
    PlaylistsService,
    {
      provide: PLAYLISTS_REPOSITORY,
      useClass: PlaylistsRepository,
    },
  ],
})
export class PlaylistsModule {}
