import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  confirmPassword: string;

  @ApiProperty()
  @IsMongoId()
  @IsString()
  user: string;
}

export class LoginDTO {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdateAuthDTO extends PartialType(AuthDTO) {}
