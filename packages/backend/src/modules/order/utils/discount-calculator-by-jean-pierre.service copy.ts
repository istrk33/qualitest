import { DiscountCalculatorServiceInterface } from '@src/modules/order/utils/interfaces/discount-calculator.interface';

export class DiscountCalculatorByJeanPierreService implements DiscountCalculatorServiceInterface {
  calculate(order: Order, total: number): number {
    if (order.user.name === 'Jean Pierre') {
      total = total * 0.5;
    }

    return total;
  }
}

