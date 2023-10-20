import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/db/repository/order.repository';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrdersService } from './domain/service/use-case/get-all-orders.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import { GetAllOrdersBeforeDateService } from './domain/service/use-case/get-all-orders-before-date.service';
import { GetAllOrdersAfterDateService } from './domain/service/use-case/get-all-orders-after-date.service';
import { GetAllOrdersByCustomerService } from './domain/service/use-case/get-all-orders-by-customer.service';
import { SetOrderStatusPaidService } from './domain/service/use-case/set-order-status-paid.service';
import { SetOrderStatusCancelService } from './domain/service/use-case/cancel-order.service';
import { DeleteOrderService as DeleteOrderByIdService } from './domain/service/use-case/delete-order.service';
import { CreateOrderService } from './domain/service/use-case/create-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepository',
      useClass: OrderRepository,
    },
    {
      provide: GetAllOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: GetAllOrdersBeforeDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersBeforeDateService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: GetAllOrdersAfterDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersAfterDateService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: GetAllOrdersByCustomerService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersByCustomerService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: SetOrderStatusPaidService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetOrderStatusPaidService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: SetOrderStatusCancelService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetOrderStatusCancelService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: DeleteOrderByIdService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderByIdService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService
          (orderRepository);
      },
      inject: ['OrderRepository'],
    },
  ],
})
export default class OrderModule { }
