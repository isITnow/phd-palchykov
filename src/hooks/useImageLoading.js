import { useState } from "react";

const useImageLoading = () => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const handleImageLoad = () => setImageIsLoaded(true);

  return { imageIsLoaded, handleImageLoad };
};

export default useImageLoading;
