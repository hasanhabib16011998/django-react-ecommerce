import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productlistSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer
  },
})