import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  title: string;
}
