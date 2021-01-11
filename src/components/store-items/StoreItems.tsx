import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  modifyCart,
  getCart,
  getProducts,
  toggleModal,
} from "../../redux/Index";
import { StoreItem, CartItem } from "../../types/Types";
import _ from "lodash";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./StoreItems.scss";

function StoreItems(
  cartAction: string,
  buttonText: string,
  renderElement: string
) {
  // cartAction > accepts either "add" or "remove"; decide whether the product should be removed or added to cart
  // buttonText > accepts any string; text to display on "Add to Cart" buttons.
  // renderElement > string "cart" returns a list of cart items, any other string returns products list

  const dispatch = useDispatch();
  const { cart, cartQuantity } = useSelector(getCart);
  const products = useSelector(getProducts);

  const notify = (toastString: string) => toast(toastString);

  const addOrRemoveItem = (storeItem: StoreItem) => {
    const cartFilter: CartItem[] = (() => {
      const existingItemInCart = cart.filter(
        (cartItem) => cartItem.id === storeItem.id
      );
      if (existingItemInCart.length > 0) {
        return existingItemInCart;
      }
      return [{ id: storeItem.id, quantity: 0 }];
    })();

    let cartFilterCopy = _.cloneDeep(cartFilter[0]);

    if (cartAction === "remove") {
      cartFilterCopy.quantity -= 1;
      notify("Item removed from cart");
    }
    if (cartAction === "add") {
      cartFilterCopy.quantity += 1;
      dispatch(toggleModal(true));
      notify("Item added to cart");
    }

    dispatch(modifyCart(cartFilterCopy));
  };

  const renderItemList = (product: StoreItem, quantity?: number) => {
    // render cart / product list
    return (
      <div key={product.id} className="storeItem">
        <div
          tabIndex={0}
          title={product.name}
          className={`image ${product.name.toLowerCase()}`}
        ></div>
        <div className="item-details">
          <div className="name-price">
            <h1 className="product-name" tabIndex={0}>
              {product.name}
            </h1>
            <h1
              className="product-price"
              tabIndex={0}
            >{`${product.price} €`}</h1>
          </div>
          <div className="desc-btn-quantity">
            <div className="product-desc" tabIndex={0}>
              {product.description}
            </div>
            <div className="quantity-btn">
              {renderElement === "cart" && (
                <h3
                  className="product-quantity"
                  tabIndex={0}
                >{`Quantity: ${quantity}`}</h3>
              )}
              <button
                className="addRemove-btn"
                onClick={() => addOrRemoveItem(product)}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStoreItems = () => {
    if (renderElement === "cart" && cartQuantity < 1) {
      return <h2>No items in cart</h2>;
    }

    return (
      <>
        {products?.map((product: StoreItem) => {
          if (renderElement === "cart") {
            // render cart list
            return (
              cart &&
              cart.map((cartItem) => {
                return (
                  // during cart view, render only items that are in cart
                  product.id === cartItem.id &&
                  cartItem.quantity > 0 &&
                  renderItemList(product, cartItem.quantity)
                );
              })
            );
          } else {
            // render product list
            return renderItemList(product);
          }
        })}
      </>
    );
  };

  return renderStoreItems();
}

export default StoreItems;
