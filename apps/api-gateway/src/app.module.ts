import { Module } from "@nestjs/common";
import { ApiGatewaysController } from "./app.controller";
import { ApiGatewaysService } from "./app.service";
// import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { LikesModule } from "./likes/likes.module";
import { CommentsModule } from "./comments/comments.module";

@Module({
  imports: [
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
    AuthModule,
    UsersModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [ApiGatewaysController],
  providers: [ApiGatewaysService],
})
export class AppModule {}
