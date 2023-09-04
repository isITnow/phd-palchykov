import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, refreshUserThunk } from "./operationsAuth";

const initStateAuth = {
  user: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initStateAuth,
  reducers: {},
  extraReducers: (builder) => {
    // SIGN IN USER
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.user = payload.resource_owner;
      state.token = payload.token;
      state.refreshToken = payload.refresh_token;
      state.isLoggedIn = true;
    });
    // LOG OUT USER
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    });
    // REFRESH USER
    builder.addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    });
    builder.addCase(refreshUserThunk.rejected, (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });
  },
});

export default authSlice.reducer;
