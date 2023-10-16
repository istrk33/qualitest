import { NestExpressApplication } from '@nestjs/platform-express';
import createApp from './app.factory';

export const givenExistingApp = async (app: NestExpressApplication) => {
  return await createApp(app);
};
