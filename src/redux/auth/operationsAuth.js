import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/authAPI";
import { token } from "../../services/http";

export const loginThunk = createAsyncThunk(
  "auth/login",

  async (loginData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.loginUser(loginData);

      token.set(resp.token);
      return resp;
    } catch (error) {
      console.log("Sign In error: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await authAPI.logoutUser();
    token.unset();
  } catch (error) {
    console.log(error.message);
  }
});

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.user.token;
    try {
      if (persistedToken === null) {
        return;
      }
      token.set(persistedToken);
    } catch (error) {
      return rejectWithValue();
    }
  }
);
