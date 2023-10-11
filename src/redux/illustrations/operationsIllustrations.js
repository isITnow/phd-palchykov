import { createAsyncThunk } from "@reduxjs/toolkit";
import { illustrationsAPI } from "../../services/illustrationsAPI";
import { getResearchesThunk } from "../researches/operationsResearches";

import errorSwitchCase from "../../assets/utils/errorSwitchCase";

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
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const updateIllustrationThunk = createAsyncThunk(
  "illustrations/update",

  async (
    { research_id, illustration_id, illustration },
    { dispatch, rejectWithValue }
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

      dispatch(getResearchesThunk());
      return resp.data;
    } catch (error) {
      console.log("UPDATE illustration error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

//* Remove thunk doesn't implemented in the app

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
