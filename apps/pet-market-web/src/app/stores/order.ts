import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Order, OrderItem, Product } from '@prisma/client';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs';

const GET_ORDER = gql`
  query GetOrder($id: String!) {
    order(id: $id) {
      id
      items {
        quantity
        price
        productId
        product {
          id
          name
          image
        }
      }
      totalAmount
      status
      createdAt
    }
  }
`;

type OrderItemWithProduct = OrderItem & {
  product: Product;
};

type OrderWithItems = Order & {
  items: OrderItemWithProduct[];
};

type OrderState = {
  orders: OrderWithItems[];
  orderDetail: OrderWithItems | null;
  error: string | null;
};

const initialState: OrderState = {
  orders: [],
  orderDetail: null,
  error: null,
};

export const OrderStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(() => initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    getOrder(id: string) {
      patchState(store, { error: null });
      return apollo
        .query<{ order: OrderWithItems }>({
          query: GET_ORDER,
          variables: {
            id,
          },
        })
        .pipe(
          tap({
            next: ({ data }) => {
              if (data?.order) {
                patchState(store, { orderDetail: data.order });
              } else {
                patchState(store, { error: 'Order not found' });
              }
            },
            error: (error) => patchState(store, { error: error.message }),
          })
        );
    },
    setError(error: string) {
      patchState(store, {
        error,
      });
    },
  }))
);
