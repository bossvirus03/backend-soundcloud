import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: "localhost",
        port: 3003,
      },
    },
  );
  await app.listen();
  Logger.log(`🚀 user service running on: http://localhost:3003`);
}
bootstrap();
