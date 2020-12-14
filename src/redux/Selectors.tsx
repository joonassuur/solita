import { StoreItem, Cart } from "../types/Types";

export const getProducts = (state: { app: { products: StoreItem[] } }) =>
  state.app.products;
export const getCart = (state: { app: { cart: Cart[] } }) => {
  const cart = state.app.cart;
  const cartQuantity = Object.values(cart).reduce(
    (accumulator, { quantity }) => accumulator + quantity,
    0
  );
  return { cart, cartQuantity };
};
