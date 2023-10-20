import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { givenExistingOrder } from '../order.e2e-fixture';
import { orderBuilder } from '../order.e2e-builder';
import request from 'supertest';

describe('Delete order (e2e)', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should delete order if present in db', async () => {
    const orderBuild = orderBuilder().build();
    const order = await givenExistingOrder(connection, orderBuild);

    const getAllOrdersResponseBeforeDelete = await request(app.getHttpServer()).get('/api/orders/get-all-orders');
    expect(getAllOrdersResponseBeforeDelete.body.length).toEqual(1);

    await request(app.getHttpServer()).delete(`/api/orders/${order.id}`);
    const getAllOrdersResponseAfterDelete = await request(app.getHttpServer()).get('/api/orders/get-all-orders');
    expect(getAllOrdersResponseAfterDelete.body.length).toEqual(0);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
