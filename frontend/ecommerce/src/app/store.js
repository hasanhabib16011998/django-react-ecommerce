import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productlistSlice';
import productDetailsReducer from './productDetailsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
  },
})