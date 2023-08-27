import { createSlice } from "@reduxjs/toolkit";
import { getColleaguesThunk, addColleagueThunk } from "./operationsColleagues";

const initColleagues = {
  colleagues: [],
  status: null,
  error: null,
};

const colleaguesSlice = createSlice({
  name: "colleagues",
  initialState: initColleagues,
  reducers: {},

  extraReducers: (builder) => {
    // fetch all colleagues
    builder.addCase(getColleaguesThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(getColleaguesThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.colleagues = payload;
    });
    builder.addCase(getColleaguesThunk.rejected, (state, { payload }) => {
      state.status = "rejected";
      state.error = payload;
    });
    // create colleague card
    builder.addCase(addColleagueThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addColleagueThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.colleagues.push(payload);
    });
    builder.addCase(addColleagueThunk.rejected, (state, { payload }) => {
      state.status = "rejected";
      state.error = payload;
    });
  },
});

// export const { addColleague, removeColleague, updateColleague } =
//   colleaguesSlice.actions;

export default colleaguesSlice.reducer;
