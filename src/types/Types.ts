export interface StoreItem {
  description: string;
  id: number;
  name: string;
  price: number;
}
export interface Cart {
  id: number;
  quantity: number;
}

export interface Store {
  products: StoreItem[];
  cart: Cart[];
}
