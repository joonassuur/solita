export interface StoreItem {
  description: string;
  id: number;
  name: string;
  price: number;
}
export interface Store {
  products: StoreItem[];
  cart: StoreItem[];
}