import { Controller, Post, Body, Req, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, User } from "@app/lib";
import {
  RegisterUserDto,
  UserLoginDto,
} from "@app/lib/dto/user/create-user.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  // @ApiBody({ type: UserLoginDto })
  // @ApiOperation({ summary: "summary goes here" })
  // @ApiResponse({ status: 200, description: 'description goes here', schema: { ...define schema here... } })
  @ApiOperation({
    summary: "Api đăng nhập",
    description: `
* description 1
* description 2`,
  })
  @ApiBody({
    type: UserLoginDto,
    description: "Api login with username, password",
    examples: {
      a: {
        summary: "Admin body",
        description: "Đăng nhập với quyền admin",
        value: { username: "adminlogin", password: "123456" } as UserLoginDto,
      },
      b: {
        summary: "User body",
        description: "Đăng nhập với quyền user",
        value: { username: "userlogin", password: "123456" } as UserLoginDto,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "User created successfully!!",
    content: {
      "application/json": {
        examples: {
          created_user: {
            summary: "Response login",
            value: {
              access_token:
                "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MWNkNmJlMWQ0ZTBiNDRjNzA3NDk2IiwiaWF0IjoxNjgyMDM0MDI3LCJleHAiOjE2ODIwMzc2Mjd9.AH4z7uDWuEDjOs8sesB0ItxKUJ2M3rjul1D1mmjAKieOZblej5mp0JQE5IdgB9LlAOzOtKOLL5RWhxLCZ-YskvoRA7Yqza_rOjfIHeNseC3M66kKYqORN07aZDiA2OWhT3pXBqoKRCUBQCKLgMCAPT-CHryc0wUQGaKxP8YJO8dwIhGtjADchmzNJVBs4G7qYnpZAsORayd5GNfgoLpWmVFIBHSnPLNIL4dL8dLof0GBmVhdjhnHIUXYQlqL1wiwsmxmUC9TU2uiChm-TAhuiQyVwFokSySBJzBrLmEtgy89aaR0YizFK-QMg2xW3cJiiRzEBigTdsR0kvdUlk5GOg",
              refresh_token:
                "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MWNkNmJlMWQ0ZTBiNDRjNzA3NDk2IiwiaWF0IjoxNjgyMDM0MDI3LCJleHAiOjE2ODIwNTkyMjd9.aKNZymKdf3VEbPkda2cYYTS7KlpCbTqdXP30LREQ2b_fJ8q8cA0OyNEARK3Jm5yGsKoNd3txi54XmEbf19LC9CuDf9kwgLasPizEeMZsAJqSbSguzE4-9b4sSdf22GyipCcZJpkXkp01Bew04J8Y4FqhNARONsWzySXg8_VVWOGkfHGJVHFs7xYyVvmt3RErJwRM5s1Ou1ok7VW62FSTSAvXw6-qsHp5T7kXo73jECBqSuNEs5JcdluoBjdaAxggHYaDgTXoRh7y4Mn_fVKCQarAsUAxg6w0fxc8Gj0nP1ct3-GjG-Of-0O-iF7uynI2Lnq_On7WUsH7rFSysNyHUg",
            },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Validation failed",
    content: {
      "application/json": {
        examples: {
          invalid_email_password: {
            value: {
              message: "Username or password is invalid!",
              error: "Unauthorized",
              statusCode: 401,
            },
          },
          // some_fields_missing: {
          //   value: {
          //     statusCode: 400,
          //     message: [
          //       "last_name must be shorter than or equal to 50 characters",
          //       "last_name should not be empty",
          //     ],
          //     error: "Bad Request",
          //   },
          // },
        },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@User() user) {
    return this.authService.login(user);
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
