import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { OrderWithItems, OrderStatus } from '@pet-market/types';
import { Apollo, gql } from 'apollo-angular';
import { map, tap } from 'rxjs';

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

const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: String!, $status: OrderStatus!) {
    updateOrder(updateOrderInput: { id: $id, status: $status }) {
      id
      status
      totalAmount
      items {
        id
        quantity
        price
        product {
          id
          name
          image
        }
      }
      updatedAt
    }
  }
`;

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
          variables: { id },
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
          }),
          map(({ data }) => data?.order)
        );
    },
    updateOrder(params: { id: string; status: OrderStatus }) {
      return apollo
        .mutate<{ updateOrder: OrderWithItems }>({
          mutation: UPDATE_ORDER,
          variables: { id: params.id, status: params.status },
        })
        .pipe(
          tap({
            next: ({ data }) => {
              if (data?.updateOrder) {
                patchState(store, { orderDetail: data.updateOrder });
              }
            },
            error: (error) => patchState(store, { error: error.message }),
          }),
          map(({ data }) => data?.updateOrder)
        );
    },
    setError(error: string) {
      patchState(store, { error });
    },
  }))
);