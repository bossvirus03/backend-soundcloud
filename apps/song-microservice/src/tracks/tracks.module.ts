import { Module } from "@nestjs/common";
import { TracksService } from "./tracks.service";
import { TracksController } from "./tracks.controller";
import { PostgresService } from "apps/postgres.service";
@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService, PostgresService],
  exports: [TracksService, PostgresService],
})
export class TracksModule {}
