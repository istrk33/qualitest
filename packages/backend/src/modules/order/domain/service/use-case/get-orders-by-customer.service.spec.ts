import { GetAllOrdersByCustomerService } from '@src/modules/order/domain/service/use-case/get-all-orders-by-customer.service';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';

describe('get orders by customer only if customer hasn\'t digit and more than 5 chars', () => {
  it('should return orders by customer', async () => {
    const OrderCustomerMock = [{}];

    const orderRepositoryMock = {
      getOrdersByCustomer: () => OrderCustomerMock,
    } as unknown as OrderRepositoryInterface;

    const getOrderService = new GetAllOrdersByCustomerService(orderRepositoryMock);

    const returnValue = await getOrderService.getAllOrdersByCustomer("CentQuinzeLeRaciste");

    expect(returnValue).toEqual(OrderCustomerMock);
  });

  it('should throw an error if the customer has digit', async () => {
    const orderMock = [{}];

    const orderRepositoryMock = {
      getOrdersByCustomer: () => orderMock,
    } as unknown as OrderRepositoryInterface;

    const getOrderService = new GetAllOrdersByCustomerService(orderRepositoryMock);

    await expect(getOrderService.getAllOrdersByCustomer("231sdjkdgns")).rejects.toThrow();
  });

  it('should throw an error if the customer less than 5 chars', async () => {
    const orderMock = [{}];

    const orderRepositoryMock = {
      getOrdersByCustomer: () => orderMock,
    } as unknown as OrderRepositoryInterface;

    const getOrderService = new GetAllOrdersByCustomerService(orderRepositoryMock);

    await expect(getOrderService.getAllOrdersByCustomer("gns")).rejects.toThrow();
  });
});
