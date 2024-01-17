import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IUser } from "@app/lib/interfaces/user/user.interface";
import { RpcRequestWrapper } from "@app/lib";

@Injectable()
export class AuthService {
  constructor(@Inject("AUTH_MICROSERVICE") private authClient: ClientProxy) {}

  async demoSetCache() {
    return this.authClient.send({ cmd: "set-cache" }, {});
  }

  async demoGetCache() {
    return this.authClient.send({ cmd: "get-cache" }, {});
  }

  async login(user: IUser) {
    return this.authClient.send({ cmd: "login-api" }, user);
  }

  async register(user: IUser) {
    return RpcRequestWrapper(
      await this.authClient.send({ cmd: "register-user-api" }, user),
    );
  }

  async getProfile(user: IUser) {
    return this.authClient.send({ cmd: "get-profile-api" }, user);
  }

  HandleRefresh() {
    return this.authClient.send({ cmd: "refresh-api" }, {});
  }

  async logout(payload) {
    return RpcRequestWrapper(
      this.authClient.send({ cmd: "logout-user-api" }, payload),
    );
  }
}
