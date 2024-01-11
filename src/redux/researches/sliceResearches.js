import { createSlice } from "@reduxjs/toolkit";
import {
  getResearchesThunk,
  addResearchThunk,
  updateResearchThunk,
  removeResearchThunk,
} from "./operationsResearches";

import {
  updateIllustrationThunk,
  removeIllustrationThunk,
} from "../illustrations/operationsIllustrations";

const initResearch = {
  researches: [],
  status: null,
  error: null,
};

const setError = (state, { payload }) => {
  state.status =
    payload === "canceled request" ? "canceled request" : "rejected";
  state.error = payload;
};

const researchesSlice = createSlice({
  name: "researches",
  initialState: initResearch,
  reducers: {},

  extraReducers: (builder) => {
    //* FETCH ALL RESEARCHES
    builder.addCase(getResearchesThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getResearchesThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.researches = payload;
    });
    builder.addCase(getResearchesThunk.rejected, setError);

    //* CREATE RESEARCH
    builder.addCase(addResearchThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addResearchThunk.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(addResearchThunk.rejected, setError);

    //* UPDATE RESEARCH
    builder.addCase(updateResearchThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updateResearchThunk.fulfilled, (state) => {
      state.status = "updated";
    });
    builder.addCase(updateResearchThunk.rejected, setError);

    //* REMOVE RESEARCH
    builder.addCase(removeResearchThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removeResearchThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.researches = state.researches.filter(
        (research) => research.id !== payload
      );
    });
    builder.addCase(removeResearchThunk.rejected, setError);

    ////* ILLUSTRATIONS ACTIONS ////

    //* UPDATE ILLUSTRATION
    builder.addCase(updateIllustrationThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updateIllustrationThunk.fulfilled, (state) => {
      state.status = "updated";
      state.error = null;
    });
    builder.addCase(updateIllustrationThunk.rejected, setError);

    //* REMOVE ILLUSTRATION doesn't implemented in the app
    builder.addCase(removeIllustrationThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removeIllustrationThunk.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(removeIllustrationThunk.rejected, setError);
  },
});

export default researchesSlice.reducer;
