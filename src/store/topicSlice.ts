'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicState {
  selectedTopic: string;
}

const initialState: TopicState = {
  selectedTopic: "",
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setSelectedTopic(state, action: PayloadAction<string>) {
      state.selectedTopic = action.payload;
    },
  },
});

export const { setSelectedTopic } = topicSlice.actions;
export default topicSlice.reducer;
