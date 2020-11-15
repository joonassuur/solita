import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  modifyCart,
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

  const addOrRemoveItem = (i: StoreItem) => {
    const filter: Cart[] = cart.filter((l) => l.id === i.id);
    let copy = _.cloneDeep(filter[0]);

    if (route === "/cart") {
      copy.quantity -= 1;
      notify("Item removed from cart");
    } else {
      copy.quantity += 1;
      notify("Item added to cart");
    }
    dispatch(modifyCart(copy));
  };

  const renderItemList = (e: StoreItem, quantity?: number) => {
    // render cart / product list
    return (
      <div key={e.id} className="storeItem">
        <div className="left">
          <div className={`image ${e.name.toLowerCase()}`}></div>
          <div className="name-desc">
            <h1 id="product-name">{e.name}</h1>
            <div>{e.description}</div>
          </div>
        </div>
        <div className="right">
          <div className="price-btn-qty">
            <h1 id="product-price">{`${e.price} €`}</h1>
            {route === "/cart" && (
              <h3 id="product-quantity">{`Quantity: ${quantity}`}</h3>
            )}
            <button id="addRemove-btn" onClick={() => addOrRemoveItem(e)}>
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
