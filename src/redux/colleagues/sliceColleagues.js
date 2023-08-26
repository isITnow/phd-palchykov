import { createSlice } from "@reduxjs/toolkit";
import { getColleaguesThunk } from "./operationsColleagues";

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
    builder.addCase(getColleaguesThunk.pending, (state) => {
      state.status = "loading";
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
  },
});

export const { addColleague, removeColleague, updateColleague } =
  colleaguesSlice.actions;

export default colleaguesSlice.reducer;
