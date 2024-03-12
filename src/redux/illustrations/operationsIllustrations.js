import { createAsyncThunk } from "@reduxjs/toolkit";
import { illustrationsAPI } from "../../services/illustrationsAPI";

import { fireToastNotification } from "../../assets/utils/fireToastNotification";
import operationsErrorHandler from "../../assets/utils/operationsErrorHandler";

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
      return operationsErrorHandler(rejectWithValue, error);
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

      fireToastNotification.success(resp, 202, "Illustration updated");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
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
