import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@app/lib";
import { IUser } from "@app/lib/interfaces/user/user.interface";
@ApiTags("comments")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: IUser,
  ) {
    return await this.commentsService.create(createCommentDto, user);
  }

  // @Post()
  // findAll(
  //   @Query() current: number,
  //   @Query() pageSize: number,
  //   @Query() trackId: mongoose.Types.ObjectId,
  //   @Query() qs: string,
  // ) {
  //   return this.commentsService.findAll(current, pageSize, trackId, qs);
  // }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(+id);
  }
}
