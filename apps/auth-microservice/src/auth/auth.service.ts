import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { IUser } from "@app/lib/interfaces/user/user.interface";
import { CredentialService } from "../credential/credential.service";
import { RpcRequestWrapper } from "@app/lib";
import { ClientProxy } from "@nestjs/microservices";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import ms from "ms";
import { ENUM_USER_TOPICS } from "@app/lib/constant/cafka.topic.constant";

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject("USER_MICROSERVICE") private userClient: ClientProxy,
    private credentialService: CredentialService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userCredential =
      await this.credentialService.findByUsername(username);
    const id = userCredential._id.toString();
    const user = await RpcRequestWrapper(
      this.userClient.send(ENUM_USER_TOPICS.FIND_USER_BY_ID, id),
    );
    if (userCredential) {
      const isValid = this.credentialService.isValidPassword(
        pass,
        userCredential.password,
      );
      if (isValid) {
        return { _id: id, ...user };
      }
    }
    return null;
  }
  async login(user) {
    const { _id, email, role } = user;
    const username = (await this.credentialService.findById(_id.toString()))
      .username;
    const payload = {
      username,
      email,
      _id,
      role,
      sub: "token login",
      iss: "from server",
    };
    const refresh_token = await this.createRefreshToken(payload);
    await this.credentialService.updateUserToken(refresh_token, _id);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
    };
  }

  async register(user: IUser) {
    const newUser = await RpcRequestWrapper(
      await this.userClient.send(ENUM_USER_TOPICS.CREATE_USER, user),
    );

    await this.credentialService.create(
      newUser._id,
      user.username,
      user.password,
    );

    return {
      _id: newUser._id,
      createdAt: newUser.createdAt,
    };
  }

  createRefreshToken(payload: any) {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRE"),
    });
    return refresh_token;
  }

  async processNewToken(refreshToken) {
    try {
      //verify that the refresh token
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      });

      //get user
      const id = (await this.credentialService.findUserByToken(refreshToken))
        ._id;
      const user = await RpcRequestWrapper(
        this.userClient.send(ENUM_USER_TOPICS.FIND_USER_BY_ID, id),
      );
      if (user) {
        const { username, _id, email, role } = user;
        const payload = {
          username,
          email,
          _id,
          role,
          sub: "token login",
          iss: "from server",
        };

        // create new token
        const newRefreshToken = this.createRefreshToken(payload);
        await this.cacheManager.set(
          "refreshToken",
          newRefreshToken,
          ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")),
        );

        //update user with refresh token
        await this.credentialService.updateUserToken(newRefreshToken, id);

        return {
          access_token: this.jwtService.sign(payload),
          user: { _id, role, email, username },
        };
      } else {
        throw new UnauthorizedException(
          "Refresh token không hợp lệ vui lòng đăng nhập lại",
        );
      }
    } catch (error) {
      throw new UnauthorizedException(
        "Refresh token không hợp lệ vui lòng đăng nhập lại",
      );
    }
  }

  async getProfile(user: IUser) {
    return this.userClient.send(ENUM_USER_TOPICS.FIND_USER_BY_ID, user._id);
  }
  async logout(payload) {
    await this.cacheManager.del("refreshToken");
    await this.credentialService.updateUserToken(null, payload._id);
    return {
      message: "ok",
    };
  }
}
