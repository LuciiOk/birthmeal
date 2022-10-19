import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Type } from 'class-transformer';

import { Birthdate } from 'src/birthdays/schemas/Birthdate.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthdate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
