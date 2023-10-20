import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export class GetAllOrdersAfterDateService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) { }
  async getAllOrdersAfterDate(date: Date): Promise<Order[]> {
    const orders = await this.orderRepository.getAllOrdersAfterDate(date);
    return orders;
  }
}
