import { Genre } from '../entities/genre.entity';
import { IBaseRepository } from 'src/repositories/bases/base.interface.repository';

export interface IGenresRepository extends IBaseRepository<Genre> {}
