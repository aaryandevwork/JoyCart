import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : "light";
  } catch {
    return "light";
  }
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;