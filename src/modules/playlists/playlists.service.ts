import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ABaseService } from 'src/services/base/base.abstract.service';
import { Playlist } from './entities/playlist.entity';
import {
  PLAYLISTS_REPOSITORY,
  PlaylistsRepository,
} from 'src/repositories/playlists.repository';
import { DeepPartial } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class PlaylistsService extends ABaseService<Playlist> {
  constructor(
    @Inject(PLAYLISTS_REPOSITORY) playlistsRepository: PlaylistsRepository,
    private readonly usersService: UsersService,
    private readonly tracksService: TracksService,
  ) {
    super(playlistsRepository);
  }

  async createPlaylistOfUser(
    userID: string,
    payload: DeepPartial<Playlist>,
  ): Promise<Playlist> {
    const user = await this.usersService.findOneByCondition({ id: userID });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found user`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.createOne({
      ...payload,
      user,
    });
  }

  async addTrackToPlaylist(
    trackID: number,
    playlistID: string,
    userID: string,
  ): Promise<void> {
    const existPlaylist = await this.findOneByCondition({
      id: playlistID,
      user: { id: userID },
    });

    if (!existPlaylist) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found playlist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const existTrack = await this.tracksService.findOneByCondition({
      id: trackID,
    });

    if (!existTrack) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found track`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    existPlaylist.tracks.push(existTrack);

    await this.saveOne(existPlaylist);
  }

  async deleteTrackFromPlaylist(
    trackID: number,
    playlistID: string,
    userID: string,
  ): Promise<void> {
    const existPlaylist = await this.findOneByCondition({
      id: playlistID,
      user: { id: userID },
    });

    if (!existPlaylist) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found playlist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    let existTrackIndex = -1;
    existPlaylist.tracks.forEach((value, index) => {
      if (value.id === trackID) existTrackIndex = index;
    });

    if (existTrackIndex === -1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not found track`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    existPlaylist.tracks.splice(existTrackIndex, 1);

    await this.saveOne(existPlaylist);
  }
}
