import { createAsyncThunk } from "@reduxjs/toolkit";
import { colleaguesAPI } from "../../services/colleaguesAPI";

export const getColleaguesThunk = createAsyncThunk(
  "colleagues/get",

  async (_, { rejectWithValue }) => {
    try {
      const resp = await colleaguesAPI.fetchColleagues();

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      return resp.data;
    } catch (error) {
      console.log("GET colleagues error: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addColleagueThunk = createAsyncThunk(
  "colleagues/post",

  async (colleague, { rejectWithValue }) => {
    try {
      const resp = await colleaguesAPI.postColleague(colleague);

      if (resp.status !== 201) {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      return resp.data;
    } catch (error) {
      console.log("POST colleague error: ", error);
      return rejectWithValue(error.message);
    }
  }
);
