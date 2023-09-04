import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "services/authAPI";
import { token } from "services/http/http";

// export const registerThunk = createAsyncThunk(
//   "auth/register",
//   async (profile) => {
//     try {
//       const user = await authAPI.registerUser(profile);
//       token.set(user.token);
//       return user;
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// );

export const loginThunk = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const data = await authAPI.loginUser(loginData);
    token.set(data.token);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

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
      return await authAPI.getCurrentUser();
    } catch (error) {
      return rejectWithValue();
    }
  }
);
