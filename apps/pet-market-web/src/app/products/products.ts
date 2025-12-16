import { Component, inject } from '@angular/core';
import { ProductStore } from '../stores/product';
import { CommonModule } from '@angular/common';
import { ProductCard } from "../components/product-card/product-card";

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  readonly productStore = inject(ProductStore);

  constructor() {
    this.productStore.loadProducts();
  }
}
