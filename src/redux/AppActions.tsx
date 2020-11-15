import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStoreData = createAsyncThunk(
  "@app: fetchStoreData",
  async () => {
    const res = await fetch("/api/products");
    const toJson = await res.json();
    return toJson;
  }
);
export const modifyCart = createAction("@app: modifyCart", (item) => {
  return { payload: item };
});
export const removeFromCart = createAction("@app: removeFromCart", (item) => {
  return { payload: item };
});
export const setCartQuantity = createAction("@app: setCartQuantity", (item) => {
  return { payload: item };
});
