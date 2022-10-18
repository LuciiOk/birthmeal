import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Birthdate extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  birthdate: Date;
}

export const BirthdateSchema = SchemaFactory.createForClass(Birthdate);