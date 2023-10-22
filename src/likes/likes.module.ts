import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Like, LikeSchema } from "./schemas/like.schema";
import { Tracks, TracksSchema } from "src/tracks/schema/track.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Tracks.name, schema: TracksSchema },
    ]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesModule],
})
export class LikesModule {}
