import { Component, inject } from '@angular/core';
import { CartStore } from '../stores/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  readonly cartStore = inject(CartStore);

  checkout() {
    console.log('Proceeding to checkout with items:', this.cartStore.items());
  }
}
