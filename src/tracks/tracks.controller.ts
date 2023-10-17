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
import { Public, User } from "src/decorator/customize";
import { IUser } from "src/users/user.interface";

@Controller("tracks")
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

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
