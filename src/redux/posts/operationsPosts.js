import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsAPI } from "../../services/postsAPI";

import errorSwitchCase from "../../assets/utils/errorSwitchCase";

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
      // console.log("GET posts error: ", error);
      return rejectWithValue(errorSwitchCase(error));
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
      // console.log("GET one post error: ", error);
      return rejectWithValue(errorSwitchCase(error));
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

      return resp.data;
    } catch (error) {
      // console.log("POST post error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const updatePostThunk = createAsyncThunk(
  "posts/update",

  async ({ id, post }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await postsAPI.editPost(id, post);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      dispatch(getPostsThunk());
      return resp.data;
    } catch (error) {
      // console.log("EDIT post error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const removePostThunk = createAsyncThunk(
  "posts/delete",

  async (id, { dispatch, rejectWithValue }) => {
    try {
      const resp = await postsAPI.deletePost(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return id;
    } catch (error) {
      // console.log("DELETE post error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);
