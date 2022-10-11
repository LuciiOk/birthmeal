import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';
export class CompanyDto {
  @IsString()
  @ApiProperty()
  readonly business_name: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly rating: number;
}

export class UpdateCompanyDto extends PartialType(CompanyDto) {}
