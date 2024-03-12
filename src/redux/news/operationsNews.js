import { createAsyncThunk } from "@reduxjs/toolkit";
import { newsAPI } from "../../services/newsAPI";

import { fireToastNotification } from "../../assets/utils/fireToastNotification";
import operationsErrorHandler from "../../assets/utils/operationsErrorHandler";

export const getNewsThunk = createAsyncThunk(
  "news/get",

  async (signal, { rejectWithValue }) => {
    try {
      const resp = await newsAPI.fetchNews(signal);

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const addNewsThunk = createAsyncThunk(
  "news/post",

  async (news, { rejectWithValue }) => {
    try {
      const resp = await newsAPI.postNews(news);

      if (resp.status !== 201) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 201, "News created");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const updateNewsThunk = createAsyncThunk(
  "news/update",

  async ({ id, news }, { rejectWithValue }) => {
    try {
      const resp = await newsAPI.editNews(id, news);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 202, "News updated");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const removeNewsThunk = createAsyncThunk(
  "news/delete",

  async (id, { dispatch, rejectWithValue }) => {
    try {
      const resp = await newsAPI.deleteNews(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 204, "News deleted");
      return id;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);
