import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ABaseService } from 'src/services/base/base.abstract.service';
import { Track } from './entities/track.entity';
import {
  TRACKS_REPOSITORY,
  TracksRepository,
} from 'src/repositories/tracks.repository';
import { GenresService } from '../genres/genres.service';
import { DeepPartial } from 'typeorm';
import { Genre } from '../genres/entities/genre.entity';
import { UsersService } from '../users/users.service';
import { NullableType } from 'src/utils/types/nullable.type';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TracksService extends ABaseService<Track> {
  constructor(
    @Inject(TRACKS_REPOSITORY)
    private readonly tracksRepository: TracksRepository,
    private readonly genresService: GenresService,
    private readonly usersService: UsersService,
  ) {
    super(tracksRepository);
  }

  async findTracksWithPagination(page: number, limit: number) {
    return await this.tracksRepository.findManyWithPagination(page, limit);
  }

  async createTrackOfUser(
    genreID: number,
    userID: string,
    payload: DeepPartial<Track>,
  ) {
    const user: NullableType<User> = await this.usersService.findOneByCondition(
      { id: userID },
    );
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found user`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const genre: NullableType<Genre> =
      await this.genresService.findOneByCondition({ id: genreID });
    if (!genre) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found genre`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.createOne({ ...payload, genre, user });
  }
}
