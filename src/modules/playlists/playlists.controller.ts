import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddTrackToPlaylistDto } from './dto/add-track-to-playlist.dto';
import { DeleteTrackFromPlaylistDto } from './dto/delete-track-from-playlist.dto';

@ApiTags('playlists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findPlaylists(@Request() request) {
    return await this.playlistsService.findManyByCondition({
      user: { id: request.user.id },
    });
  }

  @Post('add-track/:id')
  @HttpCode(HttpStatus.OK)
  async addTrackToPlaylist(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() request,
    @Body() addTrackToPlaylistDto: AddTrackToPlaylistDto,
  ) {
    await this.playlistsService.addTrackToPlaylist(
      addTrackToPlaylistDto.trackID,
      id,
      request.user.id,
    );
  }

  @Post('delete-track/:id')
  @HttpCode(HttpStatus.OK)
  async DeleteTrackFromPlaylistDto(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() request,
    @Body() deleteTrackFromPlaylistDto: DeleteTrackFromPlaylistDto,
  ) {
    await this.playlistsService.deleteTrackFromPlaylist(
      deleteTrackFromPlaylistDto.trackID,
      id,
      request.user.id,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPlaylist(
    @Request() request,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    return await this.playlistsService.createPlaylistOfUser(
      request.user.id,
      createPlaylistDto,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatePlaylist(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() request,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    const userID = request.user.id;
    return await this.playlistsService.updateOneByCondition(
      { id, user: { id: userID } },
      { ...updatePlaylistDto },
    );
  }

  @Delete(':id')
  async deletePlaylist(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() request,
  ) {
    await this.playlistsService.deleteOneByCondition({
      id,
      user: { id: request.user.id },
    });
  }
}
