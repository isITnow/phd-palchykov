import { createSlice } from "@reduxjs/toolkit";
import {
  getPublicationsThunk,
  addPublicationThunk,
  updatePublicationThunk,
  removePublicationThunk,
} from "./operationsPublications";

const initPublication = {
  publications: [],
  status: null,
  error: null,
};

const setError = (state, { payload }) => {
  state.status =
    payload === "canceled request" ? "canceled request" : "rejected";
  state.error = payload;
};

const publicationsSlice = createSlice({
  name: "publications",
  initialState: initPublication,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH ALL PUBLICATIONS
    builder.addCase(getPublicationsThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getPublicationsThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.publications = payload;
    });
    builder.addCase(getPublicationsThunk.rejected, setError);
    // CREATE PUBLICATION
    builder.addCase(addPublicationThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addPublicationThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.publications.push(payload);
    });
    builder.addCase(addPublicationThunk.rejected, setError);
    // UPDATE PUBLICATION
    builder.addCase(updatePublicationThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updatePublicationThunk.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(updatePublicationThunk.rejected, setError);
    // REMOVE PUBLICATION
    builder.addCase(removePublicationThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removePublicationThunk.fulfilled, (state, { payload }) => {
      state.status = "removed";
      state.publications = state.publications.filter(
        (publication) => publication.id !== payload
      );
    });
    builder.addCase(removePublicationThunk.rejected, setError);
  },
});

export default publicationsSlice.reducer;
