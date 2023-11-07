import { IBaseRepository } from 'src/repositories/bases/base.interface.repository';
import { Track } from '../entities/track.entity';

export interface ITracksRepository extends IBaseRepository<Track> {}
