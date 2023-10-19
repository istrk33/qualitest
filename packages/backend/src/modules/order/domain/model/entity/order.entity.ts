import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';

export default class Order {
    id: string;

    createdAt: Date;

    updatedAt: Date;

    status: OrderStatusEnum;

    customer: string;

    products: string[];

    setPaid(): void {
        this.status = OrderStatusEnum.Paid;
        this.updatedAt = new Date();
    }
    setCancelled(): void {
        this.status = OrderStatusEnum.Canceled;
        this.updatedAt = new Date();
    }
}