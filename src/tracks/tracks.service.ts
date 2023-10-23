import { Injectable } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { IUser } from "src/users/user.interface";
import { Tracks, TracksDocument } from "./schema/track.schema";
import { InjectModel } from "@nestjs/mongoose";
import aqp from "api-query-params";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Tracks.name)
    private trackModel: SoftDeleteModel<TracksDocument>,
  ) {}
  async create(createTrackDto: CreateTrackDto, user: IUser) {
    const {
      title,
      category,
      countLike,
      countPlay,
      description,
      imgUrl,
      trackUrl,
    } = createTrackDto;
    const track = await this.trackModel.create({
      title,
      category,
      countLike,
      countPlay,
      description,
      imgUrl,
      trackUrl,
      uploader: user._id,
    });
    return track;
  }
  async increaseView(trackId) {
    const prevCountPlay = await this.trackModel.findOne({ _id: trackId });
    console.log(prevCountPlay.countPlay);
    await this.trackModel.updateOne(
      { _id: trackId },
      { countPlay: ++prevCountPlay.countPlay },
    );
    return "ok";
  }
  async getTopTrack(limit: number, category: string) {
    const result = await this.trackModel
      .find({ category })
      .sort({ countPlay: -1 })
      .limit(limit);
    return result;
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.trackModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.trackModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }
  async searchTrackWithName(page: number, limit: number, title: string, qs) {
    const { population } = aqp(qs);
    const offset = (+page - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.trackModel.find()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.trackModel
      .find({title: {$regex: `${title}`}})
      .skip(offset)
      .limit(defaultLimit)
      .populate(population)
      .exec();
    return {
      meta: {
        current: page, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }
  async findOne(id: string) {
    const track = await this.trackModel.findOne({ _id: id });
    return track;
  }
  async getTrackCreatedByUser(page: number, limit , user, qs) {
    const { population } = aqp(qs);
    const offset = (+page - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.trackModel.find()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.trackModel
      .find({ uploader: user })
      .skip(offset)
      .limit(defaultLimit)
      .populate(population)
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
  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackModel.updateOne(
      { _id: id },
      { ...updateTrackDto },
    );
    return track;
  }
  async remove(id: string) {
    const track = await this.trackModel.softDelete({ _id: id });
    return track;
  }
}
