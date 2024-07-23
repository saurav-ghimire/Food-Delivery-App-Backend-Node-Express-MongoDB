"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export function CustomProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
