import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export class GetAllOrdersService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) { }
  async getAllOrders(): Promise<Order[]> {;
    const orders = await this.orderRepository.getAllOrders();
    return orders;
  }
}
