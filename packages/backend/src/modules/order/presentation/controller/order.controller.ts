// import { Controller } from '@nestjs/common';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import Order from '../../infrastructure/db/entity/order.orm-entity';
import { GetAllOrderService } from '../../domain/service/use-case/get-all-order.service';
import { GetOrdersBeforeDateService } from '../../domain/service/use-case/get-all-order-before-date.service';
import { OrderPresenter } from '@src/modules/order/presentation/presenter/order.presenter';
import { GetOrdersAfterDateService } from '../../domain/service/use-case/get-all-order-after-date.service';
import { GetOrdersByCustomerService } from '../../domain/service/use-case/get-order-by-customer.service';

const MIN_CHAR_LENGTH = 5;
@Controller('/orders')
export default class OrderController {

  constructor(
    private readonly getAllOrdersService: GetAllOrderService,
    private readonly getOrdersBeforeDateService: GetOrdersBeforeDateService,
    private readonly getOrdersAfterDateService: GetOrdersAfterDateService,
    private readonly getOrdersByCustomerService: GetOrdersByCustomerService,
    // private readonly searchMentoringSlotsService: SearchMentoringSlotsService,
    // private readonly deleteMentoringSlotService: DeleteMentoringSlotService,
    // private readonly getMentoringSlotBySlugService: GetMentoringSlotBySlugService,
    // private readonly updateMentoringSlotService: UpdateMentoringSlotService,
    // private readonly cancelMentoringSlotService: CancelMentoringSlotService,
    // private readonly confirmMentoringSlotService: ConfirmMentoringSlotService,
    // private readonly delayMentoringSlotService: DelayMentoringSlotService,
    // private readonly downgradeMentoringSlotService: DowngradeMentoringSlotService,
    // private readonly getMentoringSlotsByMissedService: GetMentoringSlotsByMissedService,
  ) { }

  @Get('/get-all-orders')
  async getAllOrders(): Promise<Order[]> {
    return await this.getAllOrdersService.getAllOrders();
  }

  @Get('/get-all-orders-before-date/:date')
  async getOrdersBeforeDate(@Param('date') date: string): Promise<Order[]> {
    return await this.getOrdersBeforeDateService.getOrdersBeforeDate(new Date(date));
  }

  @Get('/get-all-orders-after-date/:date')
  async getOrdersAfterDate(@Param('date') date: string): Promise<Order[]> {
    return await this.getOrdersAfterDateService.getOrdersAfterDate(new Date(date));
  }

  @Get('/get-all-orders-by-customer/:customer')
  async getOrdersByCustomer(@Param('customer') customer: string): Promise<Order[]> {
    // if customer contains digit and length<5
    if (customer.length < MIN_CHAR_LENGTH || /\d/.test(customer)) {
      if (customer.length < MIN_CHAR_LENGTH) {
        throw new Error('Error on username length, it must be 5 char minimum !');
      } else {
        throw new Error('Error on username composition, it can\'t have digit !');
      }

    }
    return await this.getOrdersByCustomerService.getOrdersByCustomer(customer);
  }
}
