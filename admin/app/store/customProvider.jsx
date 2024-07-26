"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import Cookies from "js-cookie";
import { storeToken } from "./tokenSlice";


function TokenInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(storeToken(token));
      console.log("Token loaded from cookies and stored in Redux");
    } else {
      console.log("No token in cookies");
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
}

export function CustomProvider({ children }) {
  return (
    <Provider store={store}>
      <TokenInitializer />
      {children}
    </Provider>
  );
}
