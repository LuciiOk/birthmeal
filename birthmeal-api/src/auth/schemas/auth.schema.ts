import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Transform, Type } from 'class-transformer';

import { User } from './user.schema';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema()
export class Auth extends Document {
  @Transform(({ value }) => value.toString())
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  @ExcludeProperty()
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;

  @Prop({ required: true, default: Role.USER, enum: Role })
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
