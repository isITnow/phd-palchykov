import { createSlice } from "@reduxjs/toolkit";
import {
  addPhotoAlbumThunk,
  getOnePhotoAlbumThunk,
  getPhotoAlbumsThunk,
  removePhotoAlbumThunk,
  removePictureThunk,
  updatePhotoAlbumThunk,
} from "./operationsGallery";

import setError from "../../assets/utils/setSliceError";

const initGallery = {
  error: null,
  onePhotoAlbum: null,
  photoAlbums: [],
  status: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState: initGallery,
  reducers: {},

  extraReducers: (builder) => {
    //* FETCH ALL PHOTO ALBUMS
    builder.addCase(getPhotoAlbumsThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getPhotoAlbumsThunk.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.photoAlbums = payload;
    });
    builder.addCase(getPhotoAlbumsThunk.rejected, setError);

    //* FETCH ONE PHOTO ALBUM
    builder.addCase(getOnePhotoAlbumThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getOnePhotoAlbumThunk.fulfilled, (state, { payload }) => {
      state.status = "album loaded";
      state.onePhotoAlbum = payload;
    });
    builder.addCase(getOnePhotoAlbumThunk.rejected, setError);

    //* CREATE PHOTO ALBUM
    builder.addCase(addPhotoAlbumThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(addPhotoAlbumThunk.fulfilled, (state) => {
      state.status = "created";
      // state.photoAlbums.push(payload);
    });
    builder.addCase(addPhotoAlbumThunk.rejected, setError);

    //* UPDATE PHOTO ALBUM
    builder.addCase(updatePhotoAlbumThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(updatePhotoAlbumThunk.fulfilled, (state) => {
      state.status = "updated";
    });
    builder.addCase(updatePhotoAlbumThunk.rejected, setError);

    //* REMOVE PHOTO ALBUM
    builder.addCase(removePhotoAlbumThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removePhotoAlbumThunk.fulfilled, (state, { payload }) => {
      state.status = "deleted";
      state.error = null;
      // state.photoAlbums = state.photoAlbums.filter(
      //   (photoAlbum) => photoAlbum.id !== payload
      // );
    });
    builder.addCase(removePhotoAlbumThunk.rejected, setError);

    //* REMOVE PICTURE
    builder.addCase(removePictureThunk.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(removePictureThunk.fulfilled, (state, { payload }) => {
      state.status = "picture deleted";
      state.error = null;
      state.onePhotoAlbum.pictures_list =
        state.onePhotoAlbum.pictures_list.filter(
          (picture) => picture.id !== payload
        );
    });
    builder.addCase(removePictureThunk.rejected, setError);
  },
});

export default gallerySlice.reducer;
