import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { User } from '../../auth/schemas/user.schema';

@Schema()
export class Birthdate extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  birthdate: Date;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User;
}

export const BirthdateSchema = SchemaFactory.createForClass(Birthdate);