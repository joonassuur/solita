import React from "react";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/Index";

import "./Header.scss";

function Header({
  navigateToCart
}: {
  navigateToCart: React.MouseEventHandler;
}) {
  const { cartTotalCost, cartQuantityString } = useSelector(getCart);

  return (
    <div id="header-container">
      <div className="header">
        <div className="container">
          <div className="store-name">
            <div className="logo">whee</div>
            <div className="description">
              The most definitive shape store in the world
            </div>
          </div>
          <div className="cart-display">
            <div className="cart">
              <div className="cart-quantity">{cartQuantityString}</div>
              <div className="cart-cost">{`Total: ${cartTotalCost} €`}</div>
            </div>
            <div className="cart-icon" onClick={navigateToCart}>
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
