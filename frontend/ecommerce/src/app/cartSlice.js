import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, qty } = action.payload;
      const existItem = state.cartItems.find(i => i.product.id === product.id);
      if (existItem) {
        existItem.qty = qty;
      } else {
        state.cartItems.push({ product, qty });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(i => i.product.id === id);
      if (item && item.qty < item.product.stockcount) {
        item.qty += 1;
      }
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(i => i.product.id === id);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;