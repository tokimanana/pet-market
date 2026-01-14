export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stripePriceId: string;
  isFeatured: boolean;
};

export type CartItem = Product & { quantity: number };