import { configureStore } from "@reduxjs/toolkit";
import colleaguesReducer from "./colleagues/sliceColleagues";
import newsReducer from "./news/sliceNews";
import publicationsReducer from "./publications/slicePublications";
import publicationPeriodsReducer from "./publicationPeriods/slicePublicationPeriods";
import researchesReducer from "./researches/sliceResearches";

export default configureStore({
  reducer: {
    colleagues: colleaguesReducer,
    news: newsReducer,
    periods: publicationPeriodsReducer,
    publications: publicationsReducer,
    researches: researchesReducer,
  },
});
