import { Injectable } from '@nestjs/common';
import { ABaseRepository } from './bases/base.abstract.repository';
import { Genre } from 'src/modules/genres/entities/genre.entity';
import { IGenresRepository } from 'src/modules/genres/interfaces/genres.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const GENRE_REPOSITORY = 'genres_repository';
@Injectable()
export class GenresRepository
  extends ABaseRepository<Genre>
  implements IGenresRepository
{
  constructor(@InjectRepository(Genre) genresRepository: Repository<Genre>) {
    super(genresRepository);
  }
}
