export type OrderStatus =
  | 'PAYMENT_REQUIRED'
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED';

export type ProductType = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export type OrderItemWithProduct = {
  id: string;
  quantity: number;
  price: number;
  productId: string;
  product: ProductType;
};

export type OrderWithItems = {
  id: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItemWithProduct[];
};