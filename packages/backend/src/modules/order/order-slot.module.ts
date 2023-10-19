import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/db/repository/order.repository';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrderService } from './domain/service/use-case/get-all-order.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';

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
      provide: GetAllOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrderService(orderRepository);
      },
      inject: ['OrderRepository'],
    },
  ],
})
export default class OrderModule {}
