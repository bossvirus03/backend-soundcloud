import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";
import { RegisterUserDto, UserLoginDto } from "src/users/dto/create-user.dto";
import { Request, Response } from "express";
import { IUser } from "src/users/user.interface";
import { ApiTags, ApiBody } from "@nestjs/swagger";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({ type: UserLoginDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("User Login")
  @Post("/login")
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }
  @Public()
  @ResponseMessage("Register User")
  @Post("/register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
  @Get("account")
  getAccount(@User() user: IUser) {
    return { user };
  }
  @Public()
  @Get("/refresh")
  async handleRefresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies["refresh_token"];
    return this.authService.processNewToken(refreshToken, response);
  }
  @Post("/logout")
  async handleLogout(
    @User() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(user, response);
  }
}
