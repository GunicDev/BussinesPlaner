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
      const existingIndex = state.data.findIndex(
        (item) => item.id === newData.id
      );
      if (existingIndex !== -1) {
        console.log(
          "Data with the same ID already exists. Updating existing data..."
        );
        state.data[existingIndex] = newData;
      } else {
        state.data.push(newData);
      }
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
  const newData = { ...data };

  try {
    dispatch(addDaySuccess({ ...newData }));
    await postDay(url, newData);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default days;
