import { Module } from "@nestjs/common";
import { TracksService } from "./tracks.service";
import { TracksController } from "./tracks.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tracks, TracksSchema } from "./schema/track.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tracks.name, schema: TracksSchema }]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}