import { tokenSlice } from "./tokenSlice";

const { configureStore } = require("@reduxjs/toolkit");

import Cookies from 'js-cookie';

const token = Cookies.get('token') || null;

export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
  },
  preloadedState: {
    token: token,
  },
});
