import { Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import FormCard from '../../components/FormComponents/FormCard';
import NoItemToEdit from '../../components/shared/NoItemToEdit';
import PhotoAlbumForm from '../../components/Gallery/PhotoAlbumForm';

import { queryKeys } from '../../queryClient';
import navTabs from '../../assets/navTabs';
import useSelectCachedData from '../../hooks/useSelectCachedData';

const PhotoAlbumOperationsPage = () => {
  const { id: photoAlbumId } = useParams();
  const cachedPhotoAlbum = useSelectCachedData(
    queryKeys.PHOTO_ALBUM(photoAlbumId)
  );

  const isEditAction = !!photoAlbumId;
  const title = isEditAction ? 'Edit Photo Album' : 'Create Photo Album';

  if (isEditAction && !cachedPhotoAlbum) {
    return <NoItemToEdit backPath={navTabs.gallery.path} item="Photo Album" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard
        title={title}
        body={
          <PhotoAlbumForm photoAlbum={isEditAction ? cachedPhotoAlbum : null} />
        }
      />
    </Col>
  );
};

export default PhotoAlbumOperationsPage;
