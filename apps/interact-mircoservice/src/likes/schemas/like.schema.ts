import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
  @Prop()
  track: mongoose.Types.ObjectId[];

  @Prop()
  quantity: number;

  @Prop()
  user: mongoose.Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
