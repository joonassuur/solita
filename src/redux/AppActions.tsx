import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import products from '../API/products.json'

export const fetchStoreData = createAsyncThunk(
  "@app: fetchStoreData",
  async () => {
    // fake api call
    const res = products;
    return res;
  }
);
export const addToCart = createAction("@app: addToCart", (item) => {
  return { payload: item };
});
export const removeFromCart = createAction("@app: removeFromCart", (item) => {
  return { payload: item };
});

