import { createSlice } from "@reduxjs/toolkit";
import {
  getPostsThunk,
  addPostThunk,
  updatePostThunk,
  removePostThunk,
} from "./operationsPosts";

const initPosts = {
  posts: [],
  status: null,
  error: null,
};

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.error = payload;
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initPosts,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH ALL POSTS
    builder.addCase(getPostsThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getPostsThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.posts = payload;
    });
    builder.addCase(getPostsThunk.rejected, setError);
    // CREATE POST
    builder.addCase(addPostThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addPostThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.posts.unshift(payload);
    });
    builder.addCase(addPostThunk.rejected, setError);
    // UPDATE POST
    builder.addCase(updatePostThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updatePostThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      // state.colleagues.forEach((colleague) => {
      //   if (colleague.id === payload.id) {
      //     colleague = payload;
      //   }
      // });
    });
    builder.addCase(updatePostThunk.rejected, setError);
    // REMOVE POST
    builder.addCase(removePostThunk.pending, (state, { payload }) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removePostThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.posts = state.posts.filter((colleague) => colleague.id !== payload);
    });
    builder.addCase(removePostThunk.rejected, setError);
  },
});

export default postsSlice.reducer;
