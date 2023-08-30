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

  async ({ illustrationsData, research }, { rejectWithValue }) => {
    try {
      const researchResp = await researchesAPI.postResearch(research);

      if (researchResp.status === 201) {
        const id = researchResp.data.id;
        illustrationsData.forEach(async (illustration) => {
          const illustrationResp = await illustrationsAPI.postIllustration(
            id,
            illustration
          );
          if (illustrationResp.status === 201) {
          } else {
            throw new Error(
              "Illustration POST Error! Please contact your administrator."
            );
          }
        });

        getResearchesThunk();
      } else {
        throw new Error(
          "Research POST Error! Please contact your administrator."
        );
      }
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
      return id;
    } catch (error) {
      console.log("DELETE research error: ", error);
      return rejectWithValue(error.message);
    }
  }
);
