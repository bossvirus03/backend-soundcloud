import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  role: string;

  @Prop()
  password: string;

  @Prop()
  age: string;

  @Prop()
  gender: string;

  @Prop()
  refreshToken: string;

  @Prop()
  address: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updateddAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
