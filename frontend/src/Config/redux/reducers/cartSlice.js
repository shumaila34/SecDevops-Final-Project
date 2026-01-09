import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((i) => i._id === item._id);
      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item) item.quantity = quantity;
    },
  },
});

// ✅ Export actions
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

// ✅ Export reducer (default)
export default cartSlice.reducer;
