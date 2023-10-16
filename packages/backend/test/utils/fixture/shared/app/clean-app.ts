import { INestApplication } from '@nestjs/common';
import { clearDB } from '../db-connection/clear-db';
import DataSource from '@src/modules/database/config/typeorm.config';

export const cleanApp = async (app: INestApplication, connection: typeof DataSource) => {
  await clearDB(connection);
  await connection.destroy();
  await app.close();
};
