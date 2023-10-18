import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true })
export class Playlist {
  @Prop()
  title: string;
  @Prop()
  isPublic: boolean;
  @Prop()
  user: mongoose.Types.ObjectId;
  @Prop()
  tracks: Array<mongoose.Types.ObjectId>;
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
