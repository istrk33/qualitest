import { Global, Module } from '@nestjs/common';
import { OrmEntityToDomainEntityMapper } from '@src/modules/shared/infrastructure/db/ormEntityToDomainEntityMapper.service';

@Global()
@Module({
  providers: [OrmEntityToDomainEntityMapper],
  exports: [OrmEntityToDomainEntityMapper],
})
export default class SharedModule {}
