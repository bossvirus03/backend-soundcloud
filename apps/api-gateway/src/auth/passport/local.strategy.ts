import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcResponseWrapper } from "@app/lib";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject("AUTH_MICROSERVICE") private authClient: ClientProxy) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await RpcResponseWrapper(
      await this.authClient.send(
        { cmd: "auth-validate-user" },
        { username, password },
      ),
    );
    if (!user) {
      throw new UnauthorizedException("Username or password is invalid!");
    }
    return user;
  }
}
