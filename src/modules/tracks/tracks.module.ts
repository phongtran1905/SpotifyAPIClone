import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import {
  TRACKS_REPOSITORY,
  TracksRepository,
} from 'src/repositories/tracks.repository';
import { GenresModule } from '../genres/genres.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), GenresModule, UsersModule],
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: TRACKS_REPOSITORY,
      useClass: TracksRepository,
    },
  ],
  exports: [TracksService],
})
export class TracksModule {}
