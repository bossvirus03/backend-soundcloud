/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
require("dotenv").config();
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TransformInterceptor } from "./core/tranform.interceptor";
import cookieParser from "cookie-parser";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  app.enableCors({
    origin: true, //cho phép các domain có cùng origin kết nối tới vd: 'http://localhost' kết nối tới 'http://localhost'
    credentials: true, //cho phép frontend nhận cookie từ phía server
  });

  app.useStaticAssets(join(__dirname, "..", "public"));

  //global decorators
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  //tranform interceptor
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //cookie
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    console.log(`this server listening on port ${port} ...`);
  });
}
bootstrap();
