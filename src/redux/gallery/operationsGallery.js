import { createAsyncThunk } from "@reduxjs/toolkit";
import { galleryAPI } from "../../services/galleryAPI";

import errorSwitchCase from "../../assets/utils/errorSwitchCase";

export const getPhotoAlbumsThunk = createAsyncThunk(
  "gallery/get",

  async (_, { rejectWithValue }) => {
    try {
      const resp = await galleryAPI.fetchPhotoAlbums();

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      console.log("GET gallery error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const getOnePhotoAlbumThunk = createAsyncThunk(
  "gallery/getOne",

  async (id, { rejectWithValue }) => {
    try {
      const resp = await galleryAPI.fetchOnePhotoAlbum(id);

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      console.log("GET one album error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const addPhotoAlbumThunk = createAsyncThunk(
  "gallery/post",

  async (photoAlbum, { rejectWithValue, dispatch }) => {
    try {
      const resp = await galleryAPI.postPhotoAlbum(photoAlbum);

      if (resp.status !== 201) {
        throw new Error("Error occurred! Please contact your administrator.");
      }
      dispatch(getPhotoAlbumsThunk);
      // return resp.data;
    } catch (error) {
      console.log("POST photo album error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const updatePhotoAlbumThunk = createAsyncThunk(
  "gallery/update",

  async ({ id, photoAlbum }, { dispatch, rejectWithValue }) => {
    try {
      const resp = await galleryAPI.editPhotoAlbum(id, photoAlbum);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      dispatch(getPhotoAlbumsThunk());
      return resp.data;
    } catch (error) {
      console.log("EDIT photo album error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const removePhotoAlbumThunk = createAsyncThunk(
  "gallery/delete",

  async (id, { dispatch, rejectWithValue }) => {
    try {
      const resp = await galleryAPI.deletePhotoAlbum(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      dispatch(getPhotoAlbumsThunk());
      return id;
    } catch (error) {
      console.log("DELETE photo album error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);

export const removePictureThunk = createAsyncThunk(
  "gallery/deletePicture",

  async (id, { dispatch, rejectWithValue }) => {
    try {
      const resp = await galleryAPI.deletePicture(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return id;
    } catch (error) {
      console.log("DELETE photo album error: ", error);
      return rejectWithValue(errorSwitchCase(error));
    }
  }
);
