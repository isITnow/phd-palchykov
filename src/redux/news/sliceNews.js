import { createSlice } from "@reduxjs/toolkit";
import {
  addNewsThunk,
  getNewsThunk,
  removeNewsThunk,
  updateNewsThunk,
} from "./operationsNews";

import setError from "../../assets/utils/setSliceError";

const initNews = {
  error: null,
  news: [],
  status: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState: initNews,
  reducers: {},

  extraReducers: (builder) => {
    //* FETCH ALL NEWS
    builder.addCase(getNewsThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getNewsThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.news = payload;
    });
    builder.addCase(getNewsThunk.rejected, setError);

    //* CREATE NEWS CARD
    builder.addCase(addNewsThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addNewsThunk.fulfilled, (state, { payload }) => {
      state.status = "created";
      state.news.push(payload);
    });
    builder.addCase(addNewsThunk.rejected, setError);

    //* UPDATE NEWS CARD
    builder.addCase(updateNewsThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updateNewsThunk.fulfilled, (state, { payload }) => {
      state.status = "updated";
    });
    builder.addCase(updateNewsThunk.rejected, setError);

    //* REMOVE NEWS CARD
    builder.addCase(removeNewsThunk.pending, (state, { payload }) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removeNewsThunk.fulfilled, (state, { payload }) => {
      state.status = "deleted";
      state.news = state.news.filter((colleague) => colleague.id !== payload);
    });
    builder.addCase(removeNewsThunk.rejected, setError);
  },
});

export default newsSlice.reducer;
