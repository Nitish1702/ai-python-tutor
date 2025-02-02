'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
    isDarkMode: boolean;
  chatWithAi: boolean;
}

const initialState: DashboardState = {
    isDarkMode: true,
  chatWithAi: false,
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setChatWithAi(state, action: PayloadAction<boolean>) {
      state.chatWithAi = action.payload;
      },
      setDarkMode(state, action: PayloadAction<boolean>) {
        state.isDarkMode = action.payload;
        }
  },
});

export const { setChatWithAi, setDarkMode } = DashboardSlice.actions;
export default DashboardSlice.reducer;
