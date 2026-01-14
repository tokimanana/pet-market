import { afterNextRender, Component, inject } from '@angular/core';
import { OrderStore } from '../../stores/order';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderDetail } from '../../orders/components/order-detail/order-detail';
import { CartStore } from '../../stores/cart';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap } from 'rxjs';

@Component({
  selector: 'app-checkout-success',
  imports: [CommonModule, OrderDetail],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss',
})
export class CheckoutSuccess {
  public readonly orderStore = inject(OrderStore);
  private readonly route = inject(ActivatedRoute);
  private readonly cartStore = inject(CartStore);
  getAndUpdateOrder = rxMethod<string>(
    pipe(
      switchMap((orderId) => {
        return this.orderStore.getOrder(orderId);
      }),
      switchMap((order) => {
        if (order?.status === 'PAYMENT_REQUIRED') {
          return this.orderStore.updateOrder({
            id: order?.id,
            status: 'PENDING',
          });
        }
        return of(null);
      })
    )
  );

  constructor() {
    afterNextRender(() => {
      this.cartStore.clearCart();

      const orderId = this.route.snapshot.queryParamMap.get('orderId');
      if (!orderId) {
        this.orderStore.setError('No order ID found');
        return;
      }
      this.getAndUpdateOrder(orderId);
    });
  }
}
