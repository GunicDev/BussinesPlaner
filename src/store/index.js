import { configureStore } from "@reduxjs/toolkit";

import days from "./days";
import items from "./items";

const store = configureStore({
  reducer: {
    days: days.reducer,
    items: items.reducer,
  },
});

export default store;
