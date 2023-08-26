import { createSlice } from "@reduxjs/toolkit";

const colleaguesSlice = createSlice({
  name: "colleagues",
  initialState: {
    colleagues: [],
  },
  reducers: {
    addColleague(state, action) {
      state.colleagues.push(action.colleague);
    },
    removeColleague(state, action) {},
    updateColleague(state, action) {},
  },
});

export const { addColleague, removeColleague, updateColleague } =
  colleaguesSlice.actions;

export default colleaguesSlice.reducer;
