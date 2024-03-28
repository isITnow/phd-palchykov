import { useDispatch, useSelector } from "react-redux";
import { removePictureThunk } from "../../redux/gallery/operationsGallery";
import { selectStatus } from "../../redux/gallery/selectorGallery";

import { Button } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { Item } from "react-photoswipe-gallery";
import ImageLoadingSpinner from "../shared/ImageLoadingSpinner";
import IsLoggedIn from "../shared/IsLoggedIn";

import useImageLoading from "../../assets/customHooks/useImageLoading";
import confirmationDialog from "../../assets/utils/confirmationDialog";
import s from "./gallery.module.css";

const PhotoAlbumItem = ({
  filename,
  id,
  metadata: { height, width },
  picture_url,
}) => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const { imageIsLoaded, handleImageLoad } = useImageLoading();

  const isDisabled = status === "pending";

  const handleDelete = (id) => {
    confirmationDialog(
      () => dispatch(removePictureThunk(id)),
      "Are you sure you want to delete?"
    );
  };

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
              disabled={isDisabled}
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
              onClick={() => handleDelete(id)}
            >
              <CgClose size={"1rem"} color="white" />
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
