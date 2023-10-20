import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class DeleteOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) { }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.orderRepository.findOrderById(id);

    if (!order) {
      throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${id} not found`);
    }

    await this.orderRepository.delete({ id: id });
  }
}
