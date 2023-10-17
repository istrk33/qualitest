import { DiscountCalculatorServiceInterface } from '@src/modules/order/utils/interfaces/delete-discount.interface';

export class DiscountCalculatorBy25DayService implements DiscountCalculatorServiceInterface {
  calculate(order, total) {
    if (new Date('now') === '25') {
      total = total - 10;
    }
    return total;
  }
}
