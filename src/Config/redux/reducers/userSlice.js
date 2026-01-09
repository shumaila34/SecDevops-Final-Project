import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // ✅ Pure user ka data store karne ke liye
    accessToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;  // ✅ Pure user object store karo
      state.accessToken = action.payload.accessToken;
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
