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
import newsReducer from "./news/sliceNews";
import publicationsReducer from "./publications/slicePublications";
import publicationPeriodsReducer from "./publicationPeriods/slicePublicationPeriods";
import researchesReducer from "./researches/sliceResearches";
import authReducer from "./auth/sliceAuth";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  colleagues: colleaguesReducer,
  news: newsReducer,
  periods: publicationPeriodsReducer,
  publications: publicationsReducer,
  researches: researchesReducer,
  user: authReducer,
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

export const persistor = persistStore(store);
