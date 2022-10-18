import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Transform, Type } from 'class-transformer';

import { Birthdate } from 'src/birthdays/schemas/Birthdate.schema';

@Schema()
export class User extends Document {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Birthdate.name,
  })
  @Type(() => Birthdate)
  birthdates: Birthdate;
}

export const UserSchema = SchemaFactory.createForClass(User);
