import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import AppModule from '@src/app.module';
import { configureApp } from '../../../../../src/config/app/app-setup';

const createApp = async (app: NestExpressApplication): Promise<NestExpressApplication> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication();
  configureApp(app);

  await app.init();

  return app;
};

export default createApp;
