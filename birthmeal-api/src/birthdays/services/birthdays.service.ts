import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { BirthdateDto } from '../dtos/birthdate.dto';
import { Birthdate } from '../schemas/Birthdate.schema';

import { UserService } from 'src/auth/services/user.service';
@Injectable()
export class BirthdaysService {
  constructor(
    @InjectModel(Birthdate.name) private birthdateModel: Model<Birthdate>,
    private userService: UserService,
  ) {}

  async create(
    birthdate: BirthdateDto,
    userId: Schema.Types.ObjectId,
  ): Promise<Birthdate> {
    const user = await this.userService.findOne(userId.toString());
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const newBirthdate = new this.birthdateModel({
      ...birthdate,
      user,
    });
    return newBirthdate.save();
  }

  async findAll(): Promise<Birthdate[]> {
    return this.birthdateModel.find().exec();
  }

  async findOne(id: string): Promise<Birthdate> {
    return this.birthdateModel.findById(id).exec();
  }

  async delete(id: string): Promise<Birthdate> {
    return this.birthdateModel.findByIdAndDelete(id).exec();
  }

  async findByUser(user: Schema.Types.ObjectId): Promise<Birthdate[]> {
    return this.birthdateModel.find({ user }).exec();
  }
}
