import { Controller, Post, Body, Req, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, RpcRequestWrapper } from "@app/lib";
import { RegisterUserDto } from "@app/lib/dto/user/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("/login")
  async login(@Req() req) {
    return this.authService.login(req.body);
  }

  @Public()
  @Get("cache/set-cache")
  async demoSetCache() {
    return await RpcRequestWrapper(await this.authService.demoSetCache());
  }

  @Public()
  @Get("cache/get-cache")
  async demoGetCache() {
    return await RpcRequestWrapper(await this.authService.demoGetCache());
  }

  @Public()
  @Post("/register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get("/profile")
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.user);
  }

  @Post("/logout")
  async handleLogout(@Req() req) {
    return this.authService.logout(req.user);
  }

  @Public()
  @Get("/refresh")
  async handleRefreshToken() {
    return this.authService.HandleRefresh();
  }
}
