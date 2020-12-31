import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyCart, getCart, getProducts } from "../../redux/Index";
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
      notify("Item added to cart");
    }

    dispatch(modifyCart(cartFilterCopy));
  };

  const renderItemList = (product: StoreItem, quantity?: number) => {
    // render cart / product list
    return (
      <div key={product.id} className="storeItem">
        <div className="left">
          <div className={`image ${product.name.toLowerCase()}`}></div>
          <div className="name-desc">
            <h1 className="product-name">{product.name}</h1>
            <div>{product.description}</div>
          </div>
        </div>
        <div className="right">
          <div className="price-btn-qty">
            <h1 className="product-price">{`${product.price} €`}</h1>
            {renderElement === "cart" && (
              <h3 className="product-quantity">{`Quantity: ${quantity}`}</h3>
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
