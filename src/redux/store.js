import { configureStore } from "@reduxjs/toolkit";
import colleaguesReducer from "./colleagues/sliceColleagues";

export default configureStore({
  reducer: {
    colleagues: colleaguesReducer,
  },
});
