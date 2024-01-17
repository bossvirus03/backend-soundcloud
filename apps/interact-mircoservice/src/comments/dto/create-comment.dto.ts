import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateCommentDto {
  @IsNotEmpty()
  moment: number;
  @IsNotEmpty()
  content: string;
  user: mongoose.Types.ObjectId;
  @IsNotEmpty()
  track: mongoose.Types.ObjectId;
}
