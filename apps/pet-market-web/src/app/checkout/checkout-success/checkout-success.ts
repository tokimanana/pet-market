import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { OrderStore } from '../../stores/order';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderDetail } from '../../orders/components/order-detail/order-detail';
import { CartStore } from '../../stores/cart';


@Component({
  selector: 'app-checkout-success',
  imports: [CommonModule, OrderDetail],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss',
})
export class CheckoutSuccess implements OnInit {
  public readonly orderStore = inject(OrderStore);
  private readonly route = inject(ActivatedRoute);
  private readonly cartStore = inject(CartStore);

  constructor() {
    afterNextRender(() => {
      this.cartStore.clearCart();
    });
  }

  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (!orderId) {
      this.orderStore.setError('No order ID found');
      return;
    }
    this.orderStore.getOrder(orderId).subscribe();
  }
}
