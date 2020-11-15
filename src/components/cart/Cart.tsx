import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/Index";
import { useHistory } from "react-router-dom";

import StoreItems from "../store-items/StoreItems";

import "./Cart.scss";

function Cart() {
  const cart = useSelector(getCart);
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useHistory();

  const navigateToStore = () => {
    history.push("/");
  };

  useEffect(() => {
    // calculate and show the total amount
    const total: number[] = [];
    const reducer = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;
    cart.forEach((i) => total.push(i.price));
    if (total.length > 0) {
      setTotalAmount(total.reduce(reducer));
    } else {
      setTotalAmount(0);
    }
  }, [cart, totalAmount]);

  return (
    <div id="cart">
      <h1>Cart</h1>
      <div id="cart-content">
        {cart.length > 0 ? (
          StoreItems(cart, cart)
        ) : (
          <h3 id="no-items">No items in cart</h3>
        )}
        <h1 id="total-amount">Total: {totalAmount} €</h1>
        <button id="backToStoreBtn" onClick={() => navigateToStore()}>
          Back to store
        </button>
      </div>
    </div>
  );
}

export default Cart;
