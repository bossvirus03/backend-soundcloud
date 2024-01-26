import { ENUM_USER_TOPICS } from "@app/lib/constant/cafka.topic.constant";
import { CreateUserDto } from "@app/lib/dto/user/create-user.dto";
import { Injectable } from "@nestjs/common";
import { KafkaService } from "../kafka/kafka.service";

@Injectable()
export class UsersService {
  constructor(private clientKafka: KafkaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.clientKafka.produceSend(
      ENUM_USER_TOPICS.CREATE_USER,
      createUserDto,
    );
  }

  async findAll(currentPage, limit, qs) {
    return await this.clientKafka.produceSend(ENUM_USER_TOPICS.GET_ALL_USERS, {
      currentPage,
      limit,
      qs,
    });
  }
}
