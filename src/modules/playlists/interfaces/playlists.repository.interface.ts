import { IBaseRepository } from 'src/repositories/bases/base.interface.repository';
import { Playlist } from '../entities/playlist.entity';

export interface IPlaylistsRepository extends IBaseRepository<Playlist> {}
