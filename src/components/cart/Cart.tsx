import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCart, getProducts, getCartQuantity } from "../../redux/Index";
import { useHistory } from "react-router-dom";
import StoreItems from "../store-items/StoreItems";

import "./Cart.scss";

function Cart() {
  const cart = useSelector(getCart);
  const products = useSelector(getProducts);
  const cartQuantity = useSelector(getCartQuantity);
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useHistory();

  const navigateToStore = () => {
    history.push("/");
  };

  useEffect(() => {
    // calculate and show the total amount of all the items in cart in euros
    const total: number[] = [];
    products.map((e) => {
      cart.map((i) => {
        if (e.id === i.id) {
          total.push(e.price * i.quantity);
        }
        return false;
      });
      return false;
    });
    const reducer = (a: number, c: number) => a + c;
    const t = total.reduce(reducer);
    setTotalAmount(t);
  }, [cart, products, totalAmount]);

  return (
    <div id="cart">
      <h1>Cart</h1>
      <div id="cart-content">
        {StoreItems()}
        {cartQuantity > 0 && <h1 id="total-amount">Total: {totalAmount} €</h1>}
        <button id="backToStoreBtn" onClick={() => navigateToStore()}>
          Back to store
        </button>
      </div>
    </div>
  );
}

export default Cart;
