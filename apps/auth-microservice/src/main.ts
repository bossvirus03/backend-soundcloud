import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: "localhost",
        port: 3001,
      },
    },
  );

  await app.listen();
  Logger.log(`🚀 auth service running on: http://localhost:3001`);
}
bootstrap();
