import { createAsyncThunk } from "@reduxjs/toolkit";
import { colleaguesAPI } from "../../services/colleaguesAPI";

import errorSwitchCase from "../../assets/utils/errorSwitchCase";

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
      // console.log("GET colleagues error: ", error);
      return rejectWithValue(errorSwitchCase(error));
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
      // console.log("POST colleague error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const updateColleagueThunk = createAsyncThunk(
  "colleagues/update",

  async ({ id, colleague }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await colleaguesAPI.editColleague(id, colleague);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      dispatch(getColleaguesThunk());
      return resp.data;
    } catch (error) {
      // console.log("EDIT colleague error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const removeColleagueThunk = createAsyncThunk(
  "colleagues/delete",

  async (id, { dispatch, rejectWithValue }) => {
    try {
      const resp = await colleaguesAPI.deleteColleague(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      return id;
    } catch (error) {
      // console.log("DELETE colleague error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);
