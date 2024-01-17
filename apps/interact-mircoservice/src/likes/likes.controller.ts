import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { CreateLikeDto } from "./dto/create-like.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@app/lib";
import { IUser } from "@app/lib/interfaces/user/user.interface";

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
