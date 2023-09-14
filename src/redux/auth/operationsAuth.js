import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/authAPI";
import { token } from "../../services/http";

import errorSwitchCase from "../../assets/utils/errorSwitchCase";

export const loginThunk = createAsyncThunk(
  "auth/login",

  async (loginData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.loginUser(loginData);

      token.set(resp.token);
      return resp;
    } catch (error) {
      console.log("Sign In error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logoutUser();
      token.unset();
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

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
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);
