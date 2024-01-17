import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import aqp from "api-query-params";
import { CreateUserDto } from "@app/lib/dto/user/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: SoftDeleteModel<UserDocument>,
  ) {}

  getHashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    let isExit = await this.UserModel.findOne({ email: createUserDto.email });
    if (isExit) throw new BadRequestException("Email đã tồn tại!");
    isExit = await this.UserModel.findOne({ username: createUserDto.username });
    if (isExit) throw new BadRequestException("Username đã tồn tại!");
    const hashPassword = this.getHashPassword(createUserDto.password);
    const user = await this.UserModel.create({
      password: hashPassword,
      username: createUserDto.username,
      email: createUserDto.email,
      age: createUserDto.age,
      address: createUserDto.address,
      ...createUserDto,
    });
    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.UserModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.UserModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }

  async findOne(_id: string) {
    const user = await this.UserModel.findOne({ _id });
    return user;
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
    return this.UserModel.softDelete({ _id: id });
  }
}
