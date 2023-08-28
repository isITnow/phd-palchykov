import { createAsyncThunk } from "@reduxjs/toolkit";
import { periodsAPI } from "../../services/publicationPeriodsAPI";

export const getPeriodsThunk = createAsyncThunk(
  "periods/get",

  async (_, { rejectWithValue }) => {
    try {
      const resp = await periodsAPI.fetchPeriods();

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      return resp.data;
    } catch (error) {
      console.log("GET periods error: ", error);
      return rejectWithValue(error.message);
    }
  }
);

// export const addPeriodsThunk = createAsyncThunk(
//   "periods/post",

//   async (news, { rejectWithValue }) => {
//     try {
//       const resp = await periodsAPI.postNews(news);

//       if (resp.status !== 201) {
//         throw new Error("Error occurred! Please contact your administrator.");
//       }
//       return resp.data;
//     } catch (error) {
//       console.log("POST news error: ", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updatePeriodsThunk = createAsyncThunk(
//   "periods/update",

//   async ({ id, news }, { dispatch, rejectWithValue }) => {
//     try {
//       const resp = await periodsAPI.editNews(id, news);

//       if (resp.status !== 202) {
//         throw new Error("Error occurred! Please contact your administrator.");
//       }
//       dispatch(getPeriodsThunk());
//       return resp.data;
//     } catch (error) {
//       console.log("EDIT news error: ", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const removePeriodsThunk = createAsyncThunk(
//   "periods/delete",

//   async (id, { dispatch, rejectWithValue }) => {
//     try {
//       const resp = await periodsAPI.deleteNews(id);

//       if (resp.status !== 204) {
//         throw new Error("Error occurred! Please contact your administrator.");
//       }
//       return id;
//     } catch (error) {
//       console.log("DELETE news error: ", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );
