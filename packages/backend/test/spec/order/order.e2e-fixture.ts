import DataSource from '@src/modules/database/config/typeorm.config';
import { CreateOrderDto } from '@src/modules/order/domain/model/dto/create-order.dto';
import OrderOrm from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export const givenExistingOrder = async (connection: typeof DataSource, orderBuild: CreateOrderDto) => {
  const orderRepository = connection.getRepository(OrderOrm);

  const order = orderRepository.create(orderBuild as DeepPartial<OrderOrm>);

  return orderRepository.save(order);
};