import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import { givenExistingOrder } from '../order.e2e-fixture';
import { orderBuilder } from '../order.e2e-builder';
import request from 'supertest';
import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';

describe('Update MentoringSlot Category (e2e)', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should order status', async () => {
    const orderBuild = orderBuilder().build();
    const order = await givenExistingOrder(connection, orderBuild);
    const getAllOrdersByCustomerResponse = await request(app.getHttpServer()).patch(`/api/orders/${order.id}/cancel-order`);
    expect(getAllOrdersByCustomerResponse.status).toBe(200);
    expect(getAllOrdersByCustomerResponse.body.status).toEqual(OrderStatusEnum.Canceled);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
