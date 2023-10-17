import { PartialType } from "@nestjs/mapped-types";
import { CreateTrackDto } from "./create-track.dto";
import mongoose from "mongoose";

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  title: string;
  description: string;
  category: string;
  imgUrl: string;
  trackUrl: string;
  countLike: string;
  countPlay: string;
  uploader: mongoose.Types.ObjectId;
}
