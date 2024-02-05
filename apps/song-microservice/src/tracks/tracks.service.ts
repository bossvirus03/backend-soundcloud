import { Injectable } from "@nestjs/common";
import { IUser } from "../../../../libs/shared/src/interfaces/user/user.interface";
import { CreateTrackDto } from "@app/lib/dto/track/create-track.dto";
import { PostgresService } from "apps/postgres.service";
import aqp from "api-query-params";

@Injectable()
export class TracksService {
  constructor(private readonly postgresService: PostgresService) {}
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

    const track = await this.postgresService.query(
      `INSERT INTO tracks (title, category, countlike, countplay, description, imgurl, trackurl, uploader) VALUES (\'${title}\', \'${category}\', ${countLike}, ${countPlay}, \'${description}\', \'${imgUrl}\', \'${trackUrl}\', \'${user._id}\')`
    );
    console.log(track);
    return track;
  }

  async getTopTrack(limit: number, category: string) {
    const result = await this.postgresService.query(
      `SELECT * FROM tracks WHERE category = \'${category}\' LIMIT ${limit}`
    );
    const resultSorted = result.sort(function (a, b) {
      return a.countplay - b.countplay;
    });
    return resultSorted;
  }

  async increaseView(trackId) {
    const prevView = (
      await this.postgresService.query(
        `SELECT countplay FROM tracks WHERE id=\'${trackId}\'`
      )
    )[0].countplay;
    console.log(prevView);

    await this.postgresService.query(
      `UPDATE tracks SET countplay=${prevView + 1}`
    );
    return "ok";
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter /*, sort, population*/ } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (
      await this.postgresService.query(`SELECT COUNT(*) FROM tracks`)
    )[0].count;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.postgresService.query(
      `SELECT * FROM tracks LIMIT ${defaultLimit} OFFSET ${offset};`
    );
    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: +totalItems,
      },
      result,
    };
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
