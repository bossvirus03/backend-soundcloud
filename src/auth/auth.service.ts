import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "src/users/user.interface";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import ms from "ms";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  //username, pass la do thu vien passport tra ve
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }
  async login(user: IUser, response: Response) {
    const { username, _id, email, role } = user;
    const payload = {
      username,
      email,
      _id,
      role,
      sub: "token login",
      iss: "from server"
    };
    const refresh_token = this.createRefreshToken(payload);
    //update user with refresh token
    await this.usersService.updateUserToken(refresh_token, _id)

    //set refresh token as cookie
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
    })
    return {
      access_token: this.jwtService.sign(payload),
      user: { _id, role, email, username }
    };
  }
  async register(user: IUser) {
    const newUser = await this.usersService.create({ ...user, role: "USER" })
    return {
      _id: newUser._id,
      createdAt: newUser.createdAt,
    };
  }
  createRefreshToken(payload: any) {
    const refresh_token = this.jwtService.sign(payload,
      {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
      });
    return refresh_token;
  }
  async processNewToken(refreshToken, response: Response) {
    try {
      this.jwtService.verify(refreshToken,
        {
          secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET")
        })
      const user = await this.usersService.findUserByToken(refreshToken);
      if (user) {
        const { username, _id, email, role } = user;
        const payload = {
          username,
          email,
          _id,
          role,
          sub: "token login",
          iss: "from server"
        };
        const refresh_token = this.createRefreshToken(payload);

        //update user with refresh token
        await this.usersService.updateUserToken(refresh_token, _id)

        //set refresh token as cookie
        response.clearCookie('refresh_token');
        response.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
        })
        return {
          access_token: this.jwtService.sign(payload),
          user: { _id, role, email, username }
        };
      } else {
        throw new UnauthorizedException("Refresh token khong hop le vui long dang nhap lai")
      }
    } catch (error) {
      throw new UnauthorizedException("Refresh token khong hop le vui long dang nhap lai")
    }
  }
  logout(user: IUser, response: Response) {
    response.clearCookie["refresh_token"]
    this.usersService.updateUserToken(null, user._id)
    return "ok";
  }
}  