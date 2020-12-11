import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStoreData,
  addToCart,
  removeFromCart,
  setCartQuantity
} from "../redux/AppActions";
import { Store } from "../types/Types";

const initialState: Store = {
  products: [],
  cart: [],
  cartQuantity: 0
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
    [addToCart.toString()]: (state, { payload }) => void({
        ...state,
        cart: {
          ...state.cart,
          id: state.cart.filter(item =>
            item.id === payload.id ? (item.quantity = payload.quantity) : false
          )
        }
    }),
    [removeFromCart.toString()]: (state, { payload }) => {
      const removeIndex = state.cart.map(item => item.id).indexOf(payload.id);
      state.cart.splice(removeIndex, 1);
    },
    [setCartQuantity.toString()]: (state, { payload }) => {
      state = { ...state, cartQuantity: payload };
      return state;
    }
  }
});

export default app;
