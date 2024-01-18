import { Controller } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";
// import { PostgresService } from "./postgres.service";

@ApiTags("likes")
@Controller("likes")
export class LikesController {
  constructor(
    private readonly likesService: LikesService, // private readonly postgresService: PostgresService,
  ) {}

  @MessagePattern({ cmd: "like-track" })
  create(@Payload() payload) {
    const { createLikeDto, user } = payload;
    return this.likesService.create(createLikeDto, user);
  }

  @MessagePattern({ cmd: "get-track-liked-by-user" })
  getTrackLikedByUser(@Payload() payload) {
    return this.likesService.getTrackLikedByUser(payload);
  }
}
