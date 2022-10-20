import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, ValidateNested, IsNotEmpty } from 'class-validator';
import { AuthDTO } from './auth.dto';

export class CreateUserDTO {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly birthdate: Date;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly userAuth: AuthDTO;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
