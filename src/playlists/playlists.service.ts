import { Injectable } from "@nestjs/common";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { IUser } from "src/users/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Playlist, PlaylistDocument } from "./schemas/playlist.schema";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import aqp from "api-query-params";

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name)
    private PlaylistModel: SoftDeleteModel<PlaylistDocument>,
  ) {}
  async create(createPlaylistDto: CreatePlaylistDto, user: IUser) {
    const playlist = await this.PlaylistModel.create({
      ...createPlaylistDto,
      user: user._id,
      tracks: [],
    });
    return playlist;
  }

  async findAll(page: number, limit: number, qs: string) {
    const { filter } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    const offset = (+page - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.PlaylistModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.PlaylistModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
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

  async findOne(id: string) {
    const result = await this.PlaylistModel.findOne({ _id: id });
    return result;
  } 

  async update(updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.PlaylistModel.updateOne(
      { _id: updatePlaylistDto.id },
      {
        ...updatePlaylistDto,
      },
    );
    return playlist;
  }

  async remove(id: string) {
    const result = await this.PlaylistModel.softDelete({ _id: id });
    return result;
  }
}
