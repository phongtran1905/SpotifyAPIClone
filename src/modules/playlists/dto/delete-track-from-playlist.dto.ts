import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class DeleteTrackFromPlaylistDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  trackID: number;
}
