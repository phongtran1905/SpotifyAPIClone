import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  description: string;
}
