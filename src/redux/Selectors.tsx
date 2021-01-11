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
    return Object.values(cart).reduce((itemTotal, product) => {
      return itemTotal + product.quantity;
    }, 0);
  })();

  // calculate total cost of all items in a cart
  const cartTotalCost: number = Object.values(cart).reduce(
    (subTotal, cartItem) => {
      products.map((product) => {
        if (cartItem.id === product.id) {
          subTotal += product.price * cartItem.quantity;
        }
      });
      return subTotal;
    },
    0
  );

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

export const getIsModalOpen = (state: { app: { isModalOpen: boolean } }) =>
  state.app.isModalOpen;
