import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { JwtAuthGuard } from "apps/auth-microservice/src/auth/jwt-auth.guard";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(3002, () => {
    console.log("listening on http://localhost:3002");
  });
}
bootstrap();
