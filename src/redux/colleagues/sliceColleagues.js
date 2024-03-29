import { createSlice } from "@reduxjs/toolkit";
import {
  addColleagueThunk,
  getColleaguesThunk,
  removeColleagueThunk,
  updateColleagueThunk,
} from "./operationsColleagues";

import setError from "../../assets/utils/setSliceError";

const initColleagues = {
  colleagues: [],
  error: null,
  status: null,
};

const colleaguesSlice = createSlice({
  name: "colleagues",
  initialState: initColleagues,
  reducers: {},

  extraReducers: (builder) => {
    //* FETCH ALL COLLEAGUES
    builder.addCase(getColleaguesThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getColleaguesThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.colleagues = payload;
    });
    builder.addCase(getColleaguesThunk.rejected, setError);

    //* CREATE COLLEAGUE CARD
    builder.addCase(addColleagueThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addColleagueThunk.fulfilled, (state, { payload }) => {
      state.status = "created";
      state.colleagues.push(payload);
    });
    builder.addCase(addColleagueThunk.rejected, setError);

    //* UPDATE COLLEAGUE CARD
    builder.addCase(updateColleagueThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updateColleagueThunk.fulfilled, (state, { payload }) => {
      state.status = "updated";
      // state.colleagues.forEach((colleague) => {
      //   if (colleague.id === payload.id) {
      //     colleague = payload;
      //   }
      // });
    });
    builder.addCase(updateColleagueThunk.rejected, setError);

    //* REMOVE COLLEAGUE CARD
    builder.addCase(removeColleagueThunk.pending, (state, { payload }) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removeColleagueThunk.fulfilled, (state, { payload }) => {
      state.status = "deleted";
      state.colleagues = state.colleagues.filter(
        (colleague) => colleague.id !== payload
      );
    });
    builder.addCase(removeColleagueThunk.rejected, setError);
  },
});

export default colleaguesSlice.reducer;
