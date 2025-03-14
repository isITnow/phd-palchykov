import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';
import PhotoAlbumsList from '@/components/Gallery/PhotoAlbumsList';

import { galleryApi } from '@/services/galleryApi';
import { queryKeys } from '@/utils/queryClient';
import navTabs from '@/utils/navTabs';

const GalleryPage = () => {
  const { data: photoAlbums } = useSuspenseQuery({
    queryKey: queryKeys.PHOTO_ALBUMS,
    queryFn: (meta) => galleryApi.fetchPhotoAlbums(meta),
  });

  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default GalleryPage;
