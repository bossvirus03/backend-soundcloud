import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { CredentialModule } from "../credential/credential.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "AUTH_MICROSERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "auth",
            brokers: ["localhost:29092"],
          },
          consumer: {
            groupId: "auth-microservice-consumer",
          },
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
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
