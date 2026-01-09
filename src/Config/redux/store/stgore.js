import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice.js';
import productReducer from '../reducers/productSlice.js';
import cartReducer from '../reducers/cartSlice.js';


export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    
  },
});


