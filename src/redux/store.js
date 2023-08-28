import { configureStore } from "@reduxjs/toolkit";
import colleaguesReducer from "./colleagues/sliceColleagues";
import newsReducer from "./news/sliceNews";
import publicationPeriodsReducer from "./publicationPeriods/slicePublicationPeriods";

export default configureStore({
  reducer: {
    colleagues: colleaguesReducer,
    news: newsReducer,
    periods: publicationPeriodsReducer,
  },
});
