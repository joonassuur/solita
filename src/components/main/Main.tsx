import React from "react";
import { useSelector } from "react-redux";
import {
  getProducts,
  getCart,
} from "../../redux/Index";
import StoreItems from "../store-items/StoreItems";
import "./Main.scss";

function Main() {
  const products = useSelector(getProducts);
  const cart = useSelector(getCart);

  return <div id="main">{StoreItems()}</div>;
}

export default Main;
