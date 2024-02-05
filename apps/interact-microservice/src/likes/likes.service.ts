import { Injectable } from "@nestjs/common";
import { IUser } from "@app/lib/interfaces/user/user.interface";
import { PostgresService } from "../../../postgres.service";

@Injectable()
export class LikesService {
  constructor(private readonly postgresService: PostgresService) {}

  async handleLikeTrack(createLikeDto, user: IUser) {
    const { track, quantity } = createLikeDto;
    const isLiked = await this.postgresService.query(
      `SELECT * FROM likes WHERE userid=\'${user._id}\' AND trackid=\'${track}\'`,
    );

    if (isLiked.length > 0) {
      // nếu user like hoặc dislike
      const th2 = await this.postgresService.query(
        `UPDATE likes SET quantity = \'${quantity}\'  WHERE id = ${isLiked[0].id}`,
      );
      console.log(th2);
    } else {
      //nếu user chưa like
      await this.postgresService.query(
        `INSERT INTO likes (trackid, userid, quantity) VALUES (\'${track}\', \'${user._id}\', ${quantity})`,
      );
    }
    return { d: "ok" };
  }
  async getTrackLikedByUser(payload) {
    const { page, limit, user } = payload;
    const offset = (+page - 1) * +limit;
    const isLiked = await this.postgresService.query(
      `SELECT *
      FROM tracks 
      JOIN likes ON likes.trackid = tracks.id
      WHERE userid = \'${user._id}\'
      AND quantity = 1
      LIMIT ${limit}
      OFFSET ${offset}`,
    );
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (
      await this.postgresService.query(
        `SELECT COUNT(*)
      FROM tracks
      JOIN likes ON likes.trackid = tracks.id
      WHERE userid = '${user._id}'
      AND quantity = 1
      `,
      )
    ).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    return {
      meta: {
        current: page,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      isLiked,
    };
  }
}
