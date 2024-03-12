import { createAsyncThunk } from "@reduxjs/toolkit";
import { galleryAPI } from "../../services/galleryAPI";

import { fireToastNotification } from "../../assets/utils/fireToastNotification";
import operationsErrorHandler from "../../assets/utils/operationsErrorHandler";

export const getPhotoAlbumsThunk = createAsyncThunk(
  "gallery/get",

  async (signal, { rejectWithValue }) => {
    try {
      const resp = await galleryAPI.fetchPhotoAlbums(signal);

      if (resp.status !== 200) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
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
      return operationsErrorHandler(rejectWithValue, error);
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
      fireToastNotification.success(resp, 201, "Photo album created");
      dispatch(getPhotoAlbumsThunk);
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const updatePhotoAlbumThunk = createAsyncThunk(
  "gallery/update",

  async ({ id, photoAlbum }, { rejectWithValue }) => {
    try {
      const resp = await galleryAPI.editPhotoAlbum(id, photoAlbum);

      if (resp.status !== 202) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 202, "Photo album updated");
      return resp.data;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
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
      fireToastNotification.success(resp, 204, "Photo album deleted");
      return id;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);

export const removePictureThunk = createAsyncThunk(
  "gallery/deletePicture",

  async (id, { rejectWithValue }) => {
    try {
      const resp = await galleryAPI.deletePicture(id);

      if (resp.status !== 204) {
        throw new Error("Error occurred! Please contact your administrator.");
      }

      fireToastNotification.success(resp, 204, "Picture deleted");
      return id;
    } catch (error) {
      return operationsErrorHandler(rejectWithValue, error);
    }
  }
);
