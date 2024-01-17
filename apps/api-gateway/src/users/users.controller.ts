import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Public } from "@app/lib";
import { CreateUserDto } from "@app/lib/dto/user/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
