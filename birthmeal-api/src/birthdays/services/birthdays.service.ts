import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Birthdate } from '../schemas/Birthdate.schema';

@Injectable()
export class BirthdaysService {
  constructor(
    @InjectModel(Birthdate.name) private birthdateModel: Model<Birthdate>,
  ) {}

  async create(birthdate: Birthdate): Promise<Birthdate> {
    const createdBirthdate = new this.birthdateModel(birthdate);
    return createdBirthdate.save();
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
}
