import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Req() req) {
        console.log(req);
        return this.authService.login(req.user);
    }

    @Public()
    @Get("profile")
    getProfile(@Req() req) {
        return req.user;
    }
}
