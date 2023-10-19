import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
// import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import OrderRepository from '@src/modules/order/infrastructure/db/repository/order.repository';

export class GetAllOrderService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) {}
  async getAllOrders(): Promise<Order[]> {
    // // if (!isUserAuthenticated) {
    // //   throw new Error('User is not authenticated');
    // // }

    // const orderRepository = new OrderRepository();

    // const mentoringSlots = await mentoringSlotRepository.findMentoringSlotsByMissed();
    // return mentoringSlots;

    const orders = await this.orderRepository.getAllOrders();
    return orders;
    // return [];
  }
}