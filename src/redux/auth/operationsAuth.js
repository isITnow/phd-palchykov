import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/authAPI";
import { token } from "../../services/http";

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
    const resp = await authAPI.loginUser(loginData);

    // TODO: implement error handling

    // if (resp.status !== 200) {
    //   throw new Error(resp.message);
    // }

    token.set(resp.token);
    return resp;
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
