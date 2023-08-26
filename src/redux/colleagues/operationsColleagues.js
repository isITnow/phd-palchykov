import { createAsyncThunk } from "@reduxjs/toolkit";
import { colleaguesAPI } from "../../services/colleaguesAPI";

export const getColleaguesThunk = createAsyncThunk(
  "colleagues/get",

  async (_, { rejectWithValue }) => {
    try {
      const resp = await colleaguesAPI.fetchColleagues();
      if (resp.status !== 200) {
        throw new Error("Server Error");
      }
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
