import { Button } from 'react-bootstrap';
import { CgClose } from 'react-icons/cg';
import { Item } from 'react-photoswipe-gallery';

import ImageLoadingSpinner from '@/components/shared/ImageLoadingSpinner';
import IsLoggedIn from '@/components/shared/IsLoggedIn';

import useImageLoading from '@/hooks/useImageLoading';
import useDeletePhoto from '@/components/Gallery/hooks/useDeletePhoto';

import s from './gallery.module.css';

const PhotoAlbumItem = ({
  filename,
  id,
  metadata: { height, width },
  picture_url,
}) => {
  const { handleDeletePhoto, isPending } = useDeletePhoto();

  const { imageIsLoaded, handleImageLoad } = useImageLoading();

  return (
    <Item
      height={height}
      original={picture_url}
      thumbnail={picture_url}
      width={width}
    >
      {({ ref, open }) => (
        <div className={`rounded-1 shadow position-relative ${s.imgWrapper}`}>
          <IsLoggedIn>
            <Button
              disabled={isPending}
              type="button"
              variant="danger"
              className="
                        d-flex
                        justify-content-center
                        rounded-circle
                        p-1
                        position-absolute
                        translate-middle
                        top-0 start-100
                        "
              onClick={() => handleDeletePhoto(id)}
            >
              <CgClose size={'1rem'} color="white" />
            </Button>
          </IsLoggedIn>
          {!imageIsLoaded && <ImageLoadingSpinner />}
          <img
            alt={filename}
            className={`rounded-1 ${s.img}`}
            onClick={open}
            ref={ref}
            src={picture_url}
            onLoad={handleImageLoad}
            onError={handleImageLoad}
          />
        </div>
      )}
    </Item>
  );
};

export default PhotoAlbumItem;
