import { CreateOrderDto } from '@src/modules/order/domain/model/dto/create-order.dto';

const OrderCreateDefaultData: CreateOrderDto = {
    customer: 'CentQuinzeLeRaciste',
    products: ['1', '2'],
};

export const orderBuilder = (orderCreateData: CreateOrderDto = OrderCreateDefaultData) => {
    return {
        withCustomer: (customer: CreateOrderDto['customer']) => {
            return orderBuilder({
                ...orderCreateData,
                customer,
            });
        },
        build() {
            return orderCreateData;
        },
    };
};