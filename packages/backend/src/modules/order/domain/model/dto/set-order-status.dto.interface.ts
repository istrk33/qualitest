import { OrderStatusEnum } from "@src/modules/order/domain/model/const/order-status.enum";

export type SetOrderStatusDtoInterface = {
  status: OrderStatusEnum;
};