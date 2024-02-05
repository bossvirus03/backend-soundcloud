import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  _id: mongoose.Types.ObjectId;
  @IsString()
  @IsNotEmpty({ message: "username khong dc de trong" })
  username: string;

  @IsNotEmpty({ message: "username khong dc de trong" })
  age: number;

  @IsNotEmpty({ message: "password khong dc de trong" })
  @IsString()
  password: string;

  @IsNotEmpty({ message: "email khong dc de trong" })
  address: string;

  @IsNotEmpty({ message: "gender khong dc de trong" })
  gender: string;

  @IsNotEmpty({ message: "role khong dc de trong" })
  role: string;

  @IsNotEmpty({ message: "email khong dc de trong" })
  @IsEmail({}, { message: "dinh dang nay phai la email" })
  email: string;
}
export class RegisterUserDto {
  _id: mongoose.Types.ObjectId;

  @IsString()
  @IsNotEmpty({ message: "username khong dc de trong" })
  username: string;

  role: string;

  @IsNotEmpty({ message: "username khong dc de trong" })
  age: number;

  @IsNotEmpty({ message: "password khong dc de trong" })
  @IsString()
  password: string;

  @IsNotEmpty({ message: "address khong dc de trong" })
  address: string;

  @IsNotEmpty({ message: "gender khong dc de trong" })
  gender: string;

  @IsNotEmpty({ message: "email khong dc de trong" })
  @IsEmail({}, { message: "dinh dang nay phai la email" })
  email: string;
}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "nguoidung123", description: "username" })
  readonly username: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "123456",
    description: "password",
  })
  readonly password: string;
}
