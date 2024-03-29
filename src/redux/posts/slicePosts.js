import { createSlice } from "@reduxjs/toolkit";
import {
  addPostThunk,
  getOnePostThunk,
  getPostsThunk,
  removePostThunk,
  updatePostThunk,
} from "./operationsPosts";
import {
  addCommentThunk,
  removeCommentThunk,
} from "../comments/operationsComments";

import setError from "../../assets/utils/setSliceError";

const initPosts = {
  error: null,
  onePost: null,
  postsList: [],
  status: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initPosts,
  reducers: {},

  extraReducers: (builder) => {
    //* FETCH ALL POSTS
    builder.addCase(getPostsThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.onePost = null;
    });
    builder.addCase(getPostsThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.postsList = payload;
    });
    builder.addCase(getPostsThunk.rejected, setError);

    //* FETCH ONE POST
    builder.addCase(getOnePostThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getOnePostThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.onePost = payload;
    });
    builder.addCase(getOnePostThunk.rejected, setError);

    //* CREATE POST
    builder.addCase(addPostThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addPostThunk.fulfilled, (state, { payload }) => {
      state.status = "created";
      state.postsList.unshift(payload);
    });
    builder.addCase(addPostThunk.rejected, setError);

    //* UPDATE POST
    builder.addCase(updatePostThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updatePostThunk.fulfilled, (state, { payload }) => {
      state.status = "updated";
      state.onePost = payload;
    });
    builder.addCase(updatePostThunk.rejected, setError);

    //* REMOVE POST
    builder.addCase(removePostThunk.pending, (state, { payload }) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removePostThunk.fulfilled, (state, { payload }) => {
      state.status = "deleted";
      state.postsList = state.postsList.filter((post) => post.id !== payload);
    });
    builder.addCase(removePostThunk.rejected, setError);

    ////* COMMENTS ACTIONS /////

    //* CREATE COMMENT
    builder.addCase(addCommentThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addCommentThunk.fulfilled, (state, { payload }) => {
      state.status = "comment added";
      state.onePost.comments.unshift(payload);
    });
    builder.addCase(addCommentThunk.rejected, setError);

    //* REMOVE COMMENT
    builder.addCase(removeCommentThunk.pending, (state, { payload }) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removeCommentThunk.fulfilled, (state, { payload }) => {
      state.status = "comment deleted";
      state.onePost.comments = state.onePost.comments.filter(
        (comment) => comment.id !== payload
      );
    });
    builder.addCase(removeCommentThunk.rejected, setError);
  },
});

export default postsSlice.reducer;
