import { Controller, Inject, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { IUser } from "@app/lib/interfaces/user/user.interface";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { RegisterUserDto } from "@app/lib/dto/user/create-user.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
// import { RpcResponseWrapper } from "@app/lib";
import ms from "ms";
import { ConfigService } from "@nestjs/config";
import { ENUM_AUTH_TOPICS } from "@app/lib/constant/cafka.topic.constant";
import { CredentialService } from "../credential/credential.service";

@ApiTags("auth")
@Controller("auth")
@UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private credentialService: CredentialService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern(ENUM_AUTH_TOPICS.VALIDATE_USER)
  async validateUser(@Payload() payload) {
    console.log("check payload login>>>", payload);

    const { username, password } = payload;
    const res = await this.authService.validateUser(username, password);
    return res; //req.user
  }

  @MessagePattern(ENUM_AUTH_TOPICS.LOGIN)
  async login(@Payload() payload) {
    const res = await this.authService.login(payload);
    await this.cacheManager.set(
      "refreshToken",
      res.refresh_token,
      ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")),
    );
    return res;
  }

  @MessagePattern(ENUM_AUTH_TOPICS.REGISTER)
  async register(@Payload() registerUserDto: RegisterUserDto) {
    console.log("registerUserDto ", registerUserDto);

    const auth = await this.authService.register(registerUserDto);
    return auth;
  }

  @MessagePattern(ENUM_AUTH_TOPICS.GET_PROFILE)
  getProfile(@Payload() user: IUser) {
    return this.authService.getProfile(user);
  }

  @MessagePattern(ENUM_AUTH_TOPICS.REFRESH)
  async handleRefresh() {
    const refreshToken = (await this.cacheManager.get(
      "refreshToken",
    )) as string;
    return await this.authService.processNewToken(refreshToken);
  }

  @MessagePattern(ENUM_AUTH_TOPICS.REFRESH)
  async handleLogout(@Payload() payload) {
    return this.authService.logout(payload);
  }

  @MessagePattern(ENUM_AUTH_TOPICS.CREDENTIAL_FIND_USERNAME)
  async findCredentByUsername(@Payload() payload) {
    return await this.credentialService.findByUsername(payload);
  }
}
