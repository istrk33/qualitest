import OrderOrm from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import Order from '@src/modules/order/domain/model/entity/order.entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export class GetAllOrdersByCustomerService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) { }
  async getAllOrdersByCustomer(customer: string): Promise<OrderOrm[]> {
    if (customer.length < Order.MIN_CHAR_LENGTH) {
      throw new Error('Error on username length, it must be 5 char minimum !');
    }
    if (/\d/.test(customer)) {
      throw new Error('Error on username composition, it can\'t have digit !');
    }
    
    const orders = await this.orderRepository.getAllOrdersByCustomer(customer);
    return orders;
  }
}
