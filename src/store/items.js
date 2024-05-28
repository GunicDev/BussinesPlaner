import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  uploadMessage: false,
  isLoading: true,
  setError: false,
};

const items = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {
    setItem(state, action) {
      state.items = action.payload;
    },
    setError(state, action) {
      state.setError = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUploadMessage(state, action) {
      state.uploadMessage = action.payload;
    },
  },
});

export const { setItem, setError, setIsLoading, setUploadMessage } =
  items.actions;

export default items;
