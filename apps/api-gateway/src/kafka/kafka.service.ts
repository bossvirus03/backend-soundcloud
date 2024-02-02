import { RpcRequestWrapper } from "@app/lib";
import {
  ENUM_AUTH_TOPICS,
  ENUM_USER_TOPICS,
} from "@app/lib/constant/cafka.topic.constant";
import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaService {
  constructor(
    @Inject("API_MICROSERVICE")
    private readonly kafkaClient: ClientKafka,
  ) {}
  async onModuleInit() {
    Object.values(ENUM_USER_TOPICS).forEach((TOPIC) => {
      this.kafkaClient.subscribeToResponseOf(TOPIC);
    });

    Object.values(ENUM_AUTH_TOPICS).forEach((TOPIC) => {
      this.kafkaClient.subscribeToResponseOf(TOPIC);
    });

    await this.kafkaClient.connect();
  }

  async produceSend(topic: string, data) {
    const res = await RpcRequestWrapper(
      await this.kafkaClient.send(topic, data),
    );
    return res;
  }
}
