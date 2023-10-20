import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { orderBuilder } from '@test/spec/order/order.e2e-builder';
import { givenExistingOrder } from '@test/spec/order/order.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('GET ALL ORDERS', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should not return any order if there is no order in DB', async () => {
    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/get-all-orders');
    expect(getAllOrdersResponse.status).toBe(200);
    expect(getAllOrdersResponse.body).toEqual([]);
    expect(getAllOrdersResponse.body.length).toBe(0);
  });

  it('should return an order if there is an order in DB', async () => {
    const order = orderBuilder().build();
    const orderInDb = await givenExistingOrder(connection, order);
    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/get-all-orders');
    expect(getAllOrdersResponse.status).toBe(200);
    expect(getAllOrdersResponse.body.length).toEqual(1);
    expect(getAllOrdersResponse.body[0].id).toEqual(orderInDb.id);
    expect(getAllOrdersResponse.body[0].customer).toEqual(orderInDb.customer);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
