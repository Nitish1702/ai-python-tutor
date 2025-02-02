import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the initial state
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Store token in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      // Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", "false");
    },
    loadUser: (state) => {
      // Try to get data from localStorage
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = JSON.parse(user);
      } else {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      }
    },
    // Add Sign-Up Action
    signUpUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;

      // Store token in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { login, logout, loadUser, signUpUser, signUpSuccess, signUpFailure } = authSlice.actions;
export default authSlice.reducer;
