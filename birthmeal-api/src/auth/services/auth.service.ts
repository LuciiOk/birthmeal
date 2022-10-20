import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AuthDTO, LoginDTO } from '../dtos/auth.dto';
import { Auth } from '../schemas/auth.schema';
import { PayloadToken } from '../models/Payload.model';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async findOne(id: string): Promise<Auth> {
    const authUser = await this.authModel.findById(id).exec();
    return authUser.populate('user');
  }

  async findOneByEmail(email: string): Promise<Auth> {
    const authUser = await this.authModel.findOne({ email }).exec();
    return authUser?.populate('user');
  }

  async create(auth: AuthDTO): Promise<Auth> {
    if (auth.password !== auth.confirmPassword)
      throw new BadRequestException('Passwords do not match');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(auth.password, salt);
    const result = await this.authModel.create({
      ...auth,
      password: hashedPassword,
    });

    return result.save();
  }

  async validateUser(auth: LoginDTO) {
    const user = await this.findOneByEmail(auth.email);
    if (!user)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    const isMatch = await bcrypt.compare(auth.password, user.password);
    if (!isMatch)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return user;
  }

  async generateJWT(user: Auth) {
    const payload: PayloadToken = {
      sub: user._id,
      role: user.role,
      userID: user.user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
