import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import products from "../mockedAPI/products.json";

export const fetchStoreData = createAsyncThunk(
  "@app: fetchStoreData",
  async () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // fake the api call for development mode
      const res = products;
      return res;
    } else {
      // for production
      const res = await fetch("/api/products");
      const toJson = await res.json();
      return toJson;
    }
  }
);
export const addToCart = createAction("@app: addToCart", item => {
  return { payload: item };
});
