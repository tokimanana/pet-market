import { Component, inject } from '@angular/core';
import { CartStore } from '../stores/cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cartStore = inject(CartStore);

  updateQuantity(productId: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const quantity = parseInt(target.value, 10);
    if(quantity > 0) {
      this.cartStore.updateQuantity(productId, quantity);
    }
  }
}
