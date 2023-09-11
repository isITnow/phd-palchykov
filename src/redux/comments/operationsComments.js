import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentsAPI } from "../../services/commentsAPI";

export const addCommentThunk = createAsyncThunk(
  "comments/post",

  async ({ post_id, comment }, { rejectWithValue }) => {
    try {
      const resp = await commentsAPI.postComment(post_id, comment);

      if (resp.status !== 201) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      console.log("POST comment error: ", error);

      if (error.response.status === 401) {
        return rejectWithValue(
          error.response.data.error_description.join(", ")
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

export const removeCommentThunk = createAsyncThunk(
  "comments/delete",

  async ({ post_id, comment_id }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await commentsAPI.deleteComment(post_id, comment_id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return comment_id;
    } catch (error) {
      console.log("DELETE post error: ", error);

      if (error.response.status === 401) {
        return rejectWithValue(
          error.response.data.error_description.join(", ")
        );
      }
      return rejectWithValue(error.message);
    }
  }
);
