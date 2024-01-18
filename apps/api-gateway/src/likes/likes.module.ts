import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "INTERACT_MICROSERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesModule],
})
export class LikesModule {}
