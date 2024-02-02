import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "@app/lib";
import { CreateUserDto } from "@app/lib/dto/user/create-user.dto";
import { UpdateUserDto } from "@app/lib/dto/user/update-user.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ENUM_USER_TOPICS } from "@app/lib/constant/cafka.topic.constant";

@ApiTags("users")
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(ENUM_USER_TOPICS.CREATE_USER)
  async create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern(ENUM_USER_TOPICS.GET_ALL_USERS)
  findAll(@Payload() payload) {
    const { currentPage, limit, qs } = payload;
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @MessagePattern(ENUM_USER_TOPICS.FIND_USER_BY_ID)
  async findById(@Payload() id: string) {
    const user = await this.usersService.findOne(id);
    return { ...user };
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Public()
  @Get("/byUsername")
  findByUsername(@Body("username") username: string) {
    return this.usersService.findByUsername(username);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @ResponseMessage("Deleted a new user")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
