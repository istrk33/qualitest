import { DiscountDeletorServiceInterface } from '@src/modules/order/utils/interfaces/delete-discount.interface';

export class DiscountCalculatorByJeanPierreService implements DiscountDeletorServiceInterface {
  deleteDiscount(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      order.discount = 0;
    }
  }
}

