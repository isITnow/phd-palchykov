import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import PhotoAlbumsList from '@/components/Gallery/PhotoAlbumsList';
import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';

import navTabs from '@/utils/navTabs';
import { queryKeys } from '@/app/queryClient';
import { galleryApi } from '@/services/galleryApi';

const GalleryPage = () => {
  const { data: photoAlbums, isLoading } = useQuery({
    queryKey: queryKeys.PHOTO_ALBUMS,
    queryFn: (meta) => galleryApi.fetchPhotoAlbums(meta),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PhotoAlbumsList photoAlbums={photoAlbums.data} />
      <IsLoggedIn>
        <div className="d-flex flex-row-reverse mt-3">
          <Link
            className="btn btn-primary"
            to={navTabs.gallery.createPhotoAlbumPath}
          >
            Add Photo Album
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default GalleryPage;
