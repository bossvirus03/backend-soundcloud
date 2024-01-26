import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./app.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @MessagePattern("get-user")
  getHello(@Payload() input: any): string {
    // return this.UserService.getHello();

    return "hello";
  }
}
