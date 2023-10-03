import { createSlice } from "@reduxjs/toolkit";
import { getPeriodsThunk } from "./operationsPublicationPeriods";

const initPeriods = {
  periods: [],
  status: null,
  error: null,
};

const publicationPeriodsSlice = createSlice({
  name: "periods",
  initialState: initPeriods,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH PUBLICATION PERIODS
    builder.addCase(getPeriodsThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getPeriodsThunk.fulfilled, (state, { payload }) => {
      state.status = "fulfilled";
      state.periods = payload;
    });
    builder.addCase(getPeriodsThunk.rejected, (state, { payload }) => {
      state.status = "rejected";
      state.error = payload;
    });
  },
});

export default publicationPeriodsSlice.reducer;
