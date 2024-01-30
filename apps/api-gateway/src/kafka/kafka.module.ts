import { Module } from "@nestjs/common";
import { KafkaService } from "./kafka.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "API_MICROSERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "api-gateway",
            brokers: ["localhost:29092"],
          },
          consumer: {
            groupId: "api-gateway-consumer",
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
