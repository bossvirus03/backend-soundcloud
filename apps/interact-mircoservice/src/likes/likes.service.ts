import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Like } from "./schemas/like.schema";
import aqp from "api-query-params";
import { Tracks } from "apps/backend-soundcloud/src/tracks/schema/track.schema";
import { IUser } from "@app/lib/interfaces/user/user.interface";

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
    @InjectModel(Tracks.name) private tracksModel: Model<Tracks>,
  ) {}
  async create(createLikeDto, user: IUser) {
    const { track, quantity } = createLikeDto;
    const isLiked = await this.likeModel.findOne({
      user: user._id,
      quantity: 1,
    });

    //
    if (quantity == 1) {
      if (isLiked && !isLiked.track.includes(track)) {
        await this.likeModel.updateOne(
          { user: user._id },
          {
            track: [...isLiked.track, track],
            quantity: quantity,
          },
        );
      } else if (!isLiked.track.includes(track)) {
        await this.likeModel.create({
          track: track,
          user: user._id,
          quantity: quantity,
        });
      }
      return { d: "ok" };
    }
  }
  async getTrackLikedByUser(page, limit, user, qs) {
    const isLiked = await this.likeModel.findOne({
      user: user._id,
      quantity: 1,
    });
    const { sort } = aqp(qs);
    const offset = (+page - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.tracksModel.find()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.tracksModel
      .find({ _id: { $in: isLiked.track } })
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .exec();
    return {
      meta: {
        current: page,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }
}
