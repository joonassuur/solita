import React from "react";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/Index";
import { useHistory } from "react-router-dom";

import "./Header.scss";

function Header() {
  const history = useHistory();
  const { cartQuantity } = useSelector(getCart);

  const navigateToCart = () => {
    history.push("/cart");
  };

  return (
    <div id="header-container">
      <div id="header">
        <div className="container">
          <div className="left">
            <div className="logo">whee</div>
            <div className="description">
              The most definitive shape store in the world
            </div>
          </div>
          <div className="right">
            <div className="cart">
              {`${cartQuantity || "No"} items in cart`}
            </div>
            <div className="cart-icon" onClick={navigateToCart}>
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
        <div id="triangles-container">
          <div className="triangle"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
