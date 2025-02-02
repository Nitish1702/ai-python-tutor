'use client'
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import topicReducer from "./topicSlice";
import ChatState from "./chatSlice";
import authReducer from "./AuthSlice";
import dashboardReducer from "./DashboardSlice"
export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    topic: topicReducer,
    chat: ChatState,
    auth: authReducer,
    dashboard: dashboardReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
