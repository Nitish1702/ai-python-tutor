
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  messages: { role: string; content: string }[];
  input: string;
  loading: boolean;
  apiKey:string
}

const initialState: ChatState = {
  messages: [],
  input: "",
  loading: false,
  apiKey:""
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ role: string; content: string }>) => {
      state.messages.push(action.payload);
    },
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.input = "";
      state.loading = false;
    },
    setAPIKey: (state, action:PayloadAction<string>) => {
      state.apiKey = action.payload;
    }
  },
});

export const { addMessage, setInput, setLoading, clearChat,setAPIKey } = chatSlice.actions;
export default chatSlice.reducer;
