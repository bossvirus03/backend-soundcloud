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
import { PlaylistsService } from "./playlists.service";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { User } from "src/decorator/customize";
import { IUser } from "src/users/user.interface";

@Controller("playlists")
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto, @User() user: IUser) {
    return this.playlistsService.create(createPlaylistDto, user);
  }

  @Get()
  findAll(
    @Query("current") page: number,
    @Query("pageSize") limit: number,
    @Query() qs: string,
  ) {
    return this.playlistsService.findAll(page, limit, qs);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.playlistsService.findOne(id);
  }

  @Patch()
  update(@Body() updatePlaylistDto: UpdatePlaylistDto, @User() user: IUser) {
    return this.playlistsService.update(updatePlaylistDto, user);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.playlistsService.remove(id);
  }
}
