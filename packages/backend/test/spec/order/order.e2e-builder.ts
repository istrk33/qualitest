import { CreateOrderDto } from '@src/modules/order/domain/model/dto/create-order.dto';

const OrderCreateDefaultData: CreateOrderDto = {
    // id: "115-le-big-raciste",
    startDate: new Date('2023-10-22T10:00:00.000Z'),
    endDate: new Date('2023-10-22T12:00:00.000Z'),
    customer: 'CentQuinzeLeRaciste',
    products: ['1', '2'],
};

export const orderBuilder = (orderCreateData: CreateOrderDto = OrderCreateDefaultData) => {
    return {
        withStartDate: (startDate: CreateOrderDto['startDate']) => {
            return orderBuilder({
                ...orderCreateData,
                startDate,
            });
        },

        withEndDate: (endDate: CreateOrderDto['endDate']) => {
            return orderBuilder({
                ...orderCreateData,
                endDate,
            });
        },
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