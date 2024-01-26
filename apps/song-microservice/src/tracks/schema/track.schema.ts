import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type TracksDocument = HydratedDocument<Tracks>;

@Schema()
export class Tracks {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  category: string;
  @Prop()
  imgUrl: string;
  @Prop()
  trackUrl: string;
  @Prop()
  countLike: number;
  @Prop()
  countPlay: number;
  @Prop()
  uploader: mongoose.Types.ObjectId;
}

export const TracksSchema = SchemaFactory.createForClass(Tracks);
