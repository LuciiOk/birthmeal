import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class BirthdateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  birthdate: number;
}

export class UpdateBirthdateDto extends PartialType(BirthdateDto) {}
