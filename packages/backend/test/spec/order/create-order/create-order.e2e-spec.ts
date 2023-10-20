import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { orderBuilder } from '../order.e2e-builder';
import request from 'supertest';

describe('Create order (e2e)', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should create order in db', async () => {
    const orderBuild = orderBuilder().build();
    const getAllOrdersResponseBeforeCreate = await request(app.getHttpServer()).get('/api/orders/get-all-orders');
    expect(getAllOrdersResponseBeforeCreate.body.length).toEqual(0);
    await request(app.getHttpServer()).post('/api/orders').send(orderBuild);
    const getAllOrdersResponseAfterCreate = await request(app.getHttpServer()).get('/api/orders/get-all-orders');
    expect(getAllOrdersResponseAfterCreate.body.length).toEqual(1);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
