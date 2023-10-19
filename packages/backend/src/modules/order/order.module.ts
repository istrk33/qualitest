import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/db/repository/order.repository';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrdersService } from './domain/service/use-case/get-all-orders.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import { GetOrdersBeforeDateService } from './domain/service/use-case/get-all-order-before-date.service';
import { GetOrdersAfterDateService } from './domain/service/use-case/get-all-order-after-date.service';
import { GetOrdersByCustomerService } from './domain/service/use-case/get-order-by-customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    // OrderRepository,
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
      provide: GetOrdersBeforeDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersBeforeDateService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: GetOrdersAfterDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersAfterDateService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
    {
      provide: GetOrdersByCustomerService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersByCustomerService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
  ],
})
export default class OrderModule {}
