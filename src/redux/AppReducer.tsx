import { createSlice } from "@reduxjs/toolkit";
import { fetchStoreData, modifyCart, toggleModal } from "../redux/AppActions";
import { Store } from "../types/Types";

import _ from "lodash";

const initialState: Store = {
  products: [],
  cart: [],
  isModalOpen: false,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStoreData.fulfilled.toString()]: (state, { payload }) => {
      state.products = payload.products;
    },
    [fetchStoreData.rejected.toString()]: (state) => {
      return state;
    },
    [modifyCart.toString()]: (state, { payload }) => {
      const clonedCart = _.cloneDeep(state.cart);
      const existingItemFilter = clonedCart.filter(
        (cartItem) => cartItem.id === payload.id
      );
      
      if (existingItemFilter.length > 0) {
        clonedCart.map((cartItem) =>
          cartItem.id === existingItemFilter[0].id
            ? (cartItem.quantity = payload.quantity)
            : false
        );
      } else {
        clonedCart.push(payload);
      }

      state.cart = clonedCart;
    },
    [toggleModal.toString()]: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
});

export default app;
