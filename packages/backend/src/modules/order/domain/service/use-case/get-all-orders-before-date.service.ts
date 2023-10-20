import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export class GetAllOrdersBeforeDateService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) { }
  async getAllOrdersBeforeDate(date: Date): Promise<Order[]> {
    const orders = await this.orderRepository.getAllOrdersBeforeDate(date);
    return orders;
  }
}
