import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { RoleEnum } from 'src/modules/roles/roles.enum';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty()
  @IsEnum([RoleEnum.ARTIST, RoleEnum.USER])
  role: RoleEnum;
}
