import { afterNextRender, Component, inject } from '@angular/core';
import { ProductStore } from '../stores/product';
import { ProductCard } from "../components/product-card/product-card";
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import untilDestroyed from '../utils/untilDestroyed';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  readonly productStore = inject(ProductStore);
  searchTerm = '';
  searchSubject = new Subject<string>();
  destroyed = untilDestroyed();

  constructor() {
    this.productStore.loadProducts();
    afterNextRender(() => {
      this.searchSubject.pipe(
        debounceTime(600),
        distinctUntilChanged(),
        this.destroyed()
      ).subscribe((term) => {
        console.log({ term })
        this.productStore.searchProducts(term);
      });
    })
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }
}
