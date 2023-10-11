import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
//import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: SoftDeleteModel<UserDocument>) { }

  getHashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }
  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const user = await this.UserModel.create({
      password: hashPassword,
      username: createUserDto.username,
      email: createUserDto.email,
      age: createUserDto.age,
      address: createUserDto.address,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return "not found user";
    return this.UserModel.findOne({ _id: id });
  }
  findByUsername(username: string) {
    return this.UserModel.findOne({ username: username });
  }
  update(id: string, updateUserDto) {
    return this.UserModel.updateOne({ _id: id }, { ...updateUserDto });
  }
  isValidPassword(password: string, hashPassword: string) {
    console.log(password, hashPassword);
    return compareSync(password, hashPassword);
  }
  remove(id: string) {
    return this.UserModel.softDelete({ _id: id });
  }
}
