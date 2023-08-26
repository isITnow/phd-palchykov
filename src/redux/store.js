import { configureStore } from "@reduxjs/toolkit";
import colleaguesReducer from "./colleagues/colleaguesSlice";

export default configureStore({
  reducer: {
    colleagues: colleaguesReducer,
  },
});
