import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmpty()
  hash: string;
}
