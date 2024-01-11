import { createSlice } from "@reduxjs/toolkit";
import {
  getNewsThunk,
  addNewsThunk,
  updateNewsThunk,
  removeNewsThunk,
} from "./operationsNews";

const initNews = {
  news: [],
  status: null,
  error: null,
};

const setError = (state, { payload }) => {
  state.status =
    payload === "canceled request" ? "canceled request" : "rejected";
  state.error = payload;
};

const newsSlice = createSlice({
  name: "news",
  initialState: initNews,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH ALL NEWS
    builder.addCase(getNewsThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getNewsThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.news = payload;
    });
    builder.addCase(getNewsThunk.rejected, setError);
    // CREATE NEWS CARD
    builder.addCase(addNewsThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addNewsThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.news.push(payload);
    });
    builder.addCase(addNewsThunk.rejected, setError);
    // UPDATE NEWS CARD
    builder.addCase(updateNewsThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updateNewsThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
    });
    builder.addCase(updateNewsThunk.rejected, setError);
    // REMOVE NEWS CARD
    builder.addCase(removeNewsThunk.pending, (state, { payload }) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removeNewsThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.news = state.news.filter((colleague) => colleague.id !== payload);
    });
    builder.addCase(removeNewsThunk.rejected, setError);
  },
});

export default newsSlice.reducer;
