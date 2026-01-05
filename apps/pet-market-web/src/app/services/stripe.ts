import { inject, Injectable } from '@angular/core';
import { CartStore } from '../stores/cart';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Stripe {
  private readonly cartStore = inject(CartStore);
  private readonly http = inject(HttpClient);

  createCheckoutSession() {
    const items = this.cartStore.items();
    const totalAmount = this.cartStore.totalAmount();

    return this.http.post<{ url: string }>(
      `${environment.apiUrl}/api/checkout`,
      {
        cartItems: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          stripePriceId: item.stripePriceId,
        })),
        totalAmount,
      }
    )
  }
}
