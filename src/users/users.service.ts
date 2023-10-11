import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  getHashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }
  async create(createUserDto: CreateUserDto) {
    const { password, email, username } = createUserDto;
    const hashPassword = this.getHashPassword(password);
    await this.UserModel.create({
      email,
      hashPassword,
      username,
    });
    return createUserDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found user';
    return this.UserModel.findOne({ _id: id });
  }
  findByUsername(username: string) {
    return this.UserModel.findOne({ username: username });
  }
  update(id: string, updateUserDto) {
    return this.UserModel.updateOne({ _id: id }, { ...updateUserDto });
  }
  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }
  remove(id: string) {
    return this.UserModel.deleteOne({ _id: id });
  }
}
