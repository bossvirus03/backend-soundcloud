import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { IUser } from "src/users/user.interface";
import { Comment } from "./schemas/comment.schema";
import aqp from "api-query-params";
//import aqp from "api-query-params";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDto, user: IUser) {
    const comment = this.commentModel.create({
      ...createCommentDto,
      user: user._id,
    });
    return comment;
  }

  async findAllComments(current, pageSize, trackId, qs) {
    const { filter, sort, population } = aqp(qs);
    console.log("check filter>>>", filter);
    const offset = (+current - 1) * +pageSize;
    const defaultLimit = +pageSize ? +pageSize : 10;
    const totalItems = (await this.commentModel.find()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.commentModel
      .find({ track: trackId })
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
    return {
      meta: {
        current: current,
        pageSize: pageSize,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }
  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
