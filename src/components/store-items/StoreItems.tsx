import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addToCart,
  getCartQuantity,
  getCart,
  getProducts,
} from "../../redux/Index";
import { StoreItem, Cart } from "../../types/Types";
import _ from "lodash";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./StoreItems.scss";

function StoreItems() {
  const location = useLocation();
  const route = location.pathname;
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const products = useSelector(getProducts);
  const cartQuantity = useSelector(getCartQuantity);

  const notify = (str: string) => toast(str);

  const addOrRemoveItem = (storeItem: StoreItem) => {
    const cartFilter: Cart[] = cart.filter((cartItem) => cartItem.id === storeItem.id);
    let cartFilterCopy = _.cloneDeep(cartFilter[0]);

    if (route === "/cart") {
      cartFilterCopy.quantity -= 1;
      notify("Item removed from cart");
    } else {
      cartFilterCopy.quantity += 1;
      notify("Item added to cart");
    }
    dispatch(addToCart(cartFilterCopy));
  };

  const renderItemList = (item: StoreItem, quantity?: number) => {
    // render cart / product list
    return (
      <div key={item.id} className="storeItem">
        <div className="left">
          <div className={`image ${item.name.toLowerCase()}`}></div>
          <div className="name-desc">
            <h1 className="product-name">{item.name}</h1>
            <div>{item.description}</div>
          </div>
        </div>
        <div className="right">
          <div className="price-btn-qty">
            <h1 className="product-price">{`${item.price} €`}</h1>
            {route === "/cart" && (
              <h3 className="product-quantity">{`Quantity: ${quantity}`}</h3>
            )}
            <button className="addRemove-btn" onClick={() => addOrRemoveItem(item)}>
              {route === "/cart" ? "Remove from cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (route === "/cart" && cartQuantity > 0) || route === "/" ? (
    <>
      {products.map((product: StoreItem) => {
        if (route === "/cart") {
          return cart.map((cartItem) => {
            return (
              // during cart view, render only items that are in cart
              product.id === cartItem.id &&
              cartItem.quantity > 0 &&
              renderItemList(product, cartItem.quantity)
            );
          });
        } else {
          // render product list
          return renderItemList(product);
        }
      })}
    </>
  ) : (
    <h2>No items in cart</h2>
  );
}

export default StoreItems;
