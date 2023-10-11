import { Controller, Get, Post, Request } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth/auth.service";
import { Public } from "./decorator/customize";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private authService: AuthService,
  ) { }

  @Public()
  @Post("/login")
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Public()
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
