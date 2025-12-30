import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderWithItems } from '../../../stores/order';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.scss',
})
export class OrderDetail {
  order = input.required<OrderWithItems | null>();
}
