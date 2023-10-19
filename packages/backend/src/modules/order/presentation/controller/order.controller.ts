// import { Controller } from '@nestjs/common';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import Order from '../../infrastructure/db/entity/order.orm-entity';
import { GetAllOrderService } from '../../domain/service/use-case/get-all-order.service';
@Controller('/orders')
export default class OrderController {
    constructor(
        private readonly getAllOrdersService: GetAllOrderService,
        // private readonly searchMentoringSlotsService: SearchMentoringSlotsService,
        // private readonly deleteMentoringSlotService: DeleteMentoringSlotService,
        // private readonly getMentoringSlotBySlugService: GetMentoringSlotBySlugService,
        // private readonly updateMentoringSlotService: UpdateMentoringSlotService,
        // private readonly cancelMentoringSlotService: CancelMentoringSlotService,
        // private readonly confirmMentoringSlotService: ConfirmMentoringSlotService,
        // private readonly delayMentoringSlotService: DelayMentoringSlotService,
        // private readonly downgradeMentoringSlotService: DowngradeMentoringSlotService,
        // private readonly getMentoringSlotsByMissedService: GetMentoringSlotsByMissedService,
      ) {}

      @Get('/get-all-orders')
      async getAllOrders(): Promise<Order[]> {
        return await this.getAllOrdersService.getAllOrders();
      }
}
