import { createSlice } from "@reduxjs/toolkit";
import {
  addPublicationThunk,
  getPublicationsThunk,
  removePublicationThunk,
  updatePublicationThunk,
} from "./operationsPublications";

import setError from "../../assets/utils/setSliceError";

const initPublication = {
  error: null,
  publications: [],
  status: null,
};

const publicationsSlice = createSlice({
  name: "publications",
  initialState: initPublication,
  reducers: {},

  extraReducers: (builder) => {
    //* FETCH ALL PUBLICATIONS
    builder.addCase(getPublicationsThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getPublicationsThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.publications = payload;
    });
    builder.addCase(getPublicationsThunk.rejected, setError);

    //* CREATE PUBLICATION
    builder.addCase(addPublicationThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addPublicationThunk.fulfilled, (state, { payload }) => {
      state.status = "created";
      state.publications.push(payload);
    });
    builder.addCase(addPublicationThunk.rejected, setError);

    //* UPDATE PUBLICATION
    builder.addCase(updatePublicationThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updatePublicationThunk.fulfilled, (state) => {
      state.status = "updated";
    });
    builder.addCase(updatePublicationThunk.rejected, setError);

    //* REMOVE PUBLICATION
    builder.addCase(removePublicationThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removePublicationThunk.fulfilled, (state, { payload }) => {
      state.status = "deleted";
      state.publications = state.publications.filter(
        (publication) => publication.id !== payload
      );
    });
    builder.addCase(removePublicationThunk.rejected, setError);
  },
});

export default publicationsSlice.reducer;
