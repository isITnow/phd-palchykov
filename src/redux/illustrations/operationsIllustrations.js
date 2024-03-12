import { createAsyncThunk } from "@reduxjs/toolkit";
import { illustrationsAPI } from "../../services/illustrationsAPI";

import getErrorMessage from "../../assets/utils/getErrorMessage";

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
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateIllustrationThunk = createAsyncThunk(
  "illustrations/update",

  async (
    { research_id, illustration_id, illustration },
    { rejectWithValue }
  ) => {
    try {
      const resp = await illustrationsAPI.editIllustration(
        research_id,
        illustration_id,
        illustration
      );

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      console.log("UPDATE illustration error: ", error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

//* Remove thunk isn't implemented in the server app

export const removeIllustrationThunk = createAsyncThunk(
  "illustrations/delete",

  async ({ research_id, illustration_id }, { rejectWithValue }) => {
    try {
      const resp = await illustrationsAPI.deleteIllustration(
        research_id,
        illustration_id
      );

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return illustration_id;
    } catch (error) {}
  }
);
