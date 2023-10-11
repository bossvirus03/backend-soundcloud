/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  //global decorators
  const reflector = app.get(Reflector);
  //app.useGlobalGuards(new JwtAuthGuard(reflector))

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    console.log(`this server listening on port ${port} ...`);
  });
}
bootstrap();
