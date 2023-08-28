import { configureStore } from "@reduxjs/toolkit";
import colleaguesReducer from "./colleagues/sliceColleagues";
import newsReducer from "./news/sliceNews";

export default configureStore({
  reducer: {
    colleagues: colleaguesReducer,
    news: newsReducer,
  },
});
