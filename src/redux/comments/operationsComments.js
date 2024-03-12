import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentsAPI } from "../../services/commentsAPI";

import { fireToastNotification } from "../../assets/utils/fireToastNotification";
import operationsErrorHandler from "../../assets/utils/operationsErrorHandler";

export const addCommentThunk = createAsyncThunk(
  "comments/post",

  async ({ post_id, comment }, { rejectWithValue }) => {
    try {
      const resp = await commentsAPI.postComment(post_id, comment);

      if (resp.status !== 201) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 201, "Comment published");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
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

      fireToastNotification.success(resp, 204, "Comment deleted");
      return comment_id;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);
