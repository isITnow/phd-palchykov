import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BackBtn from '@/components/shared/BackBtn';
import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';
import PhotoAlbum from '@/components/Gallery/PhotoAlbum';

import navTabs from '@/utils/navTabs';
import usePhotoAlbum from '@/pages/gallery/hooks/usePhotoAlbum';

const PhotoAlbumPage = () => {
  const { isLoading, photoAlbum, handleDelete, isPending } = usePhotoAlbum();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-center mb-4">
        <h4 className="text-secondary fw-bold mb-3 mb-lg-0">
          {photoAlbum ? photoAlbum.title : 'No Album Found'}
        </h4>
        <div className="d-flex flex-row-reverse">
          {photoAlbum && (
            <IsLoggedIn>
              <ButtonGroup className="ms-3">
                <Link
                  className="btn btn-primary"
                  to={navTabs.gallery.editPhotoAlbumPath(photoAlbum.id)}
                >
                  Edit
                </Link>
                <Button
                  type="button"
                  variant="danger"
                  disabled={isPending}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </IsLoggedIn>
          )}
          <BackBtn path={navTabs.gallery.path}>Back To Gallery</BackBtn>
        </div>
      </div>
      {photoAlbum && <PhotoAlbum photoAlbum={photoAlbum} />}
    </>
  );
};

export default PhotoAlbumPage;
