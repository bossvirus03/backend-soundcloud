import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { Public, ResponseMessage } from "@app/lib";
import { CreateUserDto } from "@app/lib/dto/user/create-user.dto";
import { UpdateUserDto } from "@app/lib/dto/user/update-user.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @MessagePattern({ cmd: "create a user" })
  async create(@Payload() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query("page") currentPage: string,
    @Query("limit") limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @MessagePattern({ cmd: "find user by id" })
  async findById(@Payload() id: string) {
    return await this.usersService.findOne(id);
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

  @ResponseMessage("Deleted a new user")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
