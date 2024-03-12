import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicationsAPI } from "../../services/publicationsAPI";

import { fireToastNotification } from "../../assets/utils/fireToastNotification";
import operationsErrorHandler from "../../assets/utils/operationsErrorHandler";

export const getPublicationsThunk = createAsyncThunk(
  "publications/get",

  async ({ id, signal }, { rejectWithValue }) => {
    try {
      const resp = await publicationsAPI.fetchPublications({ id, signal });

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
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

      fireToastNotification.success(resp, 201, "Publication created");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const updatePublicationThunk = createAsyncThunk(
  "publications/update",

  async ({ period_id, publication_id, publication }, { rejectWithValue }) => {
    try {
      const resp = await publicationsAPI.editPublication(
        period_id,
        publication_id,
        publication
      );

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 202, "Publication updated");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const removePublicationThunk = createAsyncThunk(
  "publications/delete",

  async ({ period_id, publication_id }, { rejectWithValue }) => {
    try {
      const resp = await publicationsAPI.deletePublication(
        period_id,
        publication_id
      );

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 204, "Publication deleted");
      return publication_id;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);
