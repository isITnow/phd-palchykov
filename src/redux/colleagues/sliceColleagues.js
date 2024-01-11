import { createSlice } from "@reduxjs/toolkit";
import {
  getColleaguesThunk,
  addColleagueThunk,
  updateColleagueThunk,
  removeColleagueThunk,
} from "./operationsColleagues";

const initColleagues = {
  colleagues: [],
  status: null,
  error: null,
};

const setError = (state, { payload }) => {
  state.status =
    payload === "canceled request" ? "canceled request" : "rejected";
  state.error = payload;
};

const colleaguesSlice = createSlice({
  name: "colleagues",
  initialState: initColleagues,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH ALL COLLEAGUES
    builder.addCase(getColleaguesThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getColleaguesThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.colleagues = payload;
    });
    builder.addCase(getColleaguesThunk.rejected, setError);
    // CREATE COLLEAGUE CARD
    builder.addCase(addColleagueThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addColleagueThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.colleagues.push(payload);
    });
    builder.addCase(addColleagueThunk.rejected, setError);
    // UPDATE COLLEAGUE CARD
    builder.addCase(updateColleagueThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updateColleagueThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      // state.colleagues.forEach((colleague) => {
      //   if (colleague.id === payload.id) {
      //     colleague = payload;
      //   }
      // });
    });
    builder.addCase(updateColleagueThunk.rejected, setError);
    // REMOVE COLLEAGUE CARD
    builder.addCase(removeColleagueThunk.pending, (state, { payload }) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removeColleagueThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.colleagues = state.colleagues.filter(
        (colleague) => colleague.id !== payload
      );
    });
    builder.addCase(removeColleagueThunk.rejected, setError);
  },
});

export default colleaguesSlice.reducer;
