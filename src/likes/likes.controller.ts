import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { IUser } from "src/users/user.interface";
import { User } from "src/decorator/customize";
import { CreateLikeDto } from "./dto/create-like.dto";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("likes")
@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @User() user: IUser) {
    return this.likesService.create(createLikeDto, user);
  }

  @Get()
  getTrackLikedByUser(
    @User() user: IUser,
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query() qs: string,
  ) {
    return this.likesService.getTrackLikedByUser(page, limit, user, qs);
  }
}
