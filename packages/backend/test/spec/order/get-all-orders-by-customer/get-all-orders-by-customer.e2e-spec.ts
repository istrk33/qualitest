import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { orderBuilder } from '@test/spec/order/order.e2e-builder';
import { givenExistingOrder } from '@test/spec/order/order.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('GET ALL ORDERS BY CUSTOMER', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should return orders if there is orders with demanded customer in DB', async () => {
    const order = orderBuilder().build();
    await givenExistingOrder(connection, order);
    const getAllOrdersByCustomerResponse = await request(app.getHttpServer()).get(`/api/orders/get-all-orders-by-customer/CentQuinzeLeRaciste`);
    expect(getAllOrdersByCustomerResponse.status).toBe(200);
    expect(getAllOrdersByCustomerResponse.body.length).toBe(1);
  });

  it('should not return any order if there is no order with the demanded customer in DB', async () => {
    const order = orderBuilder().build();
    await givenExistingOrder(connection, order);
    const getAllOrdersByCustomerResponse = await request(app.getHttpServer()).get(`/api/orders/get-all-orders-by-customer/CentQuinzeNestPasUnRaciste`);
    expect(getAllOrdersByCustomerResponse.status).toBe(200);
    expect(getAllOrdersByCustomerResponse.body).toEqual([]);
    expect(getAllOrdersByCustomerResponse.body.length).toBe(0);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
