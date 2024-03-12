import { createAsyncThunk } from "@reduxjs/toolkit";
import { researchesAPI } from "../../services/researchesAPI";
import { illustrationsAPI } from "../../services/illustrationsAPI";

import { fireToastNotification } from "../../assets/utils/fireToastNotification";
import operationsErrorHandler from "../../assets/utils/operationsErrorHandler";

export const getResearchesThunk = createAsyncThunk(
  "researches/get",

  async (signal, { rejectWithValue }) => {
    try {
      const resp = await researchesAPI.fetchResearches(signal);

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
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
        fireToastNotification.success(researchResp, 201, "Card created");
        getResearchesThunk();
      } else {
        throw new Error(
          "Research POST Error! Please contact your administrator."
        );
      }
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const updateResearchThunk = createAsyncThunk(
  "researches/update",

  async ({ id, research }, { rejectWithValue }) => {
    try {
      const resp = await researchesAPI.editResearch(id, research);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 202, "Card updated");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
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

      fireToastNotification.success(resp, 204, "Card deleted");
      return id;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);
