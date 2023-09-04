import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, refreshUserThunk } from "./operationsAuth";

const initStateAuth = {
  user: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initStateAuth,
  extraReducers: {
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.user = payload.resource_owner;
      state.token = payload.token;
      state.refreshToken = payload.refresh_token;
      state.isLoggedIn = true;
    },
    [logoutThunk.fulfilled]: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
    [refreshUserThunk.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
    [refreshUserThunk.rejected]: (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});
