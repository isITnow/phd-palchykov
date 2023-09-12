import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicationsAPI } from "../../services/publicationsAPI";

import errorSwitchCase from "../../assets/utils/errorSwitchCase";

export const getPublicationsThunk = createAsyncThunk(
  "publications/get",

  async (id, { rejectWithValue }) => {
    try {
      const resp = await publicationsAPI.fetchPublications(id);

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      console.log("GET publications error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const addPublicationThunk = createAsyncThunk(
  "publications/post",

  async ({ period_id, publication }, { rejectWithValue }) => {
    try {
      const resp = await publicationsAPI.postPublication(
        period_id,
        publication
      );

      if (resp.status !== 201) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      console.log("POST publication error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const updatePublicationThunk = createAsyncThunk(
  "publications/update",

  async (
    { period_id, publication_id, publication },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const resp = await publicationsAPI.editPublication(
        period_id,
        publication_id,
        publication
      );

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      dispatch(getPublicationsThunk(period_id));
      return resp.data;
    } catch (error) {
      console.log("EDIT publication error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const removePublicationThunk = createAsyncThunk(
  "publications/delete",

  async ({ period_id, publication_id }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await publicationsAPI.deletePublication(
        period_id,
        publication_id
      );

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return publication_id;
    } catch (error) {
      console.log("DELETE publication error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);
