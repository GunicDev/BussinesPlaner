import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: [],
  uploadMessage: false,
  isLoading: true,
  setError: false,
};

const data = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
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

export const { setData, setError, setIsLoading, setUploadMessage } =
  data.actions;

export default data;
