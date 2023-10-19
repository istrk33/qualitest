import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface{
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {
    super(Order, datasource.createEntityManager());
  }
  
  getAllOrders(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
