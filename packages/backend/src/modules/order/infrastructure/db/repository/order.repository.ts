import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import OrderOrm from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrmEntityToDomainEntityMapper } from '@src/modules/shared/infrastructure/db/ormEntityToDomainEntityMapper.service';
import { Inject } from '@nestjs/common';
export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,

    @Inject(OrmEntityToDomainEntityMapper)
    private readonly ormEntityToDomainEntityMapper: OrmEntityToDomainEntityMapper,
  ) {
    super(Order, datasource.createEntityManager());
  }

  async getAllOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    // query.where('or.wasMissedByMentor = :wasMissedByMentor', { wasMissedByMentor: true });

    const orderOrm = await query.getMany();

    return this.mapOrderOrmToOrders(orderOrm);
  }

  async getOrdersBeforeDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.created_at < :paramDate', {
      paramDate: date.toDateString(),
    });
    const orderOrm = await query.getMany();
    return this.mapOrderOrmToOrders(orderOrm);
  }

  async getOrdersAfterDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.created_at > :paramDate', {
      paramDate: date.toDateString(),
    });
    const orderOrm = await query.getMany();
    return this.mapOrderOrmToOrders(orderOrm);
  }
 
  async getOrdersByCustomer(customer: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.customer = :paramCustomer', {
      paramCustomer: customer,
    });
    const orderOrm = await query.getMany();
    return this.mapOrderOrmToOrders(orderOrm);
  }

  async findOrderById(id:string):Promise<Order>{
    const query = this.createQueryBuilder('order');

    query.where('order.id = :id', { id });

    const order = await query.getOne();

    if (!order) {
      return null;
    }

    return this.mapOrderOrmToOrder(order);
  }
 
  private mapOrderOrmToOrder(mentoringSlotOrm: OrderOrm): Order {
    const order = this.ormEntityToDomainEntityMapper.mapOrmEntityToDomainEntity<Order>(
      mentoringSlotOrm,
      new Order(),
    );

    return order;
  }

  private mapOrderOrmToOrders(OrderOrm: OrderOrm[]): Order[] {
    return OrderOrm.map((OrderOrm) => this.mapOrderOrmToOrder(OrderOrm));
  }
}
