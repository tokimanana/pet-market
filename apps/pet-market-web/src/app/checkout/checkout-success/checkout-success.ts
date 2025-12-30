import { Component, inject, OnInit } from '@angular/core';
import { OrderStore } from '../../stores/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  imports: [],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss',
})
export class CheckoutSuccess implements OnInit{
  public readonly orderStore = inject(OrderStore);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (!orderId) {
      this.orderStore.setError('No order ID found');
      return;
    }
    this.orderStore.getOrder(orderId).subscribe();
  }
}
