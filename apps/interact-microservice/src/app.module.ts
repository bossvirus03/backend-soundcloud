import { Module } from "@nestjs/common";
import { InteractController } from "./app.controller";
import { InteractService } from "./app.service";
import { LikesModule } from "./likes/likes.module";
import { CommentsModule } from "./comments/comments.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { PostgresService } from "./likes/postgres.service";

@Module({
  imports: [
    LikesModule,
    CommentsModule,
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
  controllers: [InteractController],
  providers: [InteractService, PostgresService],
  exports: [PostgresService],
})
export class AppModule {}
