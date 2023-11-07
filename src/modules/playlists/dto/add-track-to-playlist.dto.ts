import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class AddTrackToPlaylistDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  trackID: number;
}
