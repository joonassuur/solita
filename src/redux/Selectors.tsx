import { StoreItem } from "../types/Types";
export const getProducts = (state: { app: { products: StoreItem[] } }) =>
  state.app.products;
export const getCart = (state: { app: { cart: StoreItem[] } }) =>
  state.app.cart;
