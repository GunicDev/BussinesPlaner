import { createSlice } from "@reduxjs/toolkit";
import postDay from "../helper/fetch";

const initialState = {
  days: [],
  uploadMessage: false,
  isLoading: true,
  setError: false,
};

const days = createSlice({
  name: "days",
  initialState: initialState,
  reducers: {
    setDay(state, action) {
      state.days = action.payload;
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
    addDaySuccess(state, action) {
      const newData = action.payload.newData;
      state.days.push(newData);
    },
  },
});

export const {
  setDay,
  setError,
  setIsLoading,
  setUploadMessage,
  addDaySuccess,
} = days.actions;

export const newDay = (url, data) => async (dispatch) => {
  try {
    dispatch(addDaySuccess(data));
    await postDay(url, data);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default days;
