import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productlistSlice';
import productDetailsReducer from './productDetailsSlice';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    registerUser: registerReducer,
    login: loginReducer,
  },
})