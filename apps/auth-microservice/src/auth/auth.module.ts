import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { CredentialModule } from "../credential/credential.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import { PostgresService } from "apps/interact-microservice/src/likes/postgres.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "USER_MICROSERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3003,
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>(
          "JWT_ACCESS_TOKEN_SECRET",
        ),
        signOptions: {
          expiresIn: configService.get<string>("JWT_ACCESS_EXPIRE"),
        },
      }),
      inject: [ConfigService],
    }),
    CredentialModule,
    PassportModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
