import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/domain/model/entity/order.entity';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class SetOrderStatusPaidService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) { }

  async setOrderStatusToPaid(id: string): Promise<Order> {
    const order = await this.orderRepository.findOrderById(id);

    if (!order) {
      throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${id} not found`);
    }
    order.setPaid();

    return await this.saveOrder(order);
  }

  private async saveOrder(orderToPersist: DeepPartial<Order>): Promise<Order> {
    try {
      const order = await this.orderRepository.persist<Order>(orderToPersist);
      return order;
    } catch (error) {
      throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist order : ${error.message}`);
    }
  }
}
