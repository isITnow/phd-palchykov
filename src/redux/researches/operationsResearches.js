import { createAsyncThunk } from "@reduxjs/toolkit";
import { researchesAPI } from "../../services/researchesAPI";
import { illustrationsAPI } from "../../services/illustrationsAPI";
// import { addIllustrationThunk } from "../illustrations/operationsIllustrations";

export const getResearchesThunk = createAsyncThunk(
  "researches/get",

  async (_, { rejectWithValue }) => {
    try {
      const resp = await researchesAPI.fetchResearches();

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      return resp.data;
    } catch (error) {
      console.log("GET researches error: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addResearchThunk = createAsyncThunk(
  "researches/post",

  async (research, { rejectWithValue }) => {
    try {
      const resp = await researchesAPI.postPublication(research);
      console.log("research resp: ", resp);

      if (resp.status === 201) {
        const resp = await illustrationsAPI.postIllustration();
        console.log("illustration resp: ", resp);
        if (resp.status === 201) {
          getResearchesThunk();
        } else {
          throw new Error("Error occurred! Please contact your administrator.");
        }
      } else {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      // return resp.data;
    } catch (error) {
      console.log("POST research error: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const removeResearchThunk = createAsyncThunk(
  "researches/delete",

  async (id, { rejectWithValue }) => {
    try {
      const resp = await researchesAPI.deleteResearch(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      return resp.data;
    } catch (error) {
      console.log("DELETE research error: ", error);
      return rejectWithValue(error.message);
    }
  }
);
