import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';
import * as mongoose from 'mongoose';

import { Role } from './role.schema';
import { User } from './user.schema';

@Schema()
export class Auth extends Document {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: User })
  user: User;

  @Prop({ required: true, type: Role })
  role: Role;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
