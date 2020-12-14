import { StoreItem, Cart } from "../types/Types";

export const getProducts = (state: { app: { products: StoreItem[] } }) =>
  state.app.products;
export const getCart = (state: { app: { cart: Cart[] } }) => {
  const cart = state.app.cart;
  const reducer = (accumulator: number, {quantity}: {quantity: number}) => accumulator + quantity;
  const cartQuantity: number = Object.values(cart).reduce(reducer, 0);
  
  return { cart, cartQuantity };
};
