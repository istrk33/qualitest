// import { Controller } from '@nestjs/common';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import OrderOrm from '../../infrastructure/db/entity/order.orm-entity';
import { GetAllOrdersService } from '../../domain/service/use-case/get-all-orders.service';
import { GetAllOrdersBeforeDateService } from '../../domain/service/use-case/get-all-orders-before-date.service';
import { OrderPresenter } from '@src/modules/order/presentation/presenter/order.presenter';
import { GetAllOrdersAfterDateService } from '../../domain/service/use-case/get-all-orders-after-date.service';
import { GetAllOrdersByCustomerService } from '../../domain/service/use-case/get-all-orders-by-customer.service';
import { SetOrderStatusCancelService } from '../../domain/service/use-case/cancel-order.service';
import { SetOrderStatusPaidService } from '../../domain/service/use-case/set-order-status-paid.service';
import { DeleteOrderService } from '../../domain/service/use-case/delete-order.service';
import { CreateOrderDto } from '../../domain/model/dto/create-order.dto';
import { CreateOrderService } from '../../domain/service/use-case/create-order.service';


@Controller('/orders')
export default class OrderController {

  constructor(
    private readonly getAllOrdersService: GetAllOrdersService,
    private readonly getOrdersBeforeDateService: GetAllOrdersBeforeDateService,
    private readonly getOrdersAfterDateService: GetAllOrdersAfterDateService,
    private readonly getOrdersByCustomerService: GetAllOrdersByCustomerService,
    private readonly setOrderStatusToPaidService: SetOrderStatusPaidService,
    private readonly setOrderStatusToCancelService: SetOrderStatusCancelService,
    private readonly deleteOrderService: DeleteOrderService,
    private readonly createOrderService: CreateOrderService,
  ) { }

  @Get('/get-all-orders')
  async getAllOrders(): Promise<OrderOrm[]> {
    return await this.getAllOrdersService.getAllOrders();
  }

  @Get('/get-all-orders-before-date/:date')
  async getAllOrdersBeforeDate(@Param('date') date: string): Promise<OrderOrm[]> {
    return await this.getOrdersBeforeDateService.getAllOrdersBeforeDate(new Date(date));
  }

  @Get('/get-all-orders-after-date/:date')
  async getAllOrdersAfterDate(@Param('date') date: string): Promise<OrderOrm[]> {
    return await this.getOrdersAfterDateService.getAllOrdersAfterDate(new Date(date));
  }

  @Get('/get-all-orders-by-customer/:customer')
  async getAllOrdersByCustomer(@Param('customer') customer: string): Promise<OrderOrm[]> {
    return await this.getOrdersByCustomerService.getAllOrdersByCustomer(customer);
  }

  @Patch('/:id/pay-order')
  async setOrderStatusToPaidById(@Param('id') id: string): Promise<OrderPresenter> {
    const order = await this.setOrderStatusToPaidService.setOrderStatusToPaid(id);
    return new OrderPresenter(order);
  }

  @Patch('/:id/cancel-order')
  async setOrderStatusToCancelById(@Param('id') id: string): Promise<OrderPresenter> {
    const order = await this.setOrderStatusToCancelService.setOrderStatusToCancelled(id);
    return new OrderPresenter(order);
  }

  @Patch('/:id/delete-order')
  async deleteOrderById(@Param('id') id: string): Promise<OrderPresenter> {
    const order = await this.setOrderStatusToCancelService.setOrderStatusToCancelled(id);
    return new OrderPresenter(order);
  }

  @Delete('/:id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return await this.deleteOrderService.deleteOrder(id);
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderPresenter> {
    const mentoringSlot = await this.createOrderService.createOrder(createOrderDto);
    return new OrderPresenter(mentoringSlot);
  }
}
