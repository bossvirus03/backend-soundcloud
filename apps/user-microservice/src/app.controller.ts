import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./app.service";

@Controller()
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Get()
  getHello(): string {
    return this.UserService.getHello();
  }
}
