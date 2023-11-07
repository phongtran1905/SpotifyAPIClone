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
  UseGuards,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findGenres() {
    return await this.genresService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createGenre(@Body() createGenreDto: CreateGenreDto) {
    return await this.genresService.createOne(createGenreDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateGenre(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return await this.genresService.updateOneByCondition(
      { id },
      { ...updateGenreDto },
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteGenre(@Param('id', ParseIntPipe) id: number) {
    await this.genresService.deleteOneByCondition({ id });
  }
}
