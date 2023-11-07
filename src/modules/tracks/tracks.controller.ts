import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from './dto/create-track.dto';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdateTrackDto } from './dto/update-track.dto';

@ApiTags('tracks')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findTracksWithPagination(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.tracksService.findTracksWithPagination(page, limit);
  }

  @Get('my-track')
  @ApiBearerAuth()
  @Roles(RoleEnum.ARTIST)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findMyTrack(@Request() request) {
    return await this.tracksService.findManyByCondition({
      user: { id: request.user.id },
    });
  }

  @Post()
  @ApiBearerAuth()
  @Roles(RoleEnum.ARTIST)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createTrack(
    @Request() request,
    @Body() createTrackDto: CreateTrackDto,
  ) {
    return await this.tracksService.createTrackOfUser(
      createTrackDto.genreID,
      request.user.id,
      { ...createTrackDto },
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(RoleEnum.ARTIST)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateTrack(
    @Param('id', ParseIntPipe) id: number,
    @Request() request,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.tracksService.updateOneByCondition(
      {
        id,
        user: { id: request.user.id },
      },
      { ...updateTrackDto },
    );
  }

  @Delete(':id')
  @Roles(RoleEnum.ARTIST)
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', ParseIntPipe) id: number, @Request() request) {
    await this.tracksService.deleteOneByCondition({
      id,
      user: { id: request.user.id },
    });
  }
}
