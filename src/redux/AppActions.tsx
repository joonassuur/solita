import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStoreData = createAsyncThunk(
  "@app: fetchStoreData",
  async () => {
    const res = await fetch("/api/products");
    const toJson = await res.json();
    return toJson;
  }
);
export const addToCart = createAction("@app: addToCart", (item) => {
  return { payload: item };
});
export const removeFromCart = createAction("@app: removeFromCart", (item) => {
  return { payload: item };
});
