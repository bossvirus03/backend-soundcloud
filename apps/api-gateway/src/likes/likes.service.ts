import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
// import { PostgresService } from "./postgres.service";

@Injectable()
export class LikesService {
  constructor(
    @Inject("INTERACT_MICROSERVICE") private likeClient: ClientProxy,
  ) {}
  async LikeTrack(createLikeDto, user) {
    return this.likeClient.send({ cmd: "like-track" }, { createLikeDto, user });
  }

  async getTrackLikedByUser(page, limit, user) {
    return this.likeClient.send(
      { cmd: "get-track-liked-by-user" },
      { page, limit, user },
    );
  }
}
