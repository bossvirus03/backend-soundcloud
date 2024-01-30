import { Injectable } from "@nestjs/common";
import { IUser } from "@app/lib/interfaces/user/user.interface";
import { KafkaService } from "../kafka/kafka.service";
import { ENUM_AUTH_TOPICS } from "@app/lib/constant/cafka.topic.constant";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
@Injectable()
export class AuthService {
  constructor(
    private kafkaClient: KafkaService,
    @InjectQueue("send_mail") private sendMail: Queue,
  ) {}

  async login(user) {
    return this.kafkaClient.produceSend(ENUM_AUTH_TOPICS.LOGIN, user);
  }

  async register(user) {
    const res: IUser = await this.kafkaClient.produceSend(
      ENUM_AUTH_TOPICS.REGISTER,
      { ...user },
    );

    if (res && res._id) {
      await this.sendMail.add(
        "register-user",
        {
          to: "nguyenhuuloi17032004@gmail.com",
          name: "nguyen huu loi",
        },
        {
          removeOnComplete: true,
        },
      );
    }
    return res;
  }

  async getProfile(user: IUser) {
    return this.kafkaClient.produceSend(ENUM_AUTH_TOPICS.GET_PROFILE, user);
  }

  HandleRefresh() {
    return this.kafkaClient.produceSend(ENUM_AUTH_TOPICS.REFRESH, {});
  }

  async logout(payload) {
    return this.kafkaClient.produceSend(ENUM_AUTH_TOPICS.LOGOUT, payload);
  }
}
