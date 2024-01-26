import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  // Query,
} from "@nestjs/common";
import { TracksService } from "./tracks.service";
import { ApiTags } from "@nestjs/swagger";
// import { Public } from "@app/lib";
// import { UpdateTrackDto } from "@app/lib/dto/track/update-track.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@ApiTags("tracks")
@Controller("tracks")
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @MessagePattern({ cmd: "create-track" })
  create(@Payload() payload) {
    const { createTrackDto, user } = payload;
    return this.tracksService.create(createTrackDto, user);
  }

  @MessagePattern({ cmd: "get-top-track" })
  getTopTrack(@Payload() payload) {
    const { limit, category } = payload;
    return this.tracksService.getTopTrack(limit, category);
  }

  @MessagePattern({ cmd: "increase-view" })
  increaseView(@Payload() trackId) {
    return this.tracksService.increaseView(trackId);
  }

  @MessagePattern({ cmd: "find-all-track" })
  findAll(@Payload() payload) {
    const { currentPage, limit, qs } = payload;
    return this.tracksService.findAll(+currentPage, limit, qs);
  }

  // // @Post("/comments")
  // // findAllComments(
  // //   @Query("current") current: number,
  // //   @Query("pageSize") pageSize: number,
  // //   @Query("trackId") trackId: mongoose.Types.ObjectId,
  // //   @Query() qs: string,
  // // ) {
  // //   return this.commentsService.findAllComments(current, pageSize, trackId, qs);
  // // }
  // @Public()

  // @Post("/user")
  // getTrackCreatedByUser(
  //   @Query("page") page: number,
  //   @Query("limit") limit: number,
  //   @Query() qs: string,
  //   @Body("id") userId: string,
  // ) {
  //   return this.tracksService.getTrackCreatedByUser(page, limit, userId, qs);
  // }

  // @Post("/search")
  // searchTrackWithName(
  //   @Body("title") title: string,
  //   @Body("page") page: number,
  //   @Body("limit") limit: number,
  //   @Body() qs: string,
  // ) {
  //   return this.tracksService.searchTrackWithName(page, limit, title, qs);
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.tracksService.findOne(id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
  //   return this.tracksService.update(id, updateTrackDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.tracksService.remove(id);
  // }
}
