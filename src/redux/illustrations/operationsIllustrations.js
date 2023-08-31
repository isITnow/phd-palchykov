import { createAsyncThunk } from "@reduxjs/toolkit";
import { illustrationsAPI } from "../../services/illustrationsAPI";

export const addIllustrationThunk = createAsyncThunk(
  "illustrations/post",

  async ({ research_id, illustration }, { rejectWithValue }) => {
    try {
      const resp = await illustrationsAPI.postIllustration(
        research_id,
        illustration
      );

      if (resp.status !== 201) {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      // return resp.data;
    } catch (error) {
      console.log("POST illustration error: ", error);
      return rejectWithValue(error.message);
    }
  }
);
