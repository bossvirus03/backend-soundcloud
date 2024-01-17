import { PartialType } from "@nestjs/mapped-types";
import { CreatePlaylistDto } from "./create-playlist.dto";
import { IsArray, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsNotEmpty({ message: "vui long nhap id" })
  // @IsNotEmail
  id: mongoose.Types.ObjectId;
  @IsNotEmpty({ message: "vui long nhap title" })
  title: string;
  @IsNotEmpty({ message: "vui long nhap isPublic" })
  isPublic: boolean;
  user: mongoose.Types.ObjectId;
  @IsArray({ message: "track phai co dinh dang la array" })
  tracks: mongoose.Types.ObjectId[];
}
