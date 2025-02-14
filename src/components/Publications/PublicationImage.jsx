import useImageLoading from '@/hooks/useImageLoading';
import ImageLoadingSpinner from '@/components/shared/ImageLoadingSpinner';

import s from '@/components/Publications/publication.module.css';

const PublicationImage = ({ url, alt, metadata: { height, width } }) => {
  const { imageIsLoaded, handleImageLoad } = useImageLoading();
  return (
    <div
      className="shadow rounded overflow-hidden"
      style={{ minHeight: '120px', position: 'relative' }}
    >
      {!imageIsLoaded && <ImageLoadingSpinner />}
      <img
        alt={alt}
        className={s.img}
        src={url}
        onLoad={handleImageLoad}
        onError={handleImageLoad}
      />
    </div>
  );
};

export default PublicationImage;
