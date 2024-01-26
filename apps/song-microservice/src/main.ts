import { NestFactory } from "@nestjs/core";
import { SongMicroserviceModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SongMicroserviceModule,
    {
      transport: Transport.TCP,
      options: {
        host: "localhost",
        port: 3002,
      },
    },
  );
  await app.listen();
  console.log("track running on http://localhost:3002");
}
bootstrap();
