import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  public async login() {
    return 'login';
  }

  public async register() {
    return 'register';
  }
}
