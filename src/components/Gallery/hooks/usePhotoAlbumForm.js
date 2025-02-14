import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { galleryApi } from '@/services/galleryApi';
import { queryKeys } from '@/app/queryClient';
import navTabs from '@/utils/navTabs';

const usePhotoAlbumForm = (photoAlbumId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Add Photo album

  const { mutate: addPhotoAlbumMutation, isPending: isCreating } = useMutation({
    mutationFn: galleryApi.addPhotoAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.PHOTO_ALBUMS);
      navigate(navTabs.gallery.path);
      toast.success('Photo album added');
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  // Edit Photo album

  const { mutate: editPhotoAlbumMutation, isPending: isEditing } = useMutation({
    mutationFn: galleryApi.editPhotoAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.PHOTO_ALBUM(photoAlbumId));
      navigate(navTabs.gallery.photoAlbumPath(photoAlbumId));
      toast.success('Photo album updated');
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  const handleSubmit = ({ title, cover, photos }) => {
    const formData = new FormData();
    formData.append('title', title.trim());

    if (cover) {
      formData.append('cover_image', cover);
    }

    if (photos.length) {
      photos.forEach((photo) => {
        formData.append('pictures[]', photo);
      });
    }

    photoAlbumId
      ? editPhotoAlbumMutation({
          id: photoAlbumId,
          body: formData,
        })
      : addPhotoAlbumMutation({
          body: formData,
        });
  };

  return {
    isPending: isCreating || isEditing,
    handleSubmit,
  };
};

export default usePhotoAlbumForm;
