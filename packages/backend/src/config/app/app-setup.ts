import { ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from '@src/modules/shared/infrastructure/http/http-exception.filter';
import { join } from 'path';
import * as requestIp from 'request-ip';

export const configureApp = (app: NestExpressApplication) => {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: 'http://localhost:4001',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useStaticAssets(join(__dirname, '../../..', 'public'), {
    prefix: '/public/',
  });

  app.use(requestIp.mw());
};
