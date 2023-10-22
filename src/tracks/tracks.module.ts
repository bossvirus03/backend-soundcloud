import { Module } from "@nestjs/common";
import { TracksService } from "./tracks.service";
import { TracksController } from "./tracks.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tracks, TracksSchema } from "./schema/track.schema";
import { Comment, CommentSchema } from "src/comments/schemas/comment.schema";
import { CommentsService } from "src/comments/comments.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tracks.name, schema: TracksSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [TracksController],
  providers: [TracksService, CommentsService],
  exports: [TracksService],
})
export class TracksModule {}
