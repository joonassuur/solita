import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import products from "../mockedAPI/products.json";

export const fetchStoreData = createAsyncThunk(
  "@app: fetchStoreData",
  async () => {
    // fake the api call
    const res = products;
    return res;
  }
);
export const modifyCart = createAction("@app: modifyCart", (item) => {
  return { payload: item };
});
export const toggleModal = createAction("@app: toggleModal", (isOpen) => {
  return { payload: isOpen };
});
