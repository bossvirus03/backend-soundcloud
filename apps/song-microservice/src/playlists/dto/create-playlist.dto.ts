import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreatePlaylistDto {
  @IsNotEmpty({ message: "vui long nhap title" })
  title: string;
  @IsNotEmpty({ message: "vui long nhap isPublic" })
  isPublic: boolean;
  user: mongoose.Types.ObjectId;
  tracks: Array<mongoose.Types.ObjectId>;
}
