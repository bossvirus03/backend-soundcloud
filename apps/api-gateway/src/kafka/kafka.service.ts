import { RpcRequestWrapper } from "@app/lib";
import { ENUM_USER_TOPICS } from "@app/lib/constant/cafka.topic.constant";
import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaService {
  constructor(
    @Inject("API_MICROSERVICE")
    private readonly kafkaClient: ClientKafka,
  ) {}
  async onModuleInit() {
    Object.values(ENUM_USER_TOPICS).forEach((TOPIC) =>
      this.kafkaClient.subscribeToResponseOf(TOPIC),
    );

    await this.kafkaClient.connect();
  }

  async produceSend<T, N>(topic: string, data: T): Promise<N> {
    return RpcRequestWrapper(this.kafkaClient.send(topic, data));
  }
}
