import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresErrorHandler } from '@src/modules/database/service/postgres-error-handler';
import { createDataSourceConfigBase } from './config/typeorm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return createDataSourceConfigBase();
      },
    }),
  ],
  providers: [PostgresErrorHandler],
  exports: [PostgresErrorHandler],
})
export class DatabaseModule {}
