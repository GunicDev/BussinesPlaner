import { createSlice } from "@reduxjs/toolkit";
import { allDays, postDay } from "../helper/fetch";

// Initial state
const initialState = {
  days: [],
  uploadMessage: false,
  isLoading: true,
  setError: false,
};

// Create the slice
const days = createSlice({
  name: "days",
  initialState,
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
      state.days.push(action.payload);
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

export const getAllDays = (url) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await allDays(url);

    dispatch(setDay(data));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Thunk to handle new day creation
export const newDay = (url, data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    // Generate a new unique key from Firebase
    const newKeyRef = await fetch(`${url}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!newKeyRef.ok) {
      throw new Error("Failed to generate key from Firebase");
    }

    const keyData = await newKeyRef.json();
    const key = keyData.name; // 'name' contains the unique key

    // Create the new entry object
    const newEntry = { id: key, name: data };

    // Post the new entry to Firebase
    await postDay(url, key, newEntry);

    // Dispatch success action
    dispatch(addDaySuccess(newEntry));
    dispatch(setUploadMessage(true));
  } catch (error) {
    console.error("Error:", error);
    dispatch(setError(true));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export default days;
