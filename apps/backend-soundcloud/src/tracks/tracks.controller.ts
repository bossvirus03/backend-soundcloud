import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TracksService } from "./tracks.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import mongoose from "mongoose";
import { ApiTags } from "@nestjs/swagger";
import { IUser } from "../../../../libs/lib/src/interfaces/user/user.interface";
import { Public, User } from "@app/lib";
import { CommentsService } from "apps/interact-mircoservice/src/comments/comments.service";

@ApiTags("tracks")
@Controller("tracks")
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @User() user: IUser) {
    return this.tracksService.create(createTrackDto, user);
  }
  @Public()
  @Post("/top")
  getTopTrack(
    @Body("limit") limit: number,
    @Body("category") category: string,
  ) {
    return this.tracksService.getTopTrack(limit, category);
  }

  @Get()
  findAll(
    @Query("page") currentPage: string,
    @Query("limit") limit: number,
    @Query() qs: string,
  ) {
    return this.tracksService.findAll(+currentPage, limit, qs);
  }
  @Post("/comments")
  findAllComments(
    @Query("current") current: number,
    @Query("pageSize") pageSize: number,
    @Query("trackId") trackId: mongoose.Types.ObjectId,
    @Query() qs: string,
  ) {
    return this.commentsService.findAllComments(current, pageSize, trackId, qs);
  }
  @Public()
  @Post("/increase-view")
  increaseView(@Body("trackId") trackId: string) {
    return this.tracksService.increaseView(trackId);
  }
  @Post("/user")
  getTrackCreatedByUser(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query() qs: string,
    @Body("id") userId: string,
  ) {
    return this.tracksService.getTrackCreatedByUser(page, limit, userId, qs);
  }

  @Post("/search")
  searchTrackWithName(
    @Body("title") title: string,
    @Body("page") page: number,
    @Body("limit") limit: number,
    @Body() qs: string,
  ) {
    return this.tracksService.searchTrackWithName(page, limit, title, qs);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tracksService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tracksService.remove(id);
  }
}
