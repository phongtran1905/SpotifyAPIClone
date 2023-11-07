import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  picture?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  link?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  duration?: number;
}
