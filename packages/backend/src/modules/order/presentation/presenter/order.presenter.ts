import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';
import Order from '@src/modules/order/domain/model/entity/order.entity';

export class OrderPresenter {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: keyof typeof OrderStatusEnum;
    customer: string;
    products: string[];

    constructor(order: Order) {
        this.id = order.id;
        this.createdAt = order.createdAt;
        this.updatedAt = order.updatedAt;
        this.status = order.status;
        this.customer = order.customer;
        this.products = order.products;
    }
}
