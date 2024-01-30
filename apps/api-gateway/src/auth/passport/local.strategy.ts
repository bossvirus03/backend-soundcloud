import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { KafkaService } from "../../kafka/kafka.service";
import { ENUM_AUTH_TOPICS } from "@app/lib/constant/cafka.topic.constant";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private kafkaClient: KafkaService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.kafkaClient.produceSend(
      ENUM_AUTH_TOPICS.VALIDATE_USER,
      { username, password },
    );
    if (!user) {
      throw new UnauthorizedException("Username or password is invalid!");
    }
    return user;
  }
}
