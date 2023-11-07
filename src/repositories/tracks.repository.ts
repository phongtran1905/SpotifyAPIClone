import { Injectable } from '@nestjs/common';
import { ABaseRepository } from './bases/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITracksRepository } from 'src/modules/tracks/interfaces/tracks.repository.interface';
import { Track } from 'src/modules/tracks/entities/track.entity';

export const TRACKS_REPOSITORY = 'tracks_repository';
@Injectable()
export class TracksRepository
  extends ABaseRepository<Track>
  implements ITracksRepository
{
  constructor(@InjectRepository(Track) tracksRepository: Repository<Track>) {
    super(tracksRepository);
  }

  async findManyWithPagination(page: number, limit: number): Promise<Track[]> {
    return await this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
