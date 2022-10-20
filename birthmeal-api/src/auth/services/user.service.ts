import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from '../dtos/user.dto';
import { Auth } from '../schemas/auth.schema';
import { User } from '../schemas/user.schema';

import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async create(user: CreateUserDTO): Promise<Auth> {
    const newUser = await this.userModel.create(user);
    const userExists = await this.authService.findOneByEmail(
      user.userAuth.email,
    );
    if (userExists)
      throw new BadRequestException('Already exists an user with this email');
    const auth = await this.authService.create({
      email: user.userAuth.email,
      password: user.userAuth.password,
      confirmPassword: user.userAuth.confirmPassword,
      user: newUser._id,
    });
    return auth;
  }

  async findOne(_id: string): Promise<User> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(_id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(_id, user, { new: true }).exec();
  }
}
