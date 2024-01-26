import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { PostgresService } from "../../../postgres.service";

@Module({
  imports: [],
  controllers: [LikesController],
  providers: [LikesService, PostgresService],
  exports: [LikesModule, PostgresService],
})
export class LikesModule {}
