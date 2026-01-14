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

export type OrderStatus =
  | 'PAYMENT_REQUIRED'
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED';

export type OrderItemWithProduct = {
  id: string;
  quantity: number;
  price: number;
  productId: string;
  product: Product;
};

export type OrderWithItems = {
  id: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItemWithProduct[];
};
