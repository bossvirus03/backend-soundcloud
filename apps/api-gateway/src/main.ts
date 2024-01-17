/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from "@nestjs/core";
require("dotenv").config();
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("NestJS series API Document SoundCloud")
    .setDescription("All modules APIs")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "Bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "token",
    )
    .addSecurityRequirements("token")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, stopAtFirstError: true }),
  );

  await app.listen(port);
  Logger.log(`🚀 api gateway running on: http://localhost:${port}`);
}
bootstrap();
