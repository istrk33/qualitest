import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';

export interface OrderRepositoryInterface extends RepositoryInterface {
  getAllOrders(): Promise<Order[]>;
  getAllOrdersBeforeDate(date: Date): Promise<Order[]>;
  getAllOrdersAfterDate(date: Date): Promise<Order[]>;
  getAllOrdersByCustomer(customer: string): Promise<Order[]>;
  findOrderById(id: string): Promise<Order>;
}
