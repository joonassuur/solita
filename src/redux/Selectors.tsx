import { StoreItem, CartItem } from "../types/Types";

export const getProducts = (state: { app: { products: StoreItem[] } }) =>
  state.app.products;
export const getCart = (state: { app: { cart: CartItem[] } }) => {
  const cart = state.app.cart;
  const reducer = (itemCount: number, {quantity}: {quantity: number}) => itemCount + quantity;
  const cartQuantity: number = Object.values(cart).reduce(reducer, 0);
  
  return { cart, cartQuantity };
};
