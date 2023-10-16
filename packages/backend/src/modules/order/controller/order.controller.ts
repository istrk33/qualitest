import { Controller, Post } from '@nestjs/common';

@Controller('/order')
export default class ProductToCartAdder {
    constructor(
        private readonly addProductToCartService: AddProductToCartService
    ){}

    @Post()
    async addProductToCart(request: Request): Promise<Order> {
        const productId = request.body.productId;
        const productQuantity = request.body.quantity;
        const orderId = request.body.orderId;

        return await this.addProductToCartService.addProductToCart(productId, orderId, productQuantity)
    }
}