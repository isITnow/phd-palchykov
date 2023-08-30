import { createSlice } from "@reduxjs/toolkit";
import {
  getResearchesThunk,
  addResearchThunk,
  removeResearchThunk,
} from "./operationsResearches";

const initResearch = {
  researches: [],
  status: null,
  error: null,
};

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.error = payload;
};

const researchesSlice = createSlice({
  name: "researches",
  initialState: initResearch,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH ALL RESEARCHES
    builder.addCase(getResearchesThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getResearchesThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.researches = payload;
    });
    builder.addCase(getResearchesThunk.rejected, setError);
    // CREATE RESEARCH
    builder.addCase(addResearchThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addResearchThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      // state.researches.unshift(payload);
    });
    builder.addCase(addResearchThunk.rejected, setError);
    // REMOVE RESEARCH
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
  },
});

export default researchesSlice.reducer;
