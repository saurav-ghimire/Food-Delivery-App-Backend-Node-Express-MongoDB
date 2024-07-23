import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    storeToken: (state, action) => {
      return action.payload;
    },
    clearToken: () => {
      return null;
    },
    isToken: (state) => {
      return state; // Return the current state unchanged
    },
  },
});

export const { storeToken, clearToken, isToken } = tokenSlice.actions;
export default tokenSlice.reducer;
