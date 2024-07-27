'use client'
import { Provider } from "react-redux";
import { store } from "./store";
import 'react-toastify/dist/ReactToastify.css';
export function CustomProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
