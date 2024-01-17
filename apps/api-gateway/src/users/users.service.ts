import { RpcRequestWrapper } from "@app/lib";
import { CreateUserDto } from "@app/lib/dto/user/create-user.dto";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UsersService {
  constructor(@Inject("USER_MICROSERVICE") private userClient: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    return await RpcRequestWrapper(
      this.userClient.send({ cmd: "create a user" }, createUserDto),
    );
  }
}
