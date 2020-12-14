import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCart, getProducts } from "../../redux/Index";
import { useHistory } from "react-router-dom";
import StoreItems from "../store-items/StoreItems";

import "./Cart.scss";

function Cart() {
  const { cart, cartQuantity } = useSelector(getCart);
  const products = useSelector(getProducts);
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useHistory();

  const navigateToStore = () => {
    history.push("/");
  };

  useEffect(() => {
    // calculate and show the total amount of all the items in cart in euros
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
      const reducer = (itemTotal1: number, itemTotal2: number) =>
        itemTotal1 + itemTotal2;
      const calculatedTotal = itemTotal.reduce(reducer);
      setTotalAmount(calculatedTotal);
    }
  }, [cart, products, totalAmount]);

  return (
    <div id="cart">
      <h1>Cart</h1>
      <div id="cart-content">
        {StoreItems("remove", "Remove from cart", "cart")}
        {cartQuantity > 0 && <h1 id="total-amount">Total: {totalAmount} €</h1>}
        <button id="backToStoreBtn" onClick={() => navigateToStore()}>
          Back to store
        </button>
      </div>
    </div>
  );
}

export default Cart;
