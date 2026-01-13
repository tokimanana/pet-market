export function types(): string {
  return 'types';
}

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stripePriceId: string;
  isFeatured: boolean;
};