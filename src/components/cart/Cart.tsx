import React from "react";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/Index";
import StoreItems from "../store-items/StoreItems";

import "./Cart.scss";

function Cart({
  navigateToStore,
}: {
  navigateToStore: React.MouseEventHandler;
}) {
  const { cartQuantity, cartTotalCost } = useSelector(getCart);

  return (
    <div id="cart">
      <h1>Cart</h1>
      <div id="cart-content">
        {StoreItems("remove", "Remove from cart", "cart")}
        {cartQuantity > 0 && (
          <h1 tabIndex={0} id="total-amount">
            Total: {cartTotalCost} €
          </h1>
        )}
        <button id="backToStoreBtn" onClick={navigateToStore}>
          Back to store
        </button>
      </div>
    </div>
  );
}

export default Cart;
