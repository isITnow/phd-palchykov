import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/authAPI";
import { tokenOperations } from "../../services/http";

import errorSwitchCase from "../../assets/utils/errorSwitchCase";
import checkTokenStatus from "../../assets/utils/checkTokenStatus";

export const loginThunk = createAsyncThunk(
  "auth/login",

  async (loginData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.loginUser(loginData);
      const token = resp.headers.authorization.split(" ")[1];
      const user = resp.data.data;

      tokenOperations.set(token);
      return { token, user };
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
      tokenOperations.unset();
    } catch (error) {
      console.log("Logout Error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.user.token;
    const isExpired = checkTokenStatus(persistedToken);

    try {
      if (persistedToken === null) {
        return;
      }
      tokenOperations.set(persistedToken);

      if (isExpired) {
        dispatch(logoutThunk());
        return;
      }
      return;
    } catch (error) {
      console.log("Refresh User Error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);
