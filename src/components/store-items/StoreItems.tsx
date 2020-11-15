import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/Index";
import { StoreItem } from "../../types/Types";

import "./StoreItems.scss";

function StoreItems(products: StoreItem[], cart: StoreItem[]) {

  const dispatch = useDispatch();

  const addOrRemoveItem = (i: StoreItem) => {
    // if item exists in cart, remove it, otherwise add to cart
    if (cart.some((x: StoreItem) => x.id === i.id)) {
      dispatch(removeFromCart(i));
    } else {
      dispatch(addToCart(i));
    }
  };
  
  return (
    <>
      {products.map((e: StoreItem) => {
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
              <div className="price-btn">
                <h1 id="product-price">{`${e.price} €`}</h1>
                <button onClick={() => addOrRemoveItem(e)}>
                  {cart.some((x: StoreItem) => x.id === e.id)
                    ? "Remove from cart"
                    : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default StoreItems;