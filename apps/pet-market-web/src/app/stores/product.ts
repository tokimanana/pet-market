import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';
import { Product } from '@prisma/client'

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      image
      stripePriceId
      isFeatured
    }
  }
`;

export interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
};

export const ProductStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    loadProducts() {
      patchState(store, { loading: true, error: null });
      
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
        })
        .valueChanges.pipe(
          map(({ data }) => {
            const products = (data?.products || []) as Product[];
            return products.filter((p): p is Product => p !== undefined && p !== null);
          })
        )
        .subscribe({
          next: (products) => {
            patchState(store, { 
              products, 
              loading: false 
            });
          },
          error: (error) => {
            patchState(store, { 
              error: error.message || 'Une erreur est survenue', 
              loading: false 
            });
          }
        });
    },
    
    loadFeaturedProducts() {
      patchState(store, { loading: true, error: null });
      
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
        })
        .valueChanges.pipe(
          map(({ data }) => {
            const products = (data?.products || []) as Product[];
            return products
              .filter((p): p is Product => p !== undefined && p !== null)
              .filter(p => p.isFeatured === true);
          })
        )
        .subscribe({
          next: (featuredProducts) => {
            patchState(store, { 
              featuredProducts, 
              loading: false 
            });
          },
          error: (error) => {
            patchState(store, { 
              error: error.message || 'Une erreur est survenue', 
              loading: false 
            });
          }
        });
    }
  }))
);