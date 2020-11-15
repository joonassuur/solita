import { StoreItem, Cart } from "../types/Types";

export const getProducts = (state: { app: { products: StoreItem[] } }) =>
  state.app.products;
export const getCart = (state: { app: { cart: Cart[] } }) =>
  state.app.cart;
export const getCartQuantity = (state: { app: { cartQuantity: number } }) =>
  state.app.cartQuantity;
