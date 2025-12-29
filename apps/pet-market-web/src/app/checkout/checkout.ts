import { Component, inject } from '@angular/core';
import { CartStore } from '../stores/cart';
import { CommonModule } from '@angular/common';
import { Stripe } from '../services/stripe';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  public readonly cartStore = inject(CartStore);
  private readonly stripeService = inject(Stripe);

  checkout() {
    this.stripeService.createCheckoutSession().subscribe(({ url }) => {
      location.href = url;
    });
  }
}
