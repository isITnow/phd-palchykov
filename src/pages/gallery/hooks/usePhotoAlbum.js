import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { galleryApi } from '@/services/galleryApi';
import { queryKeys } from '@/utils/queryClient';
import confirmationDialog from '@/utils/confirmationDialog';
import navTabs from '@/utils/navTabs';

const usePhotoAlbum = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.PHOTO_ALBUM(id),
    queryFn: (meta) => galleryApi.fetchPhotoAlbumById({ id }, meta),
  });

  const { mutate: deletePhotoAlbumMutation, isPending } = useMutation({
    mutationFn: galleryApi.deletePhotoAlbum,
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.PHOTO_ALBUMS);
      navigate(navTabs.gallery.path);
      toast.success('Photo album deleted');
    },
  });

  const handleDelete = () => {
    confirmationDialog(() => {
      deletePhotoAlbumMutation({ id });
    }, 'Are you sure you want to delete?');
  };

  return {
    photoAlbum: data?.data,
    isLoading,
    handleDelete,
    isPending,
  };
};

export default usePhotoAlbum;
