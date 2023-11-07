import { Playlist } from 'src/modules/playlists/entities/playlist.entity';
import { ABaseRepository } from './bases/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPlaylistsRepository } from 'src/modules/playlists/interfaces/playlists.repository.interface';

export const PLAYLISTS_REPOSITORY = 'playlists_repository';
@Injectable()
export class PlaylistsRepository
  extends ABaseRepository<Playlist>
  implements IPlaylistsRepository
{
  constructor(
    @InjectRepository(Playlist) playlistsRepository: Repository<Playlist>,
  ) {
    super(playlistsRepository);
  }
}
