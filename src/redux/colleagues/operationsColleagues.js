import { createAsyncThunk } from "@reduxjs/toolkit";
import { colleaguesAPI } from "../../services/colleaguesAPI";

import { fireToastNotification } from "../../assets/utils/fireToastNotification";
import operationsErrorHandler from "../../assets/utils/operationsErrorHandler";

export const getColleaguesThunk = createAsyncThunk(
  "colleagues/get",

  async (signal, { rejectWithValue }) => {
    try {
      const resp = await colleaguesAPI.fetchColleagues(signal);

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
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
      fireToastNotification.success(resp, 201, "Card created");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const updateColleagueThunk = createAsyncThunk(
  "colleagues/update",

  async ({ id, colleague }, { rejectWithValue }) => {
    try {
      const resp = await colleaguesAPI.editColleague(id, colleague);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 202, "Card updated");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const removeColleagueThunk = createAsyncThunk(
  "colleagues/delete",

  async (id, { rejectWithValue }) => {
    try {
      const resp = await colleaguesAPI.deleteColleague(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 204, "Card deleted");
      return id;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);
