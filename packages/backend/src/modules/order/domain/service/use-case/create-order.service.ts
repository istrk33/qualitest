import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/domain/model/entity/order.entity';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { CreateOrderDto } from '@src/modules/order/domain/model/dto/create-order.dto';
import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';

export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
  ) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createCreator = {
      ...createOrderDto,
      status: OrderStatusEnum.InCart,
    };

    return await this.saveOrder(createCreator);
  }

  private async saveOrder(createOrder: DeepPartial<Order>): Promise<Order> {
    try {
      const order = await this.orderRepository.persist<Order>(createOrder);
      return order;
    } catch (error) {
      throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist order : ${error.message}`);
    }
  }
}
