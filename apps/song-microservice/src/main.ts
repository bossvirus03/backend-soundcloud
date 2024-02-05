import { NestFactory } from "@nestjs/core";
import { SongMicroserviceModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SongMicroserviceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: "track",
        protoPath: join(process.cwd(), "proto/track/track.proto"),
        url: process.env.GRPC_CONNECT_URL
      },
    }
  );
  await app.listen();
  console.log("track running on http://localhost:3002");
}
bootstrap();
