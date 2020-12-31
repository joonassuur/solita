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
    const totalCostReducer = (subTotal: number, totalProductCost: number) =>
      subTotal + totalProductCost;

    const totalCostPerProduct = (() => {
      const totalCost = cart.map((cartItem) =>
        products.map((product) =>
          product.id === cartItem.id ? product.price * cartItem.quantity : 0
        )
      );
      if (totalCost.length > 0) {
        return totalCost;
      }
      return [0];
    })();

    const totalCost: number = totalCostPerProduct
      .flat()
      .reduce(totalCostReducer);
    return totalCost;
  })();

  const cartQuantityString: string = (() => {
    if (cartQuantity === 1) {
      return `${cartQuantity} item in cart`;
    }
    if (cartQuantity > 1) {
      return `${cartQuantity} items in cart`;
    }
    return "No items in cart";
  })();

  return { cart, cartQuantity, cartTotalCost, cartQuantityString };
};
