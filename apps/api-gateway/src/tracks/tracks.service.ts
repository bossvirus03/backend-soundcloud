import { Inject, Injectable } from "@nestjs/common";
import { CreateTrackDto } from "../../../../libs/lib/src/dto/track/create-track.dto";
import { IUser } from "../../../../libs/lib/src/interfaces/user/user.interface";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class TracksService {
  constructor(@Inject("TRACK_MICROSERVICE") private trackClient: ClientProxy) {}
  async create(createTrackDto: CreateTrackDto, user: IUser) {
    const track = await this.trackClient.send(
      { cmd: "create-track" },
      { createTrackDto, user },
    );
    return track;
  }

  async getTopTrack(limit: number, category: string) {
    const result = await this.trackClient.send(
      { cmd: "get-top-track" },
      { limit, category },
    );
    return result;
  }

  async increaseView(trackId) {
    const result = await this.trackClient.send(
      { cmd: "increase-view" },
      trackId,
    );
    return result;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const result = await this.trackClient.send(
      { cmd: "find-all-track" },
      { currentPage, limit, qs },
    );
    return result;
  }
  // async searchTrackWithName(page: number, limit: number, title: string, qs) {
  //   const { population } = aqp(qs);
  //   const offset = (+page - 1) * +limit;
  //   const defaultLimit = +limit ? +limit : 10;
  //   const totalItems = (await this.trackModel.find()).length;
  //   const totalPages = Math.ceil(totalItems / defaultLimit);
  //   const result = await this.trackModel
  //     .find({ title: { $regex: `${title}` } })
  //     .skip(offset)
  //     .limit(defaultLimit)
  //     .populate(population)
  //     .exec();
  //   return {
  //     meta: {
  //       current: page, //trang hiện tại
  //       pageSize: limit, //số lượng bản ghi đã lấy
  //       pages: totalPages, //tổng số trang với điều kiện query
  //       total: totalItems, // tổng số phần tử (số bản ghi)
  //     },
  //     result, //kết quả query
  //   };
  // }
  // async findOne(id: string) {
  //   const track = await this.trackModel.findOne({ _id: id });
  //   return track;
  // }
  // async getTrackCreatedByUser(page: number, limit, user, qs) {
  //   const { population } = aqp(qs);
  //   const offset = (+page - 1) * +limit;
  //   const defaultLimit = +limit ? +limit : 10;
  //   const totalItems = (await this.trackModel.find()).length;
  //   const totalPages = Math.ceil(totalItems / defaultLimit);
  //   const result = await this.trackModel
  //     .find({ uploader: user })
  //     .skip(offset)
  //     .limit(defaultLimit)
  //     .populate(population)
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
  // }
  // async update(id: string, updateTrackDto: UpdateTrackDto) {
  //   const track = await this.trackModel.updateOne(
  //     { _id: id },
  //     { ...updateTrackDto },
  //   );
  //   return track;
  // }
  // async remove(id: string) {
  //   const track = await this.trackModel.softDelete({ _id: id });
  //   return track;
  // }
}
