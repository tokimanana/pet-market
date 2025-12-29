import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '@prisma/client';

type CartItem = Product & { quantity: number };

const CART_LOCALSTORAGE_KEY = 'pet_market_cart';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const CartStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(() => {
    if ('localStorage' in globalThis) {
      return {
        ...initialState,
        items: JSON.parse(
          localStorage.getItem(CART_LOCALSTORAGE_KEY) ?? '[]'
        ) as CartItem[],
      };
    }
    return initialState;
  }),
  withComputed((store) => ({
    totalItems: computed(() =>
      store.items().reduce((acc, item) => {
        return acc + item.quantity;
      }, 0)
    ),
    totalAmount: computed(() =>
      store.items().reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0)
    ),
  })),
  withMethods((store) => ({
    addToCart(product: Product, quantity = 1) {
      const currentItems = store.items();
      const itemInCart = currentItems.find(
        (cartItem) => cartItem.id === product.id
      );

      if (itemInCart) {
        const updatedItems = store.items().map((cartItem) => {
          if (cartItem.id === product.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + quantity,
            };
          }
          return cartItem;
        });
        patchState(store, { items: updatedItems });
        localStorage.setItem(
          CART_LOCALSTORAGE_KEY,
          JSON.stringify(updatedItems)
        );
      } else {
        const newItems = [...store.items(), { ...product, quantity }];
        patchState(store, { items: newItems });
        localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(newItems));
      }
    },
    updateQuantity(productId: string, quantity: number) {
      const updatedItems = store
        .items()
        .map((item) => (item.id === productId ? { ...item, quantity } : item));
      patchState(store, { items: updatedItems });
      localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(updatedItems));
    },
    removeFromCart(productId: string) {
      const updatedItems = store
        .items()
        .filter((item) => item.id !== productId);
      patchState(store, { items: updatedItems });
      localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(updatedItems));
    },
    clearCart() {
      patchState(store, { items: [] });
      localStorage.removeItem(CART_LOCALSTORAGE_KEY);
    },
  }))
);
