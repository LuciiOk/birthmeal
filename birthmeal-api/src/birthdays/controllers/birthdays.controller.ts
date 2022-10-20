import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { PayloadToken } from 'src/auth/models/Payload.model';
import { Role } from 'src/auth/schemas/auth.schema';
import { BirthdateDto } from '../dtos/birthdate.dto';

import { BirthdaysService } from '../services/birthdays.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('birthdays')
export class BirthdaysController {
  constructor(private readonly birthdaysService: BirthdaysService) {}

  @Roles(Role.USER)
  @Post()
  create(@Body() birthdate: BirthdateDto, @Req() req: Request) {
    const { userID } = req.user as PayloadToken;
    return this.birthdaysService.create(birthdate, userID);
  }

  @Roles(Role.USER)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.birthdaysService.delete(id);
  }

  @Roles(Role.USER)
  @Get('/profile')
  getUserBirthdays(@Req() req: Request) {
    const { userID } = req.user as PayloadToken;
    return this.birthdaysService.findByUser(userID);
  }
}
