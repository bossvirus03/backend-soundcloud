import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
// import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocalStrategy } from "./passport/local.strategy";
import { KafkaModule } from "../kafka/kafka.module";
import { BullModule } from "@nestjs/bull";
import { EmailConsumer } from "./consumers/email.consumer";

@Module({
  imports: [
    // BullModule.forRoot({
    //   redis: {
    //     host: process.env.REDIS_HOST,
    //     port: +process.env.REDIS_PORT,
    //   },
    // }),
    BullModule.registerQueue({
      name: "send_mail",
    }),
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
    KafkaModule,
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, EmailConsumer],
})
export class AuthModule {}
