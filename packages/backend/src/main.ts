import './config/path-aliases/aliases';

import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import { configureApp } from '@src/config/app/app-setup';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  configureApp(app);

  if (process.env.NODE_ENV !== 'test') {
    const port = process.env.APP_PORT || 3000;
    await app.listen(port);
  }
}

bootstrap();
