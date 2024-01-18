import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Tracks,
  TracksSchema,
} from "apps/backend-soundcloud/src/tracks/schema/track.schema";
import { PostgresService } from "./postgres.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tracks.name, schema: TracksSchema }]),
  ],
  controllers: [LikesController],
  providers: [LikesService, PostgresService],
  exports: [LikesModule, PostgresService],
})
export class LikesModule {}
