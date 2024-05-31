import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  uploadMessage: false,
  isLoading: true,
  setError: false,
  key: null,
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
      const { dayId, task } = action.payload;
      const existingDay = state.tasks.find((day) => day.id === dayId);

      if (existingDay) {
        existingDay.tasks.push(task);
      } else {
        state.tasks.push({ id: dayId, tasks: [task] });
      }
    },
    setKey(state, action) {
      state.key = action.payload;
    },
  },
});

export const {
  setItem,
  setError,
  setIsLoading,
  setUploadMessage,
  addTaskSuccess,
  setKey,
} = tasks.actions;

export const addNewTask = (url, dayId, newTask) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const newKeyRef = await fetch(`${url}/${dayId}/tasks.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTask, done: false }),
    });

    if (!newKeyRef.ok) {
      throw new Error("Failed to generate key from Firebase");
    }

    const keyData = await newKeyRef.json();
    const key = keyData.name;

    const task = { id: key, task: newTask, done: false };

    // Update the task with the generated key
    await fetch(`${url}/${dayId}/tasks/${key}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: key }),
    });

    dispatch(addTaskSuccess({ dayId, task }));
    dispatch(setUploadMessage("Task added successfully"));
    dispatch(setKey(key));
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export default tasks;
