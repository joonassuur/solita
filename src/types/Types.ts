export interface StoreItem {
  description: string;
  id: number;
  name: string;
  price: number;
}
export interface Store {
  products: StoreItem[];
  cart: [
    { id: number; quantity: number },
    { id: number; quantity: number },
    { id: number; quantity: number }
  ];
  cartQuantity: number;
}
export interface Cart {
  id: number;
  quantity: number;
}
