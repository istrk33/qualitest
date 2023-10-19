// import { SearchMentoringSlotsDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/search-mentoring-slots.dto.interface';
// import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';

export interface OrderRepositoryInterface extends RepositoryInterface {
//   searchMentoringSlots(searchFilters: SearchMentoringSlotsDtoInterface): Promise<MentoringSlot[]>;
  getAllOrders(): Promise<Order[]>;
  getOrdersBeforeDate(date:Date): Promise<Order[]>;
  getOrdersAfterDate(date:Date): Promise<Order[]>;
  getOrdersByCustomer(customer:string): Promise<Order[]>;
  findOrderById(id:string):Promise<Order>;
//   findMentoringSlots(): Promise<MentoringSlot[]>;
//   findMentoringSlotBySlug(slug: string): Promise<MentoringSlot>;
//   findMentoringSlotById(id: string): Promise<MentoringSlot>;
//   findMentoringSlotsBetweenDates(startDate: Date, endDate: Date): Promise<MentoringSlot[]>;
//   findMentoringSlotsByMissed(): Promise<MentoringSlot[]>;
}
