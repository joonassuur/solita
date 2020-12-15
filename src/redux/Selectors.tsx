import { StoreItem, CartItem } from "../types/Types";

export const getProducts = (state: { app: { products: StoreItem[] } }) =>
  state.app.products;
export const getCart = (state: {
  app: { cart: CartItem[]; products: StoreItem[] };
}) => {
  const cart = state.app.cart;
  const products = state.app.products;

  // calculate total amount of items in a cart
  const cartQuantity: number = (() => {
    const cartQuantityReducer = (
      itemCount: number,
      { quantity }: { quantity: number }
    ) => itemCount + quantity;
    return Object.values(cart).reduce(cartQuantityReducer, 0);
  })();

  // calculate total cost of all items in a cart
  const cartTotalCost: number = (() => {
    const totalCostReducer = (itemCount: number, itemTotal: number) =>
      itemCount + itemTotal;
    const itemTotal: number[] = [];
    products.map(product => {
      cart.map(cartItem => {
        if (product.id === cartItem.id) {
          itemTotal.push(product.price * cartItem.quantity);
        }
        return false;
      });
      return false;
    });
    if (itemTotal.length > 0) {
      return itemTotal.reduce(totalCostReducer);
    }
    return 0;
  })();

  return { cart, cartQuantity, cartTotalCost };
};
