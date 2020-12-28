import { createSlice } from "@reduxjs/toolkit";
import { fetchStoreData, addToCart } from "../redux/AppActions";
import { Store } from "../types/Types";

const initialState: Store = {
  products: [],
  cart: []
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStoreData.fulfilled.toString()]: (state, { payload }) => {
      state.products = payload.products;
    },
    [fetchStoreData.rejected.toString()]: state => {
      return state;
    },
    [addToCart.toString()]: (state, { payload }) =>
      void {
        ...state,
        cart: {
          ...state.cart,
          id: state.cart.filter(item =>
            item.id === payload.id ? (item.quantity = payload.quantity) : false
          )
        }
      },
  }
});

export default app;
