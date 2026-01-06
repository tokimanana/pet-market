import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { OrdersService } from '../orders/orders.service';
import { Stripe } from 'stripe';

@Injectable()
export class CheckoutService {
  private stripe: Stripe;

  constructor(
    private readonly orderService: OrdersService,
    private readonly configService: ConfigService
  ) {
    const stripeSecret = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (!stripeSecret) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    }

    this.stripe = new Stripe(stripeSecret, {
      apiVersion: '2025-12-15.clover',
    });
  }

  async create(createCheckoutDto: CreateCheckoutDto) {
    const order = await this.orderService.create({
      items: createCheckoutDto.cartItems,
      totalAmount: createCheckoutDto.totalAmount,
    });

    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:4200'
    );

    const session = await this.stripe.checkout.sessions.create({
      line_items: createCheckoutDto.cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${frontendUrl}/checkout/success?orderId=${order.id}`,
      cancel_url: `${frontendUrl}/checkout/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    return {
      url: session.url,
      sessionId: session.id,
      orderId: order.id,
    };
  }
}
