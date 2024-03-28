import useImageLoading from "../../assets/customHooks/useImageLoading";
import ImageLoadingSpinner from "../shared/ImageLoadingSpinner";

import s from "./publication.module.css";

const PublicationImage = ({ url, alt, metadata: { height, width } }) => {
  const { imageIsLoaded, handleImageLoad } = useImageLoading();
  return (
    <div style={{ minHeight: "120px", position: "relative" }}>
      {!imageIsLoaded && <ImageLoadingSpinner />}
      <img
        alt={alt}
        className={`shadow rounded ${s.img}`}
        src={url}
        onLoad={handleImageLoad}
        onError={handleImageLoad}
      />
    </div>
  );
};

export default PublicationImage;
