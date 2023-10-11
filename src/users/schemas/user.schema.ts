import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: number;

  @Prop()
  age: string;

  @Prop()
  address: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updateddAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
