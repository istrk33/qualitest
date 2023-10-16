import cloneDeep from 'lodash/cloneDeep';

export class OrmEntityToDomainEntityMapper {
  mapOrmEntityToDomainEntity<T>(entityOrm: object, entityDomain: T): T {
    const clonedEntityOrm = cloneDeep(entityOrm);

    Object.assign(entityDomain, clonedEntityOrm);

    return entityDomain;
  }
}
