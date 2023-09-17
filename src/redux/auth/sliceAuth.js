import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "./operationsAuth";

const initStateAuth = {
  user: null,
  token: null,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initStateAuth,
  reducers: {},
  extraReducers: (builder) => {
    // SIGN IN USER
    builder.addCase(loginThunk.pending, (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    });
    builder.addCase(loginThunk.rejected, (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = payload;
    });
    // LOG OUT USER
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    });
  },
});

export default authSlice.reducer;
