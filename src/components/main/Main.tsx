import React from "react";
import StoreItems from "../store-items/StoreItems";
import "./Main.scss";

function Main() {
  return <div id="main">{StoreItems("add", "Add to cart", "products")}</div>;
}

export default Main;
