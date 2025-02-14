import { privateAPI, publicAPI } from '@/services/http';

const deletePhotoAlbum = async ({ id }) => {
  const data = await privateAPI.delete(`/photo_albums/${id}`);

  return data;
};

const deletePhoto = async ({ id }) => {
  const data = await privateAPI.delete(`/attachments/${id}/purge`);

  return data;
};

const editPhotoAlbum = async ({ id, body }) => {
  const data = await privateAPI.patch(`/photo_albums/${id}`, body);

  return data;
};

const fetchPhotoAlbumById = async ({ id }, { signal }) => {
  const data = await publicAPI.get(`/photo_albums/${id}`, { signal });

  return data;
};

const fetchPhotoAlbums = async ({ signal }) => {
  const data = await publicAPI.get('/photo_albums', { signal });

  return data;
};

const addPhotoAlbum = async ({ body }) => {
  const data = await privateAPI.post('/photo_albums', body);

  return data;
};

export const galleryApi = {
  addPhotoAlbum,
  deletePhotoAlbum,
  deletePhoto,
  editPhotoAlbum,
  fetchPhotoAlbumById,
  fetchPhotoAlbums,
};
