export interface DiscountCalculatorServiceInterface {
  calculate(order: Order, total: number): number;
}
