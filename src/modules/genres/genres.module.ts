import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import {
  GENRE_REPOSITORY,
  GenresRepository,
} from 'src/repositories/genres.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [
    GenresService,
    {
      provide: GENRE_REPOSITORY,
      useClass: GenresRepository,
    },
  ],
  exports: [GenresService],
})
export class GenresModule {}
