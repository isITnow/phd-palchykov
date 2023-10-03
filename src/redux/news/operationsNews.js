import { createAsyncThunk } from "@reduxjs/toolkit";
import { newsAPI } from "../../services/newsAPI";

import errorSwitchCase from "../../assets/utils/errorSwitchCase";

export const getNewsThunk = createAsyncThunk(
  "news/get",

  async (_, { rejectWithValue }) => {
    try {
      const resp = await newsAPI.fetchNews();

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      console.log("GET news error: ", error);
      return rejectWithValue(errorSwitchCase(error));
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

      return resp.data;
    } catch (error) {
      console.log("POST news error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const updateNewsThunk = createAsyncThunk(
  "news/update",

  async ({ id, news }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await newsAPI.editNews(id, news);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      dispatch(getNewsThunk());
      return resp.data;
    } catch (error) {
      console.log("EDIT news error: ", error);
      return rejectWithValue(errorSwitchCase(error));
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

      return id;
    } catch (error) {
      console.log("DELETE news error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);
