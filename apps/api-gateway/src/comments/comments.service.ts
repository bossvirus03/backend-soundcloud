import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import aqp from "api-query-params";
import { IUser } from "@app/lib/interfaces/user/user.interface";
import { CreateCommentDto } from "@app/lib/dto/comment/create-comment.dto";
import { UpdateCommentDto } from "@app/lib/dto/comment/update-comment.dto";
import { Comment } from "apps/interact-microservice/src/comments/schemas/comment.schema";

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
    const { sort, population } = aqp(qs);
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
