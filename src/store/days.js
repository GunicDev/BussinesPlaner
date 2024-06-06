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
      // Ensure each day has a tasks array
      state.days = action.payload.map((day) => ({
        ...day,
        tasks: Object.values(day.tasks),
      }));
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
    addTaskToDay(state, action) {
      const { dayId, task } = action.payload;
      return {
        ...state,
        days: state.days.map((day) =>
          day.id === dayId ? { ...day, tasks: [...day.tasks, task] } : day
        ),
      };
    },
    updateDay(state, action) {
      const { id, done } = action.payload;

      return {
        ...state,
        tasks: state.filteredDay.tasks.map((task) =>
          task.id === id ? { ...task, done: done } : task
        ),
      };
    },
    deleteDayFromState(state, action) {
      const dayId = action.payload;

      state.days = state.days.filter((day) => day.id !== dayId);
    },
    updateFilteredDayTask(state, action) {
      const { taskId, done } = action.payload;
      const task = state.filteredDay.tasks.find((task) => task.id === taskId);
      if (task) {
        task.done = done;
      }
    },
    updateTasks(state, action) {
      const { id } = action.payload;
      state.filteredDay.tasks = state.filteredDay.tasks.filter(
        (task) => task.id !== id
      );

      const day = state.days.find((day) => day.id === state.filteredDay.id);
      if (day) {
        day.tasks = day.tasks.filter((task) => task.id !== id);
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
  setFilteredDay,
  addTaskToDay,
  updateDay,
  deleteDayFromState,
  updateFilteredDayTask,
  updateTasks,
} = days.actions;

export const getAllDays = (url) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await allDays(url);

    if (data === null || data === undefined) {
      dispatch(setIsLoading(false));
      return;
    }

    data.forEach((day) => {
      day.tasks = day.tasks ? Object.values(day.tasks) : [];
    });
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

    const newEntry = { id: key, name: data, tasks: "" };

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

export const deleteDay = (id, url) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    console.log(id, "id inside deleteDay");
    await fetch(`${url}/${id}.json`, { method: "DELETE" });
    dispatch(deleteDayFromState(id));

    dispatch(setIsLoading(false));
  } catch (error) {
    console.rerror("Error", error);
    dispatch(setError(true));
  }
};

export default days;
