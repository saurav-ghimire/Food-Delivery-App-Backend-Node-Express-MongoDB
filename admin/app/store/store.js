import { tokenSlice } from "./tokenSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer:{
    'token' : tokenSlice.reducer
  }
})