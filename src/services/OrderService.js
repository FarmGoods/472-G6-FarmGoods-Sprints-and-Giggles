import { PrismaClient, PaymentMethods } from '@prisma/client'
import { ProductRepository } from '@/repositories/ProductRepository'
import { OrderRepository } from '@/repositories/OrderRepository'
import { OrderDetailRepository } from '@/repositories/OrderDetailRepository'

export class OrderService {
    constructor() {
        this.prisma = new PrismaClient()
        this.orderRepository = new OrderRepository()
    }

    async getActiveCart() {
        return await this.orderRepository.findByStatusEqualO()
    }

    #transformCartToDetails(cart) {
        return {
            orderId: cart.orderId,
            orderStatus: cart.orderStatus,
            purchaseDate: cart.purchaseDatetime,
            purchaseOption: cart.purchaseOption,
            products: cart.orderDetails.map(detail => ({
                productId: detail.product.productId,
                productName: detail.product.productName,
                price: detail.product.productPrice,
                quantity: detail.quantity,
                totalAmount: detail.orderTotalAmount
            })),
            totalCartAmount: cart.orderDetails.reduce((total, detail) =>
                total + detail.orderTotalAmount, 0)
        };
    }

    async getOrderDetails(orderId) {
        const cart = await this.orderRepository.findById(orderId);

        if (!cart) {
            return null;
        }

        return this.#transformCartToDetails(cart);
    }

    async getCartDetails() {
        const cart = await this.getActiveCart();

        if (!cart) {
            return null;
        }

        return this.#transformCartToDetails(cart);
    }

    async addOrder(cartItem, paymentMethods) {
        const orderDetail = cartItem.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            orderTotalAmount: item.quantity * item.price
        })
        )

        return await this.orderRepository.addOrder(orderDetail, paymentMethods);

    }

}
