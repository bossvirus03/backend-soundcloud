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

@ApiTags("auth")
@Controller("auth")
@UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern({ cmd: "auth-validate-user" })
  async validateUser(@Payload() payload) {
    const { username, password } = payload;
    const res = await this.authService.validateUser(username, password);
    return res;
  }

  @MessagePattern({ cmd: "login-api" })
  async login(@Payload() user: IUser) {
    const res = await this.authService.login(user);
    await this.cacheManager.set(
      "refreshToken",
      res.refresh_token,
      ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")),
    );
    return res;
  }

  @MessagePattern({ cmd: "register-user-api" })
  async register(@Payload() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @MessagePattern({ cmd: "get-profile-api" })
  getProfile(@Payload() user: IUser) {
    return this.authService.getProfile(user);
  }

  @MessagePattern({ cmd: "refresh-api" })
  async handleRefresh() {
    const refreshToken = (await this.cacheManager.get(
      "refreshToken",
    )) as string;
    return await this.authService.processNewToken(refreshToken);
  }

  @MessagePattern({ cmd: "logout-user-api" })
  async handleLogout(@Payload() payload) {
    return this.authService.logout(payload);
  }
}
