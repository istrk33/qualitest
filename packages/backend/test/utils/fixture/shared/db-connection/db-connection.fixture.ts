import DataSource from '@src/modules/database/config/typeorm.config';

export const givenExistingDbConnection = async (): Promise<typeof DataSource> => {
  return await DataSource.initialize();
};
