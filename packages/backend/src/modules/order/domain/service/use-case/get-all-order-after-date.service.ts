import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export class GetOrdersAfterDateService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) { }
  async getOrdersAfterDate(date: Date): Promise<Order[]> {
    const orders = await this.orderRepository.getOrdersAfterDate(date);
    return orders;
  }
}
