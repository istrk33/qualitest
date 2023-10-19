import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import OrderOrm from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface{
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {
    super(Order, datasource.createEntityManager());
  }

 async getAllOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    // query.where('or.wasMissedByMentor = :wasMissedByMentor', { wasMissedByMentor: true });

    const orderOrm = await query.getMany();

    return orderOrm;
  }
}
