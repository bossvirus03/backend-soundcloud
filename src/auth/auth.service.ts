import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "src/users/user.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
  async login(user: IUser) {
    const { username, _id, email, role } = user
    const payload = {
      username,
      email,
      _id,
      role,
      sub: "token login",
      iss: "from server"
    };
    return {
      access_token: this.jwtService.sign(payload), _id, role, email, username
    };
  }
}
