import { configureStore } from "@reduxjs/toolkit";

import days from "./days";
import tasks from "./tasks";

const store = configureStore({
  reducer: {
    days: days.reducer,
    tasks: tasks.reducer,
  },
});

export default store;
