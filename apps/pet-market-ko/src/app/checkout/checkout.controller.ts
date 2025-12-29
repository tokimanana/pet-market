import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async create(@Body() createCheckoutDto: CreateCheckoutDto) {
    const session = await this.checkoutService.create(createCheckoutDto);
    if (!session.url) {
      throw new HttpException('Failed to create checkout session', 400);
    }
    return {
      url: session.url,
    };
  }

  //   Gardez tout le CRUD quand :
  // ✅ Les données doivent être consultables (Orders, Products, Users)
  // ✅ Les données peuvent être modifiées (profil utilisateur, stock produit)
  // ✅ Les données peuvent être supprimées (paniers abandonnés)

  // Gardez SEULEMENT create quand :
  // ✅ C'est une action ponctuelle (Checkout, Login, SendEmail)
  // ✅ Les données sont immuables une fois créées (Paiements, Logs)
  // ✅ La modification serait dangereuse (Transactions bancaires)
}
