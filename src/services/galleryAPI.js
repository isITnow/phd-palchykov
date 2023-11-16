import { privateAPI, publicAPI } from "./http";

const deletePhotoAlbum = async (id) => {
  const data = await privateAPI.delete(`/photo_albums/${id}`);

  return data;
};

const deletePicture = async (id) => {
  const data = await privateAPI.delete(`/attachments/${id}/purge`);

  return data;
};

const editPhotoAlbum = async (id, body) => {
  const data = await privateAPI.patch(`/photo_albums/${id}`, body);

  return data;
};

const fetchOnePhotoAlbum = async (id) => {
  const data = await publicAPI.get(`/photo_albums/${id}`);

  return data;
};

const fetchPhotoAlbums = async () => {
  const data = await publicAPI.get("/photo_albums");

  return data;
};

const postPhotoAlbum = async (body) => {
  const data = await privateAPI.post("/photo_albums", body, {});

  return data;
};

export const galleryAPI = {
  deletePicture,
  deletePhotoAlbum,
  editPhotoAlbum,
  fetchOnePhotoAlbum,
  fetchPhotoAlbums,
  postPhotoAlbum,
};
