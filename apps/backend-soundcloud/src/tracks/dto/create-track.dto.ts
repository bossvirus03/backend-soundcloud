import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: "Title khong dc de trong" })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "description khong dc de trong" })
  description: string;

  @IsString()
  @IsNotEmpty({ message: "category khong dc de trong" })
  category: string;

  @IsString()
  @IsNotEmpty({ message: "imgUrl khong dc de trong" })
  imgUrl: string;

  @IsString()
  @IsNotEmpty({ message: "trackUrl khong dc de trong" })
  trackUrl: string;

  @IsString()
  countLike: string;

  @IsString()
  countPlay: string;

  uploader: mongoose.Types.ObjectId;
}
