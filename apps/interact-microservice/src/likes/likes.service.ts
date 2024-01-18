import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tracks } from "apps/backend-soundcloud/src/tracks/schema/track.schema";
import { IUser } from "@app/lib/interfaces/user/user.interface";
import { PostgresService } from "./postgres.service";

@Injectable()
export class LikesService {
  constructor(
    private readonly postgresService: PostgresService,
    @InjectModel(Tracks.name) private tracksModel: Model<Tracks>,
  ) {}

  // INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
  // VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');

  /**
   * UPDATE table_name
    SET column1 = value1, column2 = value2, ...
    WHERE condition;
   */
  async create(createLikeDto, user: IUser) {
    const { track, quantity } = createLikeDto;
    const isLiked = await this.postgresService.query(
      `SELECT * FROM likes WHERE userid=\'${user._id}\'`,
    );
    console.log(isLiked);

    if (quantity == 1) {
      if (isLiked.length > 0 || is) {
        console.log("ssssssss");
        const th2 = await this.postgresService.query(
          `UPDATE likes SET trackid = ${track} quantity = 1`,
        );
        console.log(th2);
      } else {
        console.log("hrêree");

        const th3 = await this.postgresService.query(
          `INSERT INTO likes (trackid, userid, quantity) VALUES (${track}, ${user._id}, ${quantity})`,
        );
        console.log(th3);
      }
      return { d: "ok" };
    }
  }
  async getTrackLikedByUser(payload) {
    console.log(payload);
    // const { page, limit, user, qs } = payload;
    //   const isLiked = await this.likeModel.findOne({
    //     user: user._id,
    //     quantity: 1,
    //   });
    //   const { sort } = aqp(qs);
    //   const offset = (+page - 1) * +limit;
    //   const defaultLimit = +limit ? +limit : 10;
    //   const totalItems = (await this.tracksModel.find()).length;
    //   const totalPages = Math.ceil(totalItems / defaultLimit);
    //   const result = await this.tracksModel
    //     .find({ _id: { $in: isLiked.track } })
    //     .skip(offset)
    //     .limit(defaultLimit)
    //     .sort(sort as any)
    //     .exec();
    //   return {
    //     meta: {
    //       current: page,
    //       pageSize: limit,
    //       pages: totalPages,
    //       total: totalItems,
    //     },
    //     result,
    //   };
  }
}
