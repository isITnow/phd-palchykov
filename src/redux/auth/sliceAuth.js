import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "./operationsAuth";

const initStateAuth = {
  error: null,
  isLoggedIn: false,
  status: null,
  token: null,
  user: null,
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
      state.status = "pending";
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.status = "fulfilled";
    });
    builder.addCase(loginThunk.rejected, (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = payload;
      state.status = null;
    });
    // LOG OUT USER
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    });
    builder.addCase(logoutThunk.rejected, (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      // state.error = payload;
    });
  },
});

export default authSlice.reducer;
