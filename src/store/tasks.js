import { createSlice } from "@reduxjs/toolkit";
import { postTask } from "../helper/fetch";

const initialState = {
  tasks: [],
  uploadMessage: false,
  isLoading: true,
  setError: false,
};

const tasks = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setItem(state, action) {
      state.tasks = action.payload;
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
    addTaskSuccess(state, action) {
      state.tasks.push(action.payload);
    },
  },
});

export const {
  setItem,
  setError,
  setIsLoading,
  setUploadMessage,
  addTaskSuccess,
} = tasks.actions;

export const addNewTask = (url, key, newTask) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    await postTask(url, key, newTask);

    await postTask(url);
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export default tasks;
