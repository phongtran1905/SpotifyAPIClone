import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ABaseService } from 'src/services/base/base.abstract.service';
import { Genre } from './entities/genre.entity';
import {
  GENRE_REPOSITORY,
  GenresRepository,
} from 'src/repositories/genres.repository';
import { DeepPartial } from 'typeorm';

@Injectable()
export class GenresService extends ABaseService<Genre> {
  constructor(@Inject(GENRE_REPOSITORY) genresRepository: GenresRepository) {
    super(genresRepository);
  }

  async createOne(payload: DeepPartial<Genre>): Promise<Genre> {
    const existGenre = await this.findOneByCondition({ title: payload.title });

    if (existGenre) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: 'Genre is exit',
        },
        HttpStatus.CONFLICT,
      );
    }

    return await this.repository.createOne(payload);
  }
}
