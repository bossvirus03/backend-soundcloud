import { Module } from "@nestjs/common";
import { AuthMicroserviceController } from "./app.controller";
import { AuthMicroserviceService } from "./app.service";
import { CredentialModule } from "./credential/credential.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule,
    CredentialModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthMicroserviceController],
  providers: [AuthMicroserviceService],
})
export class AppModule {}
