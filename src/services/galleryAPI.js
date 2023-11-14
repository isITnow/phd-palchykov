import { privateAPI, publicAPI } from "./http";

const fetchPhotoAlbums = async () => {
  const data = await publicAPI.get("/photo_albums");

  return data;
};

const fetchOnePhotoAlbum = async (id) => {
  const data = await publicAPI.get(`/photo_albums/${id}`);

  return data;
};

const postPhotoAlbum = async (body) => {
  const data = await privateAPI.post("/photo_albums", body, {});
  console.log("Photo Album data: ", data);

  // return data;
};

const deletePhotoAlbum = async (id) => {
  const data = await privateAPI.delete(`/photo_albums/${id}`);
  console.log("Photo Album data: ", data);

  // return data;
};

const editPhotoAlbum = async (id, body) => {
  const data = await privateAPI.patch(`/photo_albums/${id}`, body);
  console.log("Photo Album data: ", data);

  // return data;
};

export const galleryAPI = {
  fetchPhotoAlbums,
  fetchOnePhotoAlbum,
  postPhotoAlbum,
  deletePhotoAlbum,
  editPhotoAlbum,
};
