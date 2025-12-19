import { Component, input, output } from '@angular/core';
import { Product } from '@prisma/client'

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
  }
}
