import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TracksModule } from "./tracks/tracks.module";
import { FilesModule } from "./files/files.module";
import { PlaylistsModule } from "./playlists/playlists.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
import { MongooseModule } from "@nestjs/mongoose";

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
    TracksModule,
    FilesModule,
    PlaylistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
