import { createSlice } from "@reduxjs/toolkit";
import { fetchStoreData, addToCart, removeFromCart } from "../redux/AppActions";
import { Store } from "../types/Types";

const initialState: Store = {
  products: [],
  cart: [],
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
    [addToCart.toString()]: (state, { payload }) => {
      const copy = state.cart.filter(l => l.id !== payload.id)
      copy.push(payload);
      state = { ...state, cart: copy };
      return state;
    },
    [removeFromCart.toString()]: (state, { payload }) => {
      const removeIndex = state.cart.map(item => item.id).indexOf(payload.id);
      state.cart.splice(removeIndex, 1)
    },
  },
});

export default app;
