import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsAPI } from "../../services/postsAPI";

import { fireToastNotification } from "../../assets/utils/fireToastNotification";
import operationsErrorHandler from "../../assets/utils/operationsErrorHandler";

export const getPostsThunk = createAsyncThunk(
  "posts/get",

  async (signal, { rejectWithValue }) => {
    try {
      const resp = await postsAPI.fetchPosts(signal);

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const getOnePostThunk = createAsyncThunk(
  "posts/getOne",

  async (id, { rejectWithValue }) => {
    try {
      const resp = await postsAPI.fetchOnePost(id);

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const addPostThunk = createAsyncThunk(
  "posts/post",

  async (post, { rejectWithValue }) => {
    try {
      const resp = await postsAPI.postPost(post);

      if (resp.status !== 201) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 201, "Post created");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const updatePostThunk = createAsyncThunk(
  "posts/update",

  async ({ id, post }, { rejectWithValue }) => {
    try {
      const resp = await postsAPI.editPost(id, post);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 202, "Post updated");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const removePostThunk = createAsyncThunk(
  "posts/delete",

  async (id, { rejectWithValue }) => {
    try {
      const resp = await postsAPI.deletePost(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 204, "Post deleted");
      return id;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);
