import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, setCartQuantity, getCartQuantity } from "../../redux/Index";
import { useHistory } from "react-router-dom";

import "./Header.scss";

function Header() {
  const history = useHistory();
  const cart = useSelector(getCart);
  const cartQuantity = useSelector(getCartQuantity);
  const dispatch = useDispatch();

  const [width, setWidth] = useState(window.innerWidth);

  const navigateToCart = () => {
    history.push("/cart");
  };

  useEffect(() => {
    // set total objects in cart
    const total = Object.values(cart).reduce(
      (t, { quantity }) => t + quantity,
      0
    );
    dispatch(setCartQuantity(total));

    // listen to window size changes to re-calculate triangles
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
  }, [cart, dispatch]);

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
            <div className="cart">{`${cartQuantity ||
              "No"} items in cart`}</div>
            <div className="cart-icon" onClick={navigateToCart}>
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
        <div id="triangles-container">
          {/* {renderTriangles()} */}
          <div className="triangle"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
