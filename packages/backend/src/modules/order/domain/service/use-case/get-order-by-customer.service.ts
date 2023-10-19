import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export class GetOrdersByCustomerService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) { }
  async getOrdersByCustomer(customer: string): Promise<Order[]> {
    const orders = await this.orderRepository.getOrdersByCustomer(customer);
    return orders;
  }
}
