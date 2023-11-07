import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  title: string;

  @ApiProperty()
  @IsUrl()
  picture: string;

  @ApiProperty()
  @IsUrl()
  link: string;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  genreID: number;
}
