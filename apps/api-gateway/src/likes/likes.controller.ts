import { Controller, Post, Body } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiTags } from "@nestjs/swagger";
import { Req, Get, Query } from "@nestjs/common";
import { CreateLikeDto } from "@app/lib/dto/like/create-like.dto";

@ApiTags("likes")
@Controller("likes")
export class LikesController {
  constructor(
    private readonly likesService: LikesService, // private readonly postgresService:
  ) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @Req() req) {
    return this.likesService.create(createLikeDto, req.user);
  }

  @Get()
  getTrackLikedByUser(
    @Req() req,
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Query() qs: string,
  ) {
    return this.likesService.getTrackLikedByUser(page, limit, req.user, qs);
  }
}
