import { createSlice } from "@reduxjs/toolkit";
import { allDays, postDay } from "../helper/fetch";

const initialState = {
  days: [],
  filteredDay: null,
  uploadMessage: false,
  isLoading: true,
  setError: false,
};

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
    setFilteredDay(state, action) {
      state.filteredDay = state.days.find((day) => day.id === action.payload);
    },
  },
});

export const {
  setDay,
  setError,
  setIsLoading,
  setUploadMessage,
  addDaySuccess,
  setFilteredDay,
} = days.actions;

export const getAllDays = (url) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await allDays(url);
    dispatch(setDay(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
    dispatch(setIsLoading(false));
  }
};

export const newDay = (url, data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

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
    const key = keyData.name;

    const newEntry = { id: key, name: data, items: [] };

    await postDay(url, key, newEntry);

    dispatch(addDaySuccess(newEntry));
    dispatch(setUploadMessage(true));
  } catch (error) {
    console.error("Error:", error);
    dispatch(setError(true));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const filteredDay = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    dispatch(setFilteredDay(id));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error("Error:", error);
    dispatch(setError(true));
  }
};

export default days;
