'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  showQuiz: boolean;
  quizData: Record<string, string>;
}

const initialState: QuizState = {
  showQuiz: false,
  quizData: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    toggleQuiz(state) {
      state.showQuiz = !state.showQuiz;
    },
    setQuiz(state, action: PayloadAction<Record<string, string>>) {
      state.quizData = action.payload;
    },
  },
});

export const { toggleQuiz, setQuiz } = quizSlice.actions;
export default quizSlice.reducer;
