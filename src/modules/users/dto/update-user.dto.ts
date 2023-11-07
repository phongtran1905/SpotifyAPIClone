import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;
}
