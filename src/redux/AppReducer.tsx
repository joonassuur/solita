import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStoreData,
  modifyCart,
  removeFromCart,
  setCartQuantity,
} from "../redux/AppActions";
import { Store } from "../types/Types";
import _ from "lodash";

const initialState: Store = {
  products: [],
  cart: [],
  cartQuantity: 0,
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
      const copy = _.cloneDeep(state.cart);
      copy.filter((x) =>
        x.id === payload.id ? (x.quantity = payload.quantity) : false
      );

      state = { ...state, cart: copy };
      return state;
    },
    [removeFromCart.toString()]: (state, { payload }) => {
      const removeIndex = state.cart.map((item) => item.id).indexOf(payload.id);
      state.cart.splice(removeIndex, 1);
    },
    [setCartQuantity.toString()]: (state, { payload }) => {
      state = { ...state, cartQuantity: payload };
      return state;
    },
  },
});

export default app;
