import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { galleryApi } from '@/services/galleryApi';
import { queryKeys } from '@/app/queryClient';
import confirmationDialog from '@/utils/confirmationDialog';

const usePhotoAlbum = () => {
  const { id: photoAlbumId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deletePhoto, isPending } = useMutation({
    mutationFn: galleryApi.deletePhoto,
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.PHOTO_ALBUM(photoAlbumId));
      toast.success('Photo deleted');
    },
  });

  const handleDeletePhoto = (photoId) => {
    confirmationDialog(() => {
      deletePhoto({ id: photoId });
    }, 'Are you sure you want to delete?');
  };

  return {
    handleDeletePhoto,
    isPending,
  };
};

export default usePhotoAlbum;
