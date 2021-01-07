import React from "react";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/Index";

import "./Header.scss";
interface PropsInterface {
  navigateToStore: (route?: string) => void;
  navigateToCart: (route?: string) => void;
}
const Header: React.FC<PropsInterface> = ({
  navigateToCart,
  navigateToStore,
}) => {
  const { cartTotalCost, cartQuantityString } = useSelector(getCart);

  return (
    <header id="header-container">
      <div className="header">
        <div className="container">
          <div className="store-name">
            <a
              tabIndex={0}
              title="whee logo"
              href="/#"
              className="logo"
              onClick={() => navigateToStore()}
            >
              whee
            </a>
            <div tabIndex={0} className="description">
              The most definitive shape store in the world
            </div>
          </div>
          <div className="cart-display">
            <div className="cart">
              <div className="cart-quantity" tabIndex={0}>
                {cartQuantityString}
              </div>
              <div
                className="cart-cost"
                tabIndex={0}
              >{`Total: ${cartTotalCost} €`}</div>
            </div>
            <div
              tabIndex={0}
              aria-label="cart icon"
              className="cart-icon"
              onClick={() => navigateToCart()}
            >
              <span className="material-icons">shopping_cart</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
