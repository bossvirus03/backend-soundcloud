import mongoose from "mongoose";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCredentialDto {
  _id: mongoose.Types.ObjectId;
  @IsString()
  @IsNotEmpty({ message: "username không được để trống" })
  username: string;

  @IsNotEmpty({ message: "password không được để trống" })
  @IsString()
  password: string;

  @IsString()
  refreshToken: string;
}
