import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import colleaguesReducer from "./colleagues/sliceColleagues";
import galleryReducer from "./gallery/sliceGallery";
import newsReducer from "./news/sliceNews";
import postsReducer from "./posts/slicePosts";
import publicationsReducer from "./publications/slicePublications";
import publicationPeriodsReducer from "./publicationPeriods/slicePublicationPeriods";
import researchesReducer from "./researches/sliceResearches";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["periods", "user"],
};

const rootReducer = combineReducers({
  colleagues: colleaguesReducer,
  gallery: galleryReducer,
  news: newsReducer,
  periods: publicationPeriodsReducer,
  posts: postsReducer,
  publications: publicationsReducer,
  researches: researchesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);
